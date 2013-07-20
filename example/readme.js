var flatify = require('../');

var string = flatify.flatten({ a : 1, b: [{c: '2' }], d:3 });
console.log("Flatten to string...");
console.log(string);

var obj = flatify.expand(string);
console.log("Expand back to object...");
console.log(obj);