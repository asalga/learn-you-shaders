var elems = document.getElementsByClassName('glsl-code');

for (let i = 0; i < elems.length; i++) {
    CodeMirror.fromTextArea(elems[i], {
        lineNumbers: true,
        readOnly: true
    });
}