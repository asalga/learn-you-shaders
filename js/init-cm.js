/*
	Andor Saga
*/
var elems = document.getElementsByClassName('glsl-code');

for (let i = 0; i < elems.length; i++) {
    CodeMirror.fromTextArea(elems[i], {
        lineNumbers: true,
        readOnly: true
    });
}





/*
	Gather all the textareas

	load the shaders in the textareas

	run CodeMirror on them
*/

fetch('/shaders/test.glsl')
    .then(res => { return res.text() })
    .then(code => {
        console.log(code);
    });