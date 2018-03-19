#ifdef GL_ES
  precision mediump float;
#endif

#define TAU 3.14159 * 2.0

uniform sampler2D u_texture0;
uniform vec2 u_res;
//https://mathinsight.org/polar_coordinates_mapping
void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;// * 2.0 - 1.0;
  float len = length(uv);

  float theta = asin(uv.y / len);
  
  uv = vec2(mod(1.0 / len, 1.0), theta);
  gl_FragColor = texture2D(u_texture0, vec2(1.,1.) - uv);
}
// #ifdef GL_ES
//   precision mediump float;
// #endif

// uniform sampler2D u_texture0;
// uniform vec2 u_res;

// void main() {
//   vec2 uv = gl_FragCoord.xy / u_res.xy;

//   // map x to -1 to +1
//   uv.x = uv.x * 2.0 - 1.0;

//   // uv.x *= 2.0 - 1.0;
//   // uv.y = 1.0 - uv.y;
//   // uv.x = 1.0 - uv.x;

//   // inverse division
//   uv.x = mod(1.0 / uv.x, 1.0);
//   uv = vec2(1.0) - uv;

//   vec4 col = texture2D(u_texture0, uv);

// gl_FragColor = col;// * vec4(vec3(), 1.0);
// }