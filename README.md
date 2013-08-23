# <name>flatify</end>

## Summary

<description>Flatten Objects into Strings</end>

An alternative to JSON serialisation 

## Download

<codeBlock("npm install " + name)>
```
npm install flatify
```
</end>

## Usage

Run this:
<showFile("example/readme.js")>
``` javascript
var flatify = require('../');

var string = flatify.flatten({ a : 1, b: [{c: '2' }], d:3 });
console.log("Flatten to string...");
console.log(string);

var obj = flatify.expand(string);
console.log("Expand back to object...");
console.log(obj);
```
</end>

Results in:
<runFile("example/readme.js")>
```
Flatten to string...
a=1
b[0].c="2"
d=3
Expand back to object...
{ a: 1, b: [ { c: '2' } ], d: 3 }

```
</end>


<license()>
#### MIT License

Copyright &copy; 2013 Jaime Pillora &lt;dev@jpillora.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</end>
