var defaultCode_python = [
    'print("Hello World!")',
].join('\n');

var defaultCode_cpp = [
    '#include <iostream>',
    'int main() {',
    '\tstd::cout << "Hello World!" << std::endl;',
    '\treturn 0;',
    '}',
].join('\n');

var defaultCode_c = [
    '#include "stdio.h"',
    'int main() {',
    '\tprintf("Hello World!\\n");',
    '\treturn 0;',
    '}',
].join('\n');
