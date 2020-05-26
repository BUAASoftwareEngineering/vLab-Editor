const identifierPattern = "([a-zA-Z_]\\w*)";

export function getTokens(code) {
    let identifier = new RegExp(identifierPattern, "g");
    let tokens = [];
    let array1;
    while ((array1 = identifier.exec(code)) !== null) {
        tokens.push(array1[0]);
    }
    return Array.from(new Set(tokens));
}