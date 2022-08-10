const { parse } = require("@humanwhocodes/momoa");

const visit = (node) => {
    let newNode = {};
    switch (node && node.type) {
        case 'Object':
            newNode.type = 'ObjectExpression';
            newNode.properties = node.members.map(visit);
            break
        case 'Member':
            newNode.type = "Property";
            newNode.kind = 'init';
            newNode.key = {
                type: "Identifier",
                name: node.name.value
            }
            newNode.value = visit(node.value);
            break
        case 'Array':
            newNode.type = 'ArrayExpression';
            newNode.elements = node.elements.map(visit);
            break
        // Then a litteral
        default:
            newNode.type = "Literal";
            newNode.value = node.value;
            newNode.raw = JSON.stringify(node.value);
    }
    if (node.loc) {
        const { start, end } = node.loc
        newNode.loc = {
            start : {
                line: start.line,
                column: start.offset
            },
            end : {
                line: end.line,
                column: end.offset
            }
        }
    }
    // If option ranges is enabled
    if (node.range) {
        newNode.range = node.range;
    }
    // If options token is enable
    if (node.tokens) {
        newNode.tokens = node.tokens;
    }
    return newNode
}

module.exports = {
    parse(source, options) {
      const ast = parse(source, options)
      return {
        type: 'Program',
        body: [visit(ast.body)],
        loc: ast.loc
      }
    }
  }