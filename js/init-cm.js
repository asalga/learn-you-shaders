/*
	Andor Saga
*/
// var elems = document.getElementsByClassName('glsl-code');

// for (let i = 0; i < elems.length; i++) {
//     CodeMirror.fromTextArea(elems[i], {
//         lineNumbers: true,
//         readOnly: true
//     });
// }


/*
	Gather all the textareas

	load the shaders in the textareas

	run CodeMirror on them
*/

function populateTextAreas() {
    let arr = Array.from(document.getElementsByClassName('glsl-code'));

    //
    arr.forEach(t => {
        let path = '../' + t.getAttribute('data-example');
        console.log(path);

        fetch(path)
            .then(res => res.text())
            .then(code => {
                t.innerHTML = code;
                console.log(code);

                CodeMirror.fromTextArea(t, {
                    lineNumbers: true,
                    readOnly: true
                });
            });
    })

    // for (let i = 0; i < elems.length; i++) {
    //     // elems
    // }
    // 
}

populateTextAreas();