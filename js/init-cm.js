/*
    Andor Saga
*/

function goNext() {
    goTo(1);
}

function goPrev() {
    goTo(-1);
}

function goTo(offset) {
    // ["http:", "", "localhost:5000", "04", ""]
    let tokens = window.location.href.split('/');
    let tokenIdx = tokens.length - 2;
    let num = parseInt(tokens[tokenIdx]) + offset;

    // only append '0' is needed
    let dstChapter = (num < 10) ? '0' + num : num;

    window.location.href = '/' + dstChapter;
}

function goHome() {}

let sh;


function makeSketch(fs) {

    var sketch = function(p) {
        // debugger;
        p.preload = function() {
            let vs = `  precision highp float;
                    varying vec2 vPos;
                    attribute vec3 aPosition;
                    void main() {
                        vPos = (gl_Position = vec4(aPosition,1.0)).xy;
                    }`;
            sh = p.createShader(vs, fs);
        }

        p.setup = function() {
            p.createCanvas(123, 123, p.WEBGL);
            p.shader(sh);
            p.quad(-1, -1, 1, -1, 1, 1, -1, 1);
            p.noLoop();
        }
    };
    return sketch;

}



/*
    Fill all the textareas with glsl shader code.
    This keeps the html files smaller and makes the
    glsl code more maintainable since there will only be
    one place for each example.
*/
(function populateTextAreas() {

    // Gather all the <textareas>
    let arr = Array.from(document.getElementsByClassName('glsl-code'));

    arr.forEach(t => {
        let path = t.getAttribute('data-example');

        if (!path) { return; }

        let relPath = '../' + path;

        fetch(relPath)
            .then(res => res.text())
            .then(fragShaderCode => {
                fs = t.innerHTML = fragShaderCode;

                // Get the div immediately following the textarea,
                // this is where we'll load the sketch
                // But p5 expects it to have to have an ID, so assign it one.
                $(t).next().attr('id', relPath);
                let sk = makeSketch(fs);
                new p5(sk, relPath);

                CodeMirror.fromTextArea(t, {
                    lineNumbers: true,
                    readOnly: true
                });

            });
    });
})();