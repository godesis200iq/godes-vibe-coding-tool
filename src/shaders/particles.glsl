// @stage vertex
uniform float uTime;
uniform float uProgress;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;

varying float vAlpha;

void main() {
  float t = uTime * 0.001;

  vec3 pos = position;

  float swirl = sin(pos.z * 0.28 + t * 1.4 + uProgress * 6.28318) * 0.75;
  pos.x += swirl * 0.18;
  pos.y += cos(pos.z * 0.22 + t * 1.1) * 0.12;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float dist = -mvPosition.z;

  float size = uSize * aScale * uPixelRatio;
  gl_PointSize = size * (1.0 / max(1.0, dist));

  vAlpha = smoothstep(55.0, 8.0, dist);
}

// @stage fragment
uniform vec3 uColor;

varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - vec2(0.5);
  float d = length(uv);

  float alpha = smoothstep(0.5, 0.05, d) * vAlpha;
  vec3 col = uColor;

  gl_FragColor = vec4(col, alpha);
}
