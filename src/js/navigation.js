/*
  Chapter navigation
*/


function goHome() {
  let base = window.location.href.match(/.*chapters/)[0];
  window.location.href = base + '/' + '00';
}


function goTo(offset) {
  // ["http:", "", "localhost:5000", "04", ""]
  let tokens = window.location.href.split('/');
  let tokenIdx = tokens.length - 2;
  let num = parseInt(tokens[tokenIdx]) + offset;

  if (num < 0) {
    return;
  }

  // only append '0' is needed
  let dstChapter = (num < 10) ? '0' + num : num;

  // local vs ghpages
  // http://localhost:9000/chapters/00/
  // https://asalga.github.io/learn-you-shaders/app/chapters/00/

  let base = window.location.href.match(/.*chapters/)[0];
  window.location.href = base + '/' + dstChapter;
}

function goNext() {
  goTo(1);
}

function goPrev() {
  goTo(-1);
}
