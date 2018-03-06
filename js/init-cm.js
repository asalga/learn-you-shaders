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

/*
	Fill all the textareas with glsl shader code.
	This keeps the html files smaller and makes the
	glsl code more maintainable since there will only be
	one place for each example.
*/
(function populateTextAreas() {
    let arr = Array.from(document.getElementsByClassName('glsl-code'));

    arr.forEach(t => {
        let path = t.getAttribute('data-example');

        if (!path) {
            return;
        }
        
        path = '../' + path;

        fetch(path)
            .then(res => res.text())
            .then(code => {
                t.innerHTML = code;

                CodeMirror.fromTextArea(t, {
                    lineNumbers: true,
                    readOnly: true
                });
            });
    });
})();