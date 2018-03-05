uniform vec2 res;

float circle(vec2 p, float r){
  vec2 aspectRatio = vec2(res.x / res.y, 1.0);
  vec2 uv = gl_FragCoord.xy / res * 2.0 - 1.0;
  return 1.0 - step(r, distance(uv * aspectRatio, p));
}

void main() {
  gl_FragColor = vec4( vec3(   circlePx(vec2(0.), 100.)), 1. );
}