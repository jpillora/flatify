var assert = require("assert");
var flattify = require("../");

var run = function(obj) {
  assert.deepEqual(obj,flattify.expand(flattify.flatten(obj)));
};

describe("flatten and expand back to the original", function() {

  it("simple", function() {
    run({ a: 42 });
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