precision mediump float;
uniform vec2 u_res;

float squareSDF(vec2 p, float size){
  vec2 a = abs(p);
  return max(a.x, a.y);
}

void main(){
  vec2 p = gl_FragCoord.xy/u_res * 2. -1.;
  float i = squareSDF(p, .5);
  gl_FragColor = vec4(vec3(i),1.);
}