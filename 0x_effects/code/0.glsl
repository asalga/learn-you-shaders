#ifdef GL_ES
  precision mediump float;
#endif

uniform sampler2D texture0;
uniform vec2 res;
uniform float time;
uniform float aspect;

void main() {
  gl_FragColor = vec4(0.3, 0.6, 0.9, 1.0);
}