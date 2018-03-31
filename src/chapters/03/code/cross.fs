precision mediump float;
uniform vec2 u_res;
void main(){
  vec2 p = gl_FragCoord.xy/u_res*2.-1.;
  float i = step(abs(p.y),.1) + step(abs(p.x-.4),.2);
  gl_FragColor = vec4(vec3(i),1.);
}