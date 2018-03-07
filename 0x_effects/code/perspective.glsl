#ifdef GL_ES
  precision mediump float;
#endif

uniform sampler2D u_texture0;
uniform vec2 u_res;

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;

  // inverse division
  uv.x = mod(1.0 / uv.x, 1.0);
  
  gl_FragColor = texture2D(u_texture0, uv);
}

