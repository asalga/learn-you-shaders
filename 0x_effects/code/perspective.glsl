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
  uv.x = 1.0 - uv.x;
  vec4 col = texture2D(u_texture0, uv);
  gl_FragColor = vec4(1.8 * vec3(gl_FragCoord.x/u_res.x), 1.0) * col;
}

