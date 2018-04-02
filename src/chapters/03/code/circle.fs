precision mediump float;
uniform vec2 u_res;
uniform vec3 u_mouse;

float circleSDF(vec2 p, float r){
  return length(p);
}

bool closeEnough(float a, float b, float epsilon){
  return distance(a,b) < epsilon;
}

void main(){
  vec2 p = gl_FragCoord.xy/u_res * 2. - 1.;
  float i = circleSDF(p, .5);
  gl_FragColor = vec4(vec3(i), 1.);
  
  float len = length((u_mouse.xy/u_res)*2.-1.);

  if(closeEnough(len, i, .005)){
    gl_FragColor = vec4(1., 1., .0, 1.);
  }
}