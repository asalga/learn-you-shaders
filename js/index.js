/*
    Andor Saga
    Jan 2018
*/

/*
    container
    value
*/
function addQuestion(c, v) {
    let container = $(c);

    // Not all questions are complete
    if (v.status === 'draft') { return; }

    // Question container that holds question along with answer and code
    let qContainer = $(`<div id=${v.id} class=qContainer>`);

    let id = $(`<div class=questionID>${v.id}</div>`);
    qContainer.append(id);
    container.append(qContainer);

    // for each question
    v.q.forEach(q => {
        let qNote = $(`<div class=question>${q.note}</div>`);
        qContainer.append(qNote);
        if (q.code) {
            mirrorify(qContainer, q.code);
        }
    });


    let showStr = '[show]';
    let showBtn = $(`<a class=show>${showStr}</a>`)
        .click(function() {
            let text = $(this).html();

            // TODO: document!
            if (text === showStr) {
                $(this).siblings('.answer').show(100);
                $(this).html('[hide]');
            } else {
                $(this).siblings('.answer').hide(100);
                $(this).html(showStr);
            }
        });

    qContainer.append(showBtn);

    // A question may have a number of answers
    v.a.forEach((answer, i) => {

        let note = '';
        if(answer.note){
            note = Array.isArray(answer.note) ? answer.note.join('') : answer.note;
        }

        let ansContainer = $(`<div class=answer>${note}</div>`);
        qContainer.append(ansContainer);

        // Not all answer have code examples, so we only want to
        // add a textarea if needed.
        if (answer.code) {
            mirrorify(ansContainer, answer.code);
        }

        // Only after CodeMirror has finished its work, we can hide the code.     
        ansContainer.css({ 'display': 'none' });
    });

    // Tags will help us filter question later on
    if (v.tags) {
        let allTags = v.tags.split(',').map(v => `#${v} `).join('');
        let tags = $(`<div class=tags>${allTags}</div>`);
        qContainer.append(tags);
    }

    if (v['see-also']) {
        let seeAlsoLinks = $('<div class=seeAlso>');
        qContainer.append(seeAlsoLinks);

        v['see-also'].split(',')
            .forEach(v => seeAlsoLinks.append($(`<a href=#${v}>${v}</a>`)));
    }

    container.append(qContainer);
}

/*
    Convert snippets of code into a syntax-highlighted textarea
*/
function mirrorify(container, code) {
    let textarea = $('<textarea class=answerCode>').html(code.join('\n'));
    container.append(textarea, '<br/>');
    CodeMirror.fromTextArea(textarea[0], { lineNumbers: true, readOnly: true });
}

/*
 */
function populateDOM(json) {
    json.questions.forEach((v, i, arr) => {
        addQuestion($('#questions'), v);
    });
}

var json = fetch('public/data/questions.json')
    .then(resp => resp.json())
    .then(data => populateDOM(data));