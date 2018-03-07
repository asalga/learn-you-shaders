/*
    Andor Saga
*/

const DefaultSketchWidth = 320;
const DefaultSketchHeight = 240;

function goHome() {
    window.location.href = '/';
}

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


function makeSketch(fs, params) {
    let sh;
    let img0;

    var sketch = function(p) {
        p.preload = function() {
            let vs = `precision highp float;
                      varying vec2 vPos;
                      attribute vec3 aPosition;
                      void main() {
                        vPos = (gl_Position = vec4(aPosition,1.0)).xy;
                      }`;
            sh = p.createShader(vs, fs);

            if (params && params.tex0) {
                img0 = p.loadImage(params.tex0);
            }
        }

        p.setup = function() {
            let w = params.width || DefaultSketchWidth;
            let h = params.height || DefaultSketchHeight;

            p.createCanvas(w, h, p.WEBGL);
            p.shader(sh);

            if (fs.match(/uniform\s+vec2\s+u_res/)) {
                sh.setUniform('u_res', [w, h]);
            }
            if (fs.match(/uniform\s+vec2\s+u_time/)) {
                sh.setUniform('u_time', p.millis());
            }
            if (fs.match(/uniform\s+sampler2D\s+u_texture0/)) {
                sh.setUniform('u_texture0', img0);
            }

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

    /*
        glsl-code - will have an assigned sketch canvas
        js-code - for js code, so no canvas
        glsl-snippet - not a complete shader, no canvas
    */
    let arr = Array.from($('.glsl-code,.js-code,.glsl-code-snippet,.glsl-snippet'));

    arr.forEach(t => {
        let path = $(t).attr('data-example');
        let params = {};
        let strParams = $(t).attr('data-params');


        if (strParams) {
            params = JSON.parse(strParams);
        }

        if (!path) { return; }

        // let relPath = '../' + path;
        let relPath = path;

        fetch(relPath)
            .then(res => res.text())
            .then(fragShaderCode => {
                fs = t.innerHTML = fragShaderCode;

                // let texPath = $(t).attr('data-tex0');

                // If it's a glsl example, add the rendered result:
                // Get the div immediately following the textarea,
                // this is where we'll load the sketch
                // But p5 expects it to have to have an ID, so assign it one.
                if ($(t).hasClass('glsl-code')) {
                    $('<div>').insertAfter(t).attr('id', relPath);
                    new p5(makeSketch(fs, params), relPath);
                }

                CodeMirror.fromTextArea(t, {
                    lineNumbers: true,
                    readOnly: true
                });
            });
    });
})();