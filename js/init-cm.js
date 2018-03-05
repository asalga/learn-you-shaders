/*
	Andor Saga
*/

function goNext() {
    // ["http:", "", "localhost:5000", "04", ""]
    let tokens = window.location.href.split('/');
    let tokenIdx = tokens.length - 2;

    // +1 since we're going next! :)
    let num = parseInt(tokens[tokenIdx]) + 1;

    // only append '0' is needed
    let dstChapter = (num < 10) ? '0' + num : num;

    window.location.href = '/' + dstChapter;
}

function goPrev() {
    // ["http:", "", "localhost:5000", "04", ""]
    let tokens = window.location.href.split('/');
    let tokenIdx = tokens.length - 2;

    // -1 since we're going back! :)
    let num = parseInt(tokens[tokenIdx]) - 1;

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
        let path = '../' + t.getAttribute('data-example');

        if (!path) {
            return;
        }

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