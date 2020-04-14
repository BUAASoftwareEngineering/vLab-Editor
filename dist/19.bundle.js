(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/graphql/graphql.js":
/*!******************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/graphql/graphql.js ***!
  \******************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    comments: {\r\n        lineComment: '#'\r\n    },\r\n    brackets: [\r\n        ['{', '}'],\r\n        ['[', ']'],\r\n        ['(', ')']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"\"\"', close: '\"\"\"', notIn: ['string', 'comment'] },\r\n        { open: '\"', close: '\"', notIn: ['string', 'comment'] },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"\"\"', close: '\"\"\"' },\r\n        { open: '\"', close: '\"' },\r\n    ],\r\n    folding: {\r\n        offSide: true\r\n    }\r\n};\r\nvar language = {\r\n    // Set defaultToken to invalid to see what you do not tokenize yet\r\n    defaultToken: 'invalid',\r\n    tokenPostfix: '.gql',\r\n    keywords: [\r\n        'null', 'true', 'false',\r\n        'query', 'mutation', 'subscription',\r\n        'extend', 'schema', 'directive',\r\n        'scalar', 'type', 'interface', 'union', 'enum', 'input', 'implements',\r\n        'fragment', 'on',\r\n    ],\r\n    typeKeywords: ['Int', 'Float', 'String', 'Boolean', 'ID'],\r\n    directiveLocations: [\r\n        'SCHEMA', 'SCALAR', 'OBJECT', 'FIELD_DEFINITION', 'ARGUMENT_DEFINITION',\r\n        'INTERFACE', 'UNION', 'ENUM', 'ENUM_VALUE', 'INPUT_OBJECT', 'INPUT_FIELD_DEFINITION',\r\n        'QUERY', 'MUTATION', 'SUBSCRIPTION', 'FIELD', 'FRAGMENT_DEFINITION',\r\n        'FRAGMENT_SPREAD', 'INLINE_FRAGMENT', 'VARIABLE_DEFINITION',\r\n    ],\r\n    operators: ['=', '!', '?', ':', '&', '|'],\r\n    // we include these common regular expressions\r\n    symbols: /[=!?:&|]+/,\r\n    // https://facebook.github.io/graphql/draft/#sec-String-Value\r\n    escapes: /\\\\(?:[\"\\\\\\/bfnrt]|u[0-9A-Fa-f]{4})/,\r\n    // The main tokenizer for our languages\r\n    tokenizer: {\r\n        root: [\r\n            // fields and argument names\r\n            [\r\n                /[a-z_][\\w$]*/,\r\n                {\r\n                    cases: {\r\n                        '@keywords': 'keyword',\r\n                        '@default': 'key.identifier',\r\n                    },\r\n                },\r\n            ],\r\n            // identify typed input variables\r\n            [\r\n                /[$][\\w$]*/,\r\n                {\r\n                    cases: {\r\n                        '@keywords': 'keyword',\r\n                        '@default': 'argument.identifier',\r\n                    },\r\n                },\r\n            ],\r\n            // to show class names nicely\r\n            [\r\n                /[A-Z][\\w\\$]*/,\r\n                {\r\n                    cases: {\r\n                        '@typeKeywords': 'keyword',\r\n                        '@default': 'type.identifier',\r\n                    },\r\n                },\r\n            ],\r\n            // whitespace\r\n            { include: '@whitespace' },\r\n            // delimiters and operators\r\n            [/[{}()\\[\\]]/, '@brackets'],\r\n            [\r\n                /@symbols/,\r\n                { cases: { '@operators': 'operator', '@default': '' } },\r\n            ],\r\n            // @ annotations.\r\n            // As an example, we emit a debugging log message on these tokens.\r\n            // Note: message are supressed during the first load -- change some lines to see them.\r\n            [\r\n                /@\\s*[a-zA-Z_\\$][\\w\\$]*/,\r\n                { token: 'annotation', log: 'annotation token: $0' },\r\n            ],\r\n            // numbers\r\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float'],\r\n            [/0[xX][0-9a-fA-F]+/, 'number.hex'],\r\n            [/\\d+/, 'number'],\r\n            // delimiter: after number because of .\\d floats\r\n            [/[;,.]/, 'delimiter'],\r\n            [/\"\"\"/,\r\n                { token: 'string', next: '@mlstring', nextEmbedded: 'markdown' }\r\n            ],\r\n            // strings\r\n            [/\"([^\"\\\\]|\\\\.)*$/, 'string.invalid'],\r\n            [/\"/, { token: 'string.quote', bracket: '@open', next: '@string' }],\r\n        ],\r\n        mlstring: [\r\n            [/[^\"]+/, 'string'],\r\n            ['\"\"\"', { token: 'string', next: '@pop', nextEmbedded: '@pop' }]\r\n        ],\r\n        string: [\r\n            [/[^\\\\\"]+/, 'string'],\r\n            [/@escapes/, 'string.escape'],\r\n            [/\\\\./, 'string.escape.invalid'],\r\n            [/\"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],\r\n        ],\r\n        whitespace: [[/[ \\t\\r\\n]+/, ''], [/#.*$/, 'comment']],\r\n    },\r\n};\r\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/graphql/graphql.js?");

/***/ })

}]);