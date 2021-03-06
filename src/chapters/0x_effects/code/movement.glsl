#ifdef GL_ES
  precision mediump float;
#endif

#define TAU 3.14159 * 2.0

uniform sampler2D u_texture0;
uniform vec2 u_res;
uniform float u_time;

void main() {
  vec2 p = gl_FragCoord.xy / u_res.xy * 2.0 - 1.0;
  float len = length(p);
  float r = mod(0.25 / len + (u_time * 0.3), 1.0);
  float theta = mod(atan(p.y / p.x)/ TAU, 1.0);
  vec4 fogCol = vec4(vec3(0.95) * len, 1.0);
  gl_FragColor = fogCol * texture2D(u_texture0, vec2(r, theta));
}