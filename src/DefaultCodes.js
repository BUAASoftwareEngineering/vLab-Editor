function curentTime() {
    let now = new Date();

    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    let hh = now.getHours();
    let mm = now.getMinutes();

    let clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return (clock);
}

export function defaultCode_python(authorName) {
    let content = [
        '# Created at: ' + curentTime(),
        '',
        '',
        'if __name__ == "__main__":',
        '\tpass',
        '',
    ];
    if (typeof authorName != "undefined") {
        content.unshift('# Created by: ' + authorName);
    }
    return content.join('\n');
}

export function defaultCode_cpp(authorName) {
    let content = [
        '// Created at: ' + curentTime(),
        '',
        '',
        '#include <iostream>',
        '#include <cstdio>',
        'using namespace std;',
        '',
        'int main() {',
        '\treturn 0;',
        '}',
        '',
    ];
    if (typeof authorName != "undefined") {
        content.unshift('// Created by: ' + authorName);
    }
    return content.join('\n');
}

export function defaultCode_c(authorName) {
    let content = [
        '// Created at: ' + curentTime(),
        '',
        '',
        '#include <stdio.h>',
        '',
        'int main() {',
        '\treturn 0;',
        '}',
        '',
    ];
    if (typeof authorName != "undefined") {
        content.unshift('// Created by: ' + authorName);
    }
    return content.join('\n');
}

export function defaultCode_js(authorName) {
    let content = [
        '// Created at: ' + curentTime(),
        '',
        '',
    ];
    if (typeof authorName != "undefined") {
        content.unshift('// Created by: ' + authorName);
    }
    return content.join('\n');
}

export function defaultCode_json(authorName) {
    return `{
        "code": [
            "Hello",
            "World!"
        ]
    }`;
}

const lang2code = new Map([
    ['python', defaultCode_python],
    ['cpp', defaultCode_cpp],
    ['c', defaultCode_c],
    ['javascript', defaultCode_js],
    ['json', defaultCode_json],
]);

export function defaultCode_language(language, authorName) {
    let code = lang2code.get(language);
    if (typeof code == "undefined") {
        code = "";
    } else {
        code = code(authorName);
    }
    return code;
}