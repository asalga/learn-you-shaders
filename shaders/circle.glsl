#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_res;

float circle(vec2 p, float r){
  vec2 aspectRatio = vec2(u_res.x / u_res.y, 1.0);
  vec2 uv = ((gl_FragCoord.xy / u_res.y) * 2.0 - 1.0 ) * aspectRatio;
  return 1.0 - step(r, distance(uv, p));
}

float circle2(vec2 p, float r){
  float ratio = u_res.x / u_res.y;
  vec2 uv = vec2(gl_FragCoord.xy / u_res.y) - vec2(ratio/2.0, 0.5);
  return 1.0 - step(r, distance(uv, p));
}

void main() {
  vec3 t = vec3(circle2(vec2(0.0), 0.5));
  gl_FragColor = vec4(t, 1.0);
}