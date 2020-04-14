(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/perl/perl.js":
/*!************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/perl/perl.js ***!
  \************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n*  Copyright (c) Microsoft Corporation. All rights reserved.\r\n*  Licensed under the MIT License. See License.txt in the project root for license information.\r\n*--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    comments: {\r\n        lineComment: '#',\r\n    },\r\n    brackets: [['{', '}'], ['[', ']'], ['(', ')']],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: \"'\", close: \"'\" },\r\n        { open: '`', close: '`' },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: \"'\", close: \"'\" },\r\n        { open: '`', close: '`' },\r\n    ],\r\n};\r\nvar language = {\r\n    defaultToken: '',\r\n    tokenPostfix: '.perl',\r\n    brackets: [\r\n        { token: 'delimiter.bracket', open: '{', close: '}' },\r\n        { token: 'delimiter.parenthesis', open: '(', close: ')' },\r\n        { token: 'delimiter.square', open: '[', close: ']' },\r\n    ],\r\n    // https://learn.perl.org/docs/keywords.html\r\n    // Perl syntax\r\n    keywords: [\r\n        '__DATA__',\r\n        'else',\r\n        'lock',\r\n        '__END__',\r\n        'elsif',\r\n        'lt',\r\n        '__FILE__',\r\n        'eq',\r\n        '__LINE__',\r\n        'exp',\r\n        'ne',\r\n        'sub',\r\n        '__PACKAGE__',\r\n        'for',\r\n        'no',\r\n        'and',\r\n        'foreach',\r\n        'or',\r\n        'unless',\r\n        'cmp',\r\n        'ge',\r\n        'package',\r\n        'until',\r\n        'continue',\r\n        'gt',\r\n        'while',\r\n        'CORE',\r\n        'if',\r\n        'xor',\r\n        'do',\r\n        'le',\r\n        '__DIE__',\r\n        '__WARN__',\r\n    ],\r\n    // Perl functions\r\n    builtinFunctions: [\r\n        '-A',\r\n        'END',\r\n        'length',\r\n        'setpgrp',\r\n        '-B',\r\n        'endgrent',\r\n        'link',\r\n        'setpriority',\r\n        '-b',\r\n        'endhostent',\r\n        'listen',\r\n        'setprotoent',\r\n        '-C',\r\n        'endnetent',\r\n        'local',\r\n        'setpwent',\r\n        '-c',\r\n        'endprotoent',\r\n        'localtime',\r\n        'setservent',\r\n        '-d',\r\n        'endpwent',\r\n        'log',\r\n        'setsockopt',\r\n        '-e',\r\n        'endservent',\r\n        'lstat',\r\n        'shift',\r\n        '-f',\r\n        'eof',\r\n        'map',\r\n        'shmctl',\r\n        '-g',\r\n        'eval',\r\n        'mkdir',\r\n        'shmget',\r\n        '-k',\r\n        'exec',\r\n        'msgctl',\r\n        'shmread',\r\n        '-l',\r\n        'exists',\r\n        'msgget',\r\n        'shmwrite',\r\n        '-M',\r\n        'exit',\r\n        'msgrcv',\r\n        'shutdown',\r\n        '-O',\r\n        'fcntl',\r\n        'msgsnd',\r\n        'sin',\r\n        '-o',\r\n        'fileno',\r\n        'my',\r\n        'sleep',\r\n        '-p',\r\n        'flock',\r\n        'next',\r\n        'socket',\r\n        '-r',\r\n        'fork',\r\n        'not',\r\n        'socketpair',\r\n        '-R',\r\n        'format',\r\n        'oct',\r\n        'sort',\r\n        '-S',\r\n        'formline',\r\n        'open',\r\n        'splice',\r\n        '-s',\r\n        'getc',\r\n        'opendir',\r\n        'split',\r\n        '-T',\r\n        'getgrent',\r\n        'ord',\r\n        'sprintf',\r\n        '-t',\r\n        'getgrgid',\r\n        'our',\r\n        'sqrt',\r\n        '-u',\r\n        'getgrnam',\r\n        'pack',\r\n        'srand',\r\n        '-w',\r\n        'gethostbyaddr',\r\n        'pipe',\r\n        'stat',\r\n        '-W',\r\n        'gethostbyname',\r\n        'pop',\r\n        'state',\r\n        '-X',\r\n        'gethostent',\r\n        'pos',\r\n        'study',\r\n        '-x',\r\n        'getlogin',\r\n        'print',\r\n        'substr',\r\n        '-z',\r\n        'getnetbyaddr',\r\n        'printf',\r\n        'symlink',\r\n        'abs',\r\n        'getnetbyname',\r\n        'prototype',\r\n        'syscall',\r\n        'accept',\r\n        'getnetent',\r\n        'push',\r\n        'sysopen',\r\n        'alarm',\r\n        'getpeername',\r\n        'quotemeta',\r\n        'sysread',\r\n        'atan2',\r\n        'getpgrp',\r\n        'rand',\r\n        'sysseek',\r\n        'AUTOLOAD',\r\n        'getppid',\r\n        'read',\r\n        'system',\r\n        'BEGIN',\r\n        'getpriority',\r\n        'readdir',\r\n        'syswrite',\r\n        'bind',\r\n        'getprotobyname',\r\n        'readline',\r\n        'tell',\r\n        'binmode',\r\n        'getprotobynumber',\r\n        'readlink',\r\n        'telldir',\r\n        'bless',\r\n        'getprotoent',\r\n        'readpipe',\r\n        'tie',\r\n        'break',\r\n        'getpwent',\r\n        'recv',\r\n        'tied',\r\n        'caller',\r\n        'getpwnam',\r\n        'redo',\r\n        'time',\r\n        'chdir',\r\n        'getpwuid',\r\n        'ref',\r\n        'times',\r\n        'CHECK',\r\n        'getservbyname',\r\n        'rename',\r\n        'truncate',\r\n        'chmod',\r\n        'getservbyport',\r\n        'require',\r\n        'uc',\r\n        'chomp',\r\n        'getservent',\r\n        'reset',\r\n        'ucfirst',\r\n        'chop',\r\n        'getsockname',\r\n        'return',\r\n        'umask',\r\n        'chown',\r\n        'getsockopt',\r\n        'reverse',\r\n        'undef',\r\n        'chr',\r\n        'glob',\r\n        'rewinddir',\r\n        'UNITCHECK',\r\n        'chroot',\r\n        'gmtime',\r\n        'rindex',\r\n        'unlink',\r\n        'close',\r\n        'goto',\r\n        'rmdir',\r\n        'unpack',\r\n        'closedir',\r\n        'grep',\r\n        'say',\r\n        'unshift',\r\n        'connect',\r\n        'hex',\r\n        'scalar',\r\n        'untie',\r\n        'cos',\r\n        'index',\r\n        'seek',\r\n        'use',\r\n        'crypt',\r\n        'INIT',\r\n        'seekdir',\r\n        'utime',\r\n        'dbmclose',\r\n        'int',\r\n        'select',\r\n        'values',\r\n        'dbmopen',\r\n        'ioctl',\r\n        'semctl',\r\n        'vec',\r\n        'defined',\r\n        'join',\r\n        'semget',\r\n        'wait',\r\n        'delete',\r\n        'keys',\r\n        'semop',\r\n        'waitpid',\r\n        'DESTROY',\r\n        'kill',\r\n        'send',\r\n        'wantarray',\r\n        'die',\r\n        'last',\r\n        'setgrent',\r\n        'warn',\r\n        'dump',\r\n        'lc',\r\n        'sethostent',\r\n        'write',\r\n        'each',\r\n        'lcfirst',\r\n        'setnetent',\r\n    ],\r\n    // File handlers\r\n    builtinFileHandlers: ['ARGV', 'STDERR', 'STDOUT', 'ARGVOUT', 'STDIN', 'ENV'],\r\n    // Perl variables\r\n    builtinVariables: [\r\n        '$!',\r\n        '$^RE_TRIE_MAXBUF',\r\n        '$LAST_REGEXP_CODE_RESULT',\r\n        '$\"',\r\n        '$^S',\r\n        '$LIST_SEPARATOR',\r\n        '$#',\r\n        '$^T',\r\n        '$MATCH',\r\n        '$$',\r\n        '$^TAINT',\r\n        '$MULTILINE_MATCHING',\r\n        '$%',\r\n        '$^UNICODE',\r\n        '$NR',\r\n        '$&',\r\n        '$^UTF8LOCALE',\r\n        '$OFMT',\r\n        \"$'\",\r\n        '$^V',\r\n        '$OFS',\r\n        '$(',\r\n        '$^W',\r\n        '$ORS',\r\n        '$)',\r\n        '$^WARNING_BITS',\r\n        '$OS_ERROR',\r\n        '$*',\r\n        '$^WIDE_SYSTEM_CALLS',\r\n        '$OSNAME',\r\n        '$+',\r\n        '$^X',\r\n        '$OUTPUT_AUTO_FLUSH',\r\n        '$,',\r\n        '$_',\r\n        '$OUTPUT_FIELD_SEPARATOR',\r\n        '$-',\r\n        '$`',\r\n        '$OUTPUT_RECORD_SEPARATOR',\r\n        '$.',\r\n        '$a',\r\n        '$PERL_VERSION',\r\n        '$/',\r\n        '$ACCUMULATOR',\r\n        '$PERLDB',\r\n        '$0',\r\n        '$ARG',\r\n        '$PID',\r\n        '$:',\r\n        '$ARGV',\r\n        '$POSTMATCH',\r\n        '$;',\r\n        '$b',\r\n        '$PREMATCH',\r\n        '$<',\r\n        '$BASETIME',\r\n        '$PROCESS_ID',\r\n        '$=',\r\n        '$CHILD_ERROR',\r\n        '$PROGRAM_NAME',\r\n        '$>',\r\n        '$COMPILING',\r\n        '$REAL_GROUP_ID',\r\n        '$?',\r\n        '$DEBUGGING',\r\n        '$REAL_USER_ID',\r\n        '$@',\r\n        '$EFFECTIVE_GROUP_ID',\r\n        '$RS',\r\n        '$[',\r\n        '$EFFECTIVE_USER_ID',\r\n        '$SUBSCRIPT_SEPARATOR',\r\n        '$\\\\',\r\n        '$EGID',\r\n        '$SUBSEP',\r\n        '$]',\r\n        '$ERRNO',\r\n        '$SYSTEM_FD_MAX',\r\n        '$^',\r\n        '$EUID',\r\n        '$UID',\r\n        '$^A',\r\n        '$EVAL_ERROR',\r\n        '$WARNING',\r\n        '$^C',\r\n        '$EXCEPTIONS_BEING_CAUGHT',\r\n        '$|',\r\n        '$^CHILD_ERROR_NATIVE',\r\n        '$EXECUTABLE_NAME',\r\n        '$~',\r\n        '$^D',\r\n        '$EXTENDED_OS_ERROR',\r\n        '%!',\r\n        '$^E',\r\n        '$FORMAT_FORMFEED',\r\n        '%^H',\r\n        '$^ENCODING',\r\n        '$FORMAT_LINE_BREAK_CHARACTERS',\r\n        '%ENV',\r\n        '$^F',\r\n        '$FORMAT_LINES_LEFT',\r\n        '%INC',\r\n        '$^H',\r\n        '$FORMAT_LINES_PER_PAGE',\r\n        '%OVERLOAD',\r\n        '$^I',\r\n        '$FORMAT_NAME',\r\n        '%SIG',\r\n        '$^L',\r\n        '$FORMAT_PAGE_NUMBER',\r\n        '@+',\r\n        '$^M',\r\n        '$FORMAT_TOP_NAME',\r\n        '@-',\r\n        '$^N',\r\n        '$GID',\r\n        '@_',\r\n        '$^O',\r\n        '$INPLACE_EDIT',\r\n        '@ARGV',\r\n        '$^OPEN',\r\n        '$INPUT_LINE_NUMBER',\r\n        '@INC',\r\n        '$^P',\r\n        '$INPUT_RECORD_SEPARATOR',\r\n        '@LAST_MATCH_START',\r\n        '$^R',\r\n        '$LAST_MATCH_END',\r\n        '$^RE_DEBUG_FLAGS',\r\n        '$LAST_PAREN_MATCH',\r\n    ],\r\n    // operators\r\n    symbols: /[:+\\-\\^*$&%@=<>!?|\\/~\\.]/,\r\n    quoteLikeOps: ['qr', 'm', 's', 'q', 'qq', 'qx', 'qw', 'tr', 'y'],\r\n    escapes: /\\\\(?:[abfnrtv\\\\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\r\n    // The main tokenizer for our languages\r\n    tokenizer: {\r\n        root: [\r\n            { include: '@whitespace' },\r\n            [\r\n                /[a-zA-Z\\-_][\\w\\-_]*/,\r\n                {\r\n                    cases: {\r\n                        '@keywords': 'keyword',\r\n                        '@builtinFunctions': 'type.identifier',\r\n                        '@builtinFileHandlers': 'variable.predefined',\r\n                        '@quoteLikeOps': { token: '@rematch', next: 'quotedConstructs' },\r\n                        '@default': '',\r\n                    },\r\n                },\r\n            ],\r\n            // Perl variables\r\n            [\r\n                /[\\$@%][*@#?\\+\\-\\$!\\w\\\\\\^><~:;\\.]+/,\r\n                {\r\n                    cases: {\r\n                        '@builtinVariables': 'variable.predefined',\r\n                        '@default': 'variable',\r\n                    },\r\n                },\r\n            ],\r\n            { include: '@strings' },\r\n            { include: '@dblStrings' },\r\n            // Perl Doc\r\n            { include: '@perldoc' },\r\n            // Here Doc\r\n            { include: '@heredoc' },\r\n            [/[{}\\[\\]()]/, '@brackets'],\r\n            // RegExp\r\n            [\r\n                /[\\/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\\\/|[^\\]\\/]))*[\\/]\\w*\\s*(?=[).,;]|$)/,\r\n                'regexp',\r\n            ],\r\n            [/@symbols/, 'operators'],\r\n            { include: '@numbers' },\r\n            [/[,;]/, 'delimiter'],\r\n        ],\r\n        whitespace: [\r\n            [/\\s+/, 'white'],\r\n            [/(^#!.*$)/, 'metatag'],\r\n            [/(^#.*$)/, 'comment'],\r\n        ],\r\n        numbers: [\r\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float'],\r\n            [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, 'number.hex'],\r\n            [/\\d+/, 'number'],\r\n        ],\r\n        // Single quote string\r\n        strings: [[/'/, 'string', '@stringBody']],\r\n        stringBody: [\r\n            [/'/, 'string', '@popall'],\r\n            [/\\\\'/, 'string.escape'],\r\n            [/./, 'string'],\r\n        ],\r\n        // Double quote string\r\n        dblStrings: [[/\"/, 'string', '@dblStringBody']],\r\n        dblStringBody: [\r\n            [/\"/, 'string', '@popall'],\r\n            [/@escapes/, 'string.escape'],\r\n            [/\\\\./, 'string.escape.invalid'],\r\n            { include: '@variables' },\r\n            [/./, 'string'],\r\n        ],\r\n        // Quoted constructs\r\n        // Percent strings in Ruby are similar to quote-like operators in Perl.\r\n        // This is adapted from pstrings in ../ruby/ruby.ts.\r\n        quotedConstructs: [\r\n            [/(q|qw|tr|y)\\s*\\(/, { token: 'string.delim', switchTo: '@qstring.(.)' }],\r\n            [/(q|qw|tr|y)\\s*\\[/, { token: 'string.delim', switchTo: '@qstring.[.]' }],\r\n            [/(q|qw|tr|y)\\s*\\{/, { token: 'string.delim', switchTo: '@qstring.{.}' }],\r\n            [/(q|qw|tr|y)\\s*</, { token: 'string.delim', switchTo: '@qstring.<.>' }],\r\n            [/(q|qw|tr|y)#/, { token: 'string.delim', switchTo: '@qstring.#.#' }],\r\n            [/(q|qw|tr|y)\\s*([^A-Za-z0-9#\\s])/, { token: 'string.delim', switchTo: '@qstring.$2.$2' }],\r\n            [/(q|qw|tr|y)\\s+(\\w)/, { token: 'string.delim', switchTo: '@qstring.$2.$2' }],\r\n            [/(qr|m|s)\\s*\\(/, { token: 'regexp.delim', switchTo: '@qregexp.(.)' }],\r\n            [/(qr|m|s)\\s*\\[/, { token: 'regexp.delim', switchTo: '@qregexp.[.]' }],\r\n            [/(qr|m|s)\\s*\\{/, { token: 'regexp.delim', switchTo: '@qregexp.{.}' }],\r\n            [/(qr|m|s)\\s*</, { token: 'regexp.delim', switchTo: '@qregexp.<.>' }],\r\n            [/(qr|m|s)#/, { token: 'regexp.delim', switchTo: '@qregexp.#.#' }],\r\n            [/(qr|m|s)\\s*([^A-Za-z0-9_#\\s])/, { token: 'regexp.delim', switchTo: '@qregexp.$2.$2' }],\r\n            [/(qr|m|s)\\s+(\\w)/, { token: 'regexp.delim', switchTo: '@qregexp.$2.$2' }],\r\n            [/(qq|qx)\\s*\\(/, { token: 'string.delim', switchTo: '@qqstring.(.)' }],\r\n            [/(qq|qx)\\s*\\[/, { token: 'string.delim', switchTo: '@qqstring.[.]' }],\r\n            [/(qq|qx)\\s*\\{/, { token: 'string.delim', switchTo: '@qqstring.{.}' }],\r\n            [/(qq|qx)\\s*</, { token: 'string.delim', switchTo: '@qqstring.<.>' }],\r\n            [/(qq|qx)#/, { token: 'string.delim', switchTo: '@qqstring.#.#' }],\r\n            [/(qq|qx)\\s*([^A-Za-z0-9#\\s])/, { token: 'string.delim', switchTo: '@qqstring.$2.$2' }],\r\n            [/(qq|qx)\\s+(\\w)/, { token: 'string.delim', switchTo: '@qqstring.$2.$2' }],\r\n        ],\r\n        // Non-expanded quoted string\r\n        // qstring<open>.<close>\r\n        //  open = open delimiter\r\n        //  close = close delimiter\r\n        qstring: [\r\n            [/\\\\./, 'string.escape'],\r\n            [/./, {\r\n                    cases: {\r\n                        '$#==$S3': { token: 'string.delim', next: '@pop' },\r\n                        '$#==$S2': { token: 'string.delim', next: '@push' },\r\n                        '@default': 'string'\r\n                    }\r\n                }],\r\n        ],\r\n        // Quoted regexp\r\n        // qregexp.<open>.<close>\r\n        //  open = open delimiter\r\n        //  close = close delimiter\r\n        qregexp: [\r\n            { include: '@variables' },\r\n            [/\\\\./, 'regexp.escape'],\r\n            [/./, {\r\n                    cases: {\r\n                        '$#==$S3': { token: 'regexp.delim', next: '@regexpModifiers' },\r\n                        '$#==$S2': { token: 'regexp.delim', next: '@push' },\r\n                        '@default': 'regexp'\r\n                    }\r\n                }],\r\n        ],\r\n        regexpModifiers: [\r\n            [/[msixpodualngcer]+/, { token: 'regexp.modifier', next: '@popall' }],\r\n        ],\r\n        // Expanded quoted string\r\n        // qqstring.<open>.<close>\r\n        //  open = open delimiter\r\n        //  close = close delimiter\r\n        qqstring: [\r\n            { include: '@variables' },\r\n            { include: '@qstring' },\r\n        ],\r\n        heredoc: [\r\n            [\r\n                /<<\\s*['\"`]?([\\w\\-]+)['\"`]?/,\r\n                { token: 'string.heredoc.delimiter', next: '@heredocBody.$1' },\r\n            ],\r\n        ],\r\n        heredocBody: [\r\n            [\r\n                /^([\\w\\-]+)$/,\r\n                {\r\n                    cases: {\r\n                        '$1==$S2': [{ token: 'string.heredoc.delimiter', next: '@popall' }],\r\n                        '@default': 'string.heredoc',\r\n                    },\r\n                },\r\n            ],\r\n            [/./, 'string.heredoc'],\r\n        ],\r\n        perldoc: [[/^=\\w/, 'comment.doc', '@perldocBody']],\r\n        perldocBody: [\r\n            [/^=cut\\b/, 'type.identifier', '@popall'],\r\n            [/./, 'comment.doc'],\r\n        ],\r\n        variables: [\r\n            [/\\$\\w+/, 'variable'],\r\n            [/@\\w+/, 'variable'],\r\n            [/%\\w+/, 'variable'],\r\n        ],\r\n    },\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/perl/perl.js?");

/***/ })

}]);