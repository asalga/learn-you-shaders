precision mediump float;
uniform vec2 u_res;

float circleSDF(vec2 p, float r){
  return length(p) - r;
}

float horizLineSDF(vec2 p, float w){
  // Wooooo! fuck ya, removed branching!!
  // if(a.x < w){
  //   return abs(a.y);
  // }
  // return length(a);
  vec2 a = abs(p);
  return length(vec2(max(a.x - w, 0.), a.y));
}

void main(){
  vec2 as = vec2(1., u_res.x/u_res.y);
  vec2 p = as * (gl_FragCoord.xy/u_res * 2. - 1.);
  
  // float i = step(0.0, circleSDF(p + vec2(0.5, -0.5), 0.25));
  float i = step(0.01, horizLineSDF(p, 0.8));

  gl_FragColor = vec4(vec3(i), 1.);
}