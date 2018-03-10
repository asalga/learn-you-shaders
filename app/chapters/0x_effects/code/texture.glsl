#ifdef GL_ES
  precision mediump float;
#endif

// Add 2 uniforms
uniform sampler2D u_texture0;
uniform vec2 u_res;

void main() {
  // Create a normalized vector
  vec2 uv = gl_FragCoord.xy / u_res;
  gl_FragColor = texture2D(u_texture0, uv);
}