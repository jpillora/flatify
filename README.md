# flatify

Flatten Objects into Strings

An alternative serialisation method for JavaScript

# Download

```
npm install flatify
```

# Usage

```
var flatify = require('flatify');

var string = flatify.flatten({ a : 1, b: [{c: '2' }], d:3 });

console.log(string);
// a=1
// b[0].c="2"
// d=3

var obj = flatify.expand(string);

console.log(obj);
// { a: 1, b: [ { c: '2' } ], d: 3 }
```



