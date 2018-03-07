#ifdef GL_ES
  precision mediump float;
#endif

#define TAU 3.14159 * 2.0

uniform sampler2D u_texture0;
uniform vec2 u_res;

void main() {
  vec2 p = gl_FragCoord.xy / u_res.xy * 2.0 - 1.0;
  float len = length(p);
  float r = mod(0.25 / len, 1.0);
  float theta = mod(atan(p.y / p.x) / TAU, 1.0);
  gl_FragColor = texture2D(u_texture0, vec2(r, theta));
}