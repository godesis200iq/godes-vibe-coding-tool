uniform float uTime;
uniform float uProgress;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;
varying float vDepth;

void main() {
  float t = uTime * 0.001;

  vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 1.0, vUv.y));

  float edge = 1.0 - abs(vUv.x - 0.5) * 2.0;
  edge = clamp(edge, 0.0, 1.0);

  float glow = pow(edge, 2.0) * 0.6;
  col += glow;

  float scan = sin((vUv.y * 140.0 + t * 10.0) + uProgress * 8.0) * 0.03;
  col += scan;

  float fog = smoothstep(25.0, 130.0, vDepth);
  col = mix(col, vec3(0.02, 0.03, 0.06), fog);

  gl_FragColor = vec4(col, 1.0);
}
