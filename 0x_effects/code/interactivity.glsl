#ifdef GL_ES
  precision mediump float;
#endif

#define TAU 3.14159 * 2.0

uniform sampler2D u_texture0;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_mouse;

void main() {
  vec2 p = gl_FragCoord.xy / u_res.xy * 2.0 - 1.0;

  // mouse stuff
  vec2 cursor = u_mouse.xy/u_res.xy * 2.0 - 1.0;
  p.y *= -1.0;
  p += cursor;

  float len = length(p);
  float r = mod(0.25 / len + (u_time * 0.3), 1.0);
  float theta = mod(atan(p.y / p.x)/ TAU, 1.0);
  vec4 fogCol = vec4(vec3(0.95) * len, 1.0);
  gl_FragColor = fogCol * texture2D(u_texture0, vec2(r, theta));
}