#ifdef GL_ES
  precision mediump float;
#endif

#define TAU 3.14159 * 2.0

uniform sampler2D u_texture0;
uniform vec2 u_res;

void main() {
  vec2 uv = gl_FragCoord.xy/u_res * 2.0 - 1.0;
  float len = length(uv);
  float r = mod(0.25 / len, 1.0);
  float theta = mod(atan(uv.y / uv.x)/TAU, 1.0);
  uv = vec2(r, theta);

  // Fogginess!
  vec4 fogCol = vec4(vec3(len/1.0), 1.0);

  gl_FragColor = fogCol * texture2D(u_texture0, uv);
}