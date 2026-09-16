/**
 * Aurora — React Bits "Aurora" (TS-TW) bileşeninden uyarlandı.
 *
 * Değişiklikler:
 *  - `ogl` bağımlılığı kaldırıldı; aynı shader saf WebGL2 ile çiziliyor.
 *  - lightMode / time / canlı prop güncelleme kodu çıkarıldı (kullanılmıyor).
 *  - Yarım çözünürlükte render + 30 fps tavan: aurora zaten yumuşak, fark görünmez.
 *  - Ekran dışındayken ve sekme gizliyken döngü durur.
 *  - Düşük donanım / reduced-motion / WebGL2 yok → hiçbir şey çizmez; Hero'nun
 *    statik CSS gradyanı görünür kalır. Mobil için island hiç yüklenmez
 *    (Hero.astro → client:media).
 *  - İlk kare çizildikten sonra canvas yumuşakça belirir.
 */
import { useEffect, useRef } from 'react';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

vec3 ramp(float f) {
  if (f < 0.5) return mix(uColorStops[0], uColorStops[1], f / 0.5);
  return mix(uColorStops[1], uColorStops[2], (f - 0.5) / 0.5);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec3 rampColor = ramp(uv.x);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  fragColor = vec4(intensity * rampColor * auroraAlpha, auroraAlpha);
}
`;

interface AuroraProps {
  colorStops: [string, string, string];
  amplitude?: number;
  blend?: number;
  speed?: number;
  className?: string;
}

const RENDER_SCALE = 0.5;
const FRAME_MS = 1000 / 30;

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.replace('#', ''), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export default function Aurora({ colorStops, amplitude = 1, blend = 0.5, speed = 1, className }: AuroraProps) {
  const ctnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnRef.current;
    if (!ctn) return;

    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowEnd = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) < 4;
    if (lowEnd || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%;opacity:0;transition:opacity 1.6s ease';
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Tek üçgen ekranın tamamını kaplar
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const uTime = gl.getUniformLocation(program, 'uTime');
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    gl.uniform1f(gl.getUniformLocation(program, 'uAmplitude'), amplitude);
    gl.uniform1f(gl.getUniformLocation(program, 'uBlend'), blend);
    gl.uniform3fv(gl.getUniformLocation(program, 'uColorStops'), new Float32Array(colorStops.flatMap(hexToRgb)));

    const resize = () => {
      canvas.width = Math.max(1, Math.round(ctn.clientWidth * RENDER_SCALE));
      canvas.height = Math.max(1, Math.round(ctn.clientHeight * RENDER_SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(ctn);
    resize();
    ctn.appendChild(canvas);

    let raf = 0;
    let last = -Infinity;
    let shown = false;
    let inView = true;

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (t - last < FRAME_MS) return;
      last = t;
      gl.uniform1f(uTime, t * 0.001 * speed);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!shown) {
        shown = true;
        canvas.style.opacity = '1';
      }
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      if (inView && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      sync();
    });
    io.observe(ctn);
    document.addEventListener('visibilitychange', sync);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
      canvas.remove();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={ctnRef} className={className} aria-hidden="true" />;
}
