precision mediump float;
uniform vec2 u_res;

float circle(vec2 p, vec2 c, float r){
  return step(length(p-c),r);
}

void main(){
  vec2 p = gl_FragCoord.xy/u_res*2.-1.;
  float rad = 0.25;
  float s = 0.2;
  float x = 0.45;
  float y = 0.5;

  float _union = 	circle(p, vec2(x,y) - vec2(-s, 0.), rad) + 
  					circle(p, vec2(x,y) - vec2(s, 0.), rad);

  float _intersection = 	circle(p, vec2(-x,y) - vec2(-s, 0.), rad) * 
  							circle(p, vec2(-x,y) - vec2(s, 0.), rad);

  float _subtract = 	circle(p, vec2(x,-y) - vec2(-s, 0.), rad) - 
  						circle(p, vec2(x,-y) - vec2(s, 0.), rad);

  float _xor = 	circle(p, vec2(-x,-y) - vec2(-s, 0.), rad) + 
  				circle(p, vec2(-x,-y) - vec2(s, 0.), rad) == 1. ? 1. : .0;

  float all = _union + _intersection + _subtract + _xor;

  gl_FragColor = vec4(vec3(all),1.);
}