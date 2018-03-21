#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_res;

float rect(in vec2 p, vec2 dim){
	vec2 uv = gl_FragCoord.xy / u_res - p;
	vec2 size = vec2(1.0 - dim)/2.0;
	vec2 bl = vec2(step(size, uv));
	vec2 tr = vec2(step(size, 1.0 - uv));
	return bl.x * bl.y * tr.x * tr.y;
}

void main(){
	float c = rect(vec2(-0.5, 0.0), vec2(0.5, 0.5));
	gl_FragColor = vec4(vec3(c), 1.0);
}