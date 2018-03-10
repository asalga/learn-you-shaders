let sh;

function preload(){
  sh = loadShader('data/vert.glsl', 'data/frag.glsl');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  shader(sh);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}