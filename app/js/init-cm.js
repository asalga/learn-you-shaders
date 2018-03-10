/*
    Andor Saga
*/

function getZoom() {
    return window.outerWidth / window.innerWidth;
}

$(window).ready(function() {
    // let msg = `Set your browser zoom level to 100%. Shaders may not render properly`;
    // let more_info = `<a href=''>[more info]</a>`;
    // $(`<div id=warn>${msg} ${more_info}</div>`).appendTo('body');
    // toggleWarning();
});

/*
    Deprecated
    Calling pixelDensity(1) removes the need for this function
*/
function toggleWarning() {
    let opacity = getZoom() != 1 ? 1 : 0;
    $('#warn').css('opacity', opacity);
}

$(window).resize(function() {});

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

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

    //asalga.github.io
    window.location.href = '/' + dstChapter;
}


function makeSketch(fs, params) {
    let sh;
    let img0;
    let w, h;

    var sketch = function(p) {
        p.preload = function() {
            let vs = `precision highp float;
                      varying vec2 vPos;
                      attribute vec3 aPosition;
                      void main() {
                        vPos = (gl_Position = vec4(aPosition,1.0)).xy;
                      }`;
            sh = p.createShader(vs, fs);

            if (params.tex0) {
                img0 = p.loadImage(params.tex0);
            }
        }
        p.setup = function() {
            w = params.width || DefaultSketchWidth;
            h = params.height || DefaultSketchHeight;
            p.createCanvas(w, h, p.WEBGL);
            p.pixelDensity(1);
            if (params.loop) {
                // p.loop();
            } else {
                // p.noLoop();
            }
            p.noLoop();
        }

        p.draw = function() {

            p.shader(sh);

            if (fs.match(/uniform\s+vec2\s+u_res/)) {
                console.log(w, h);
                sh.setUniform('u_res', [w, h]);
            }
            if (fs.match(/uniform\s+float\s+u_time/)) {
                sh.setUniform('u_time', p.millis() / 1000);
            }

            // TODO: Add for loop here
            if (fs.match(/uniform\s+sampler2D\s+u_texture0/)) {
                sh.setUniform('u_texture0', img0);
            }

            if (fs.match(/uniform\s+vec3\s+u_mouse/)) {
                let x = p.mouseX.clamp(0, w);
                let y = p.mouseY.clamp(0, h);
                sh.setUniform('u_mouse', [x, y, 0]);
            }

            p.quad(-1, -1, 1, -1, 1, 1, -1, 1);
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
        let strParams = $(t).attr('data-params');
        let params = strParams ? JSON.parse(strParams) : {};

        // inline code
        if (!path) {
            CodeMirror.fromTextArea(t, {
                lineNumbers: true,
                readOnly: true
            });
            return;
        }

        // let relPath = '../' + path;
        let relPath = path;

        fetch(relPath)
            .then(res => res.text())
            .then(fragShaderCode => {
                fs = t.innerHTML = fragShaderCode;

                // If it's a glsl example, add the rendered result:
                // Get the div immediately following the textarea,
                // this is where we'll load the sketch
                // But p5 expects it to have to have an ID, so assign it one.
                if ($(t).hasClass('glsl-code')) {
                    let divContainer = $('<div>').insertAfter(t).attr('id', relPath);
                    $(t).prependTo(divContainer);
                    new p5(makeSketch(fs, params), relPath);
                }

                let cm = CodeMirror.fromTextArea(t, {
                    lineNumbers: true,
                    readOnly: true
                });

                if (params.lines) {
                    params.lines.forEach(l => {
                        cm.addLineClass(l, null, 'line-highlight');
                    });
                }
            });
    });
})();