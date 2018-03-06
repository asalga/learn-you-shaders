// 0.1  Hello, Where is [0,0] !?

void main() {
  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

  if(gl_FragCoord.x < 10.0 && gl_FragCoord.y < 10.0){
    gl_FragColor += vec4(1.0);
  }
}