precision mediump float;
uniform vec2 u_res;
void main(){
	vec2 uv = gl_FragCoord.xy / u_res;
	float c = step(0.5, mod(uv.x * 2., 1.0));
	gl_FragColor = vec4(vec3(c), 1.);
}