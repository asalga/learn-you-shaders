#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_res;

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec3 col = vec3(step(distance(vec2(0.5), uv), 0.5));
  gl_FragColor = vec4(col, 1.);
}