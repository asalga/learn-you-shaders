#ifdef GL_ES
  precision mediump float;
#endif

// uniform vec2 res;

float circle(vec2 p, float r){
  // vec2 aspectRatio = vec2(res.x / res.y, 1.0);
  vec2 uv = gl_FragCoord.xy / 100.0 * 2.0 - 1.0;
  return 1.0 - step(r, distance(uv * 1.0, p));
}

void main() {
  // gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
  vec3 t = vec3(circle(vec2(0.0), 1.0));
  gl_FragColor = vec4( t, 1.0);
}