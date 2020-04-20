export const defaultCode_python = [
    'print("Hello World!")',
].join('\n');

export const defaultCode_cpp = [
    '#include <iostream>',
    'int main() {',
    '\tstd::cout << "Hello World!" << std::endl;',
    '\treturn 0;',
    '}',
].join('\n');

export const defaultCode_c = [
    '#include "stdio.h"',
    'int main() {',
    '\tprintf("Hello World!\\n");',
    '\treturn 0;',
    '}',
].join('\n');

export const defaultCode_js = [
    'console.log("Hello World!");',
].join('\n');

export const defaultCode_json = `{
    "code": [
        "Hello",
        "World!"
    ]
}`;

const lang2code = new Map([
    ['python', defaultCode_python],
    ['cpp', defaultCode_cpp],
    ['c', defaultCode_c],
    ['javascript', defaultCode_js],
    ['json', defaultCode_json],
]);

export function defaultCode_language(language) {
    let code = lang2code.get(language);
    if (typeof code == "undefined") {
        code = "";
    }
    return code;
}