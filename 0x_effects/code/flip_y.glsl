#ifdef GL_ES
  precision mediump float;
#endif

uniform sampler2D texture0;
uniform vec2 res;
uniform float time;
uniform float aspect;

void main() {
  vec2 p = gl_FragCoord.xy / u_res;
  p.y = 1.0 - p.y;
  gl_FragColor = texture2D(texture0, p);
}