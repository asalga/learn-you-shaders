/*
    Andor Saga
*/

'use strict';

$(window).ready(function() {});
$(window).resize(function() {});

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function makeSketch(fs, params) {
  const DefaultSketchWidth = 320;
  const DefaultSketchHeight = 240;
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
    };

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
    };

    p.draw = function() {
      p.shader(sh);

      if (fs.match(/uniform\s+vec2\s+u_res/)) {
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
    };
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

    // If we have a textarea without a path, it means that textarea
    // only has some inline code that doesn't require CodeMirror
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
        let fs = t.innerHTML = fragShaderCode;

        // If it's a glsl example, add the rendered result:
        // Get the div immediately following the textarea,
        // this is where we'll load the sketch
        // But p5 expects it to have to have an ID, so assign it one.

        // Other snippets are for js or vert shaders
        // that we don't want to make sketches for

        // If we have a glsl-code AND it should render
        // we'll need to build up some meta data stuff.
        if ($(t).hasClass('glsl-code') && (params && params.render !== 'false')) {

          // Will contain the glsl CodeMirror and the canvas
          let divContainer = $('<div>')
            .insertAfter(t)
            .addClass('lazy')
            .attr('id', relPath)
            .attr('data-lys-code', fs)
            .attr('data-lys-params', strParams)
            .attr('data-lys-relPath', relPath)
            .attr('data-loader', 'customLoaderName');

          $(t).prependTo(divContainer);

          // Moved to lazy load
          // new p5(makeSketch(fs, params), relPath);
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
      })


      // Once we filled in all the textareas with our code,
      // we're ready to lazy load the canvases
      .then(() => {
        $(function() {

          $('.lazy').lazy({
            delay: 2500,
            customLoaderName: function(el) {
              console.log('customLoaderName');
            },
            afterLoad: function(el) {
              console.log('afterLoad');
              let fs = el.attr('data-lys-code');
              let relPath = el.attr('data-lys-relPath');
              let strParams = el.attr('data-lys-params');
              let params = strParams ? JSON.parse(strParams) : {};

              new p5(makeSketch(fs, params), relPath);
            },
            beforeLoad: function() {
              console.log('beforeLoad');
            }
          });
        });
      });
  });
})();