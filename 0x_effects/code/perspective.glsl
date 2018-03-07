#ifdef GL_ES
  precision mediump float;
#endif

uniform sampler2D u_texture0;
uniform vec2 u_res;

void main() {
  vec2 p = gl_FragCoord.xy / u_res;
  p.y = 1.0 - p.y;
  p.x = mod(1.0 / p.x, 1.0);
  gl_FragColor = texture2D(u_texture0, p);
}

