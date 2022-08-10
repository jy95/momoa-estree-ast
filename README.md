# ESTree-compatible MOMOA AST parser

A small wrapper around [@humanwhocodes/momoa] that translates its output to the [ESTree Spec], which makes it usable for example as a [jscodeshift] parser.

[json-to-ast]: https://github.com/humanwhocodes/momoa
[ESTree Spec]: https://github.com/estree/estree
[jscodeshift]: https://www.npmjs.com/package/jscodeshift

## Installation
```
npm install momoa-estree-ast
```

## Usage

```js
const { parse } = require('momoa-estree-ast');

// See https://github.com/humanwhocodes/momoa#parsing 
const options = {
  // set to true if you want to parse C-style line and block comments inside of JSON.
  comments: false,
  // set to true if you want each node to also have a range property, which is an array containing the start and stop index for the syntax. If tokens is also true, then the tokens will also have range properties.
  ranges: false,
  // set to true to return a tokens property on the root node containing all of the tokens used to parse the code. If comments is also true, then the tokens include comment tokens.
  tokens: false,
}

parse('{"a": 1}', options);
```

Output
```js
{
  type: 'Program',
  body: [
    {
      type: 'ObjectExpression',
      properties: [
        {
          type: 'Property',
          key: {
            type: 'Identifier',
            name: 'a',
            raw: '"a"',
            loc: {
              start: { line: 1, column: 1 },
              end: { line: 1, column: 4 },
              source: 'data.json'
            }
          },
          kind: 'init',
          value: {
            type: 'Literal',
            value: 1,
            raw: '1',
            loc: {
              start: { line: 1, column: 6 },
              end: { line: 1, column: 7 },
              source: 'data.json'
            }
          },
          loc: {
            start: { line: 1, column: 1 },
            end: { line: 1, column: 7 },
            source: 'data.json'
          }
        }
      ],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: 1, column: 8 },
        source: 'data.json'
      }
    }
  ],
  loc: {
    start: { line: 1, column: 0 },
    end: { line: 1, column: 8 },
    source: 'data.json'
  }
}
```

## Node types

#### ObjectExpression
```js
{
  type: 'ObjectExpression',
  properties: Property[],
  loc?: SourceLocation
}
```

#### Property
```js
{
  type: 'Property',
  key: Identifier,
  kind: 'init',
  value: ObjectExpression | ArrayExpression | Literal,
  loc?: SourceLocation
}
```

#### Identifier
```js
{
  type: 'Identifier',
  name: string,
  raw: string,
  loc?: SourceLocation
}
```

#### ArrayExpression
```js
{
  type: 'ArrayExpression',
  children: (ObjectExpression | ArrayExpression | Literal)[],
  loc?: SourceLocation
}
```

#### Literal
```js
{
  type: 'Literal',
  value: string | number | boolean | null,
  raw: string,
  loc?: SourceLocation
}
```

#### SourceLocation
```js
{
  source?: string,
  start: SourcePosition,
  end: SourcePosition
}
```

#### SourcePosition
```js
{
  line: number,
  column: number
}
```

## License
MIT