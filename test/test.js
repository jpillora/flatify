var expect = require("chai").expect;
var flattify = require("../");

//expect json equivalent serialisation
var run = function(obj) {

  var jsonstr = JSON.stringify(obj);
  var jsonobj = JSON.parse(jsonstr);

  var flatstr = flattify.flatten(obj);
  var flatobj = flattify.expand(flatstr);

  expect(jsonobj).to.deep.equal(flatobj);
};

describe("flatten and expand back to the original", function() {

  it("simple", function() {
    run({ a: 42 });
  });

  it.only("all types", function() {
    //undefined and functions not supported
    run({
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
    });
  });

  it("package.json", function() {
    run(require('../package.json'));
  });

  it("complicated", function() {
    run({
      "widget": {
        "debug": "on",
        "window": {
            "title": "Sample Konfabulator Widget",
            "name": "main_window",
            "width": 500,
            "height": 500
        },
        "image": {
            "src": "Images/Sun.png",
            "name": "sun1",
            "hOffset": 250,
            "vOffset": 250,
            "alignment": "center"
        },
        "text": {
            "data": "Click Here",
            "size": 36,
            "style": "bold",
            "name": "text1",
            "hOffset": 250,
            "vOffset": 100,
            "alignment": "center",
            "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
        }
      }
    });
  });

});