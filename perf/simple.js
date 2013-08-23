var flattify = require('../');

var test = function(obj, encode, decode) {

  var time, diff, etime, dtime, result;

  n = 0;
  //encode
  time = process.hrtime();
  while(n < 1e4) {
    encode(obj);
    ++n;
  }
  diff = process.hrtime(time);
  etime = diff[0] * 1e9 + diff[1];

  result = encode(obj);
  n = 0;

  //decode
  time = process.hrtime();
  while(n < 1e4) {
    decode(result);
    ++n;
  }
  diff = process.hrtime(time);
  dtime = diff[0] * 1e9 + diff[1];

  console.log('encode: %d ns, decode: %d ns', etime, dtime);
};

var obj = {
  number: 7,
  string: "str",
  bool: false,
  obj: {},
  arr: [],
  nul: null,
  infinity: Infinity,
  nan: NaN,
  fn: function() {},
  undef: undefined
};
//test many type obj
console.log("JSON");
test(obj, JSON.stringify, JSON.parse);
console.log("flattify");
test(obj, flattify.flatten, flattify.expand);

var obj = {}, i = 100, n = 0;
while(--i) obj[i] = i;

//test 100 key obj
console.log("JSON");
test(obj, JSON.stringify, JSON.parse);
console.log("flattify");
test(obj, flattify.flatten, flattify.expand);
