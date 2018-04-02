precision mediump float;
uniform vec2 u_res;

float circle(vec2 p, vec2 center, float r){
	return step(length(p-center),r);
}

float diamond(vec2 p, vec2 c, float r){
  return step(dot(abs(p-c), vec2(2.5, 2.5)), 1.);
}

float heart(vec2 p){
  return circle(p, vec2(-0.25,.4), .35) + 
  		 circle(p, vec2(.25,.4), .35) + 
  		 diamond(p, vec2(0., 0.115), 0.9);
}

void main(){
  vec2 p = gl_FragCoord.xy / u_res * 2. - 1.;
  float i = heart(p);
  gl_FragColor = vec4(vec3(i),1.);
}