require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function () {

    var fileCounter = 0;
    var editorArray = [];

    function newEditor(container_id, code, language) {
        var model = monaco.editor.createModel(code, language);
        var editor = monaco.editor.create(document.getElementById(container_id), {
            model: model,
        });
        editorArray.push(editor);
        return editor;
    }

    function addNewEditor(code, language) {
        var new_container = document.createElement("DIV");
        new_container.id = "container-" + fileCounter.toString(10);
        new_container.className = "container";
        document.getElementById("root").appendChild(new_container);
        var editor = newEditor(new_container.id, code, language);
        fileCounter += 1;
        return editor;
    }

    function getCode(editor) {
        return editor.getModel().getValue();
    }
    
    // chars, including \n, \t !!!
    function getCodeLength(editor) {
        return editor.getModel().getValueLength();
    }

    function getCursorPosition(editor) {
        let line = editor.getPosition().lineNumber;
        let column = editor.getPosition().column;
        return {ln: line, col:column};
    }

    function setCursorPosition(editor, ln, col) {
        let pos = {lineNumber: ln, column: col};
        editor.setPosition(pos);
    }

    // addNewEditor(defaultCode_python, 'python');
    // addNewEditor(defaultCode_c, 'c');
    addNewEditor(defaultCode_cpp, 'cpp');
});