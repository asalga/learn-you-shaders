let sh;

function preload(){
  sh = loadShader('data/vert.glsl', 'data/frag.glsl');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  shader(sh);
  rect(0, 0, windowWidth, windowHeight, 1, 1);
}