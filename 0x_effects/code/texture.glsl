#ifdef GL_ES
  precision mediump float;
#endif

uniform sampler2D u_texture0;
uniform vec2 u_res;

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  gl_FragColor = texture2D(u_texture0, uv);
}