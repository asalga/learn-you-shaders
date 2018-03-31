precision mediump float;
uniform vec2 u_res;

float circleSDF(vec2 p, float r){
  return length(p);
}

void main(){
  vec2 p = gl_FragCoord.xy/u_res * 2. - 1.;
  float i = circleSDF(p, .5);
  gl_FragColor = vec4(vec3(i), 1.);
}