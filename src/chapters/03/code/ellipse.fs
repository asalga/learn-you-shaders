precision mediump float;


float ellipseSDF(vec2 p, vec2 rad){
  return 1.;
}

void main(){
  vec2 p = gl_FragCoord.xy / u_res * 2. -1.;
  float i = ellipseSDF(p, vec2(.5));
  gl_FragColor = vec4(vec3(i), 1.);
}