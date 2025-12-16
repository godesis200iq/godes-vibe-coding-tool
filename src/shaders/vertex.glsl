uniform float uTime;
uniform float uProgress;

varying vec2 vUv;
varying float vDepth;

void main() {
  vUv = uv;

  vec3 pos = position;

  float t = uTime * 0.001;
  float travel = uProgress * 6.28318;

  float warp = sin(pos.z * 0.35 + t * 1.2 + travel) * 0.18;
  warp += sin(pos.y * 0.55 + t * 0.9) * 0.08;

  pos += normal * warp;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vDepth = -mvPosition.z;

  gl_Position = projectionMatrix * mvPosition;
}
