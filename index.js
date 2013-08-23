var esc = function(symbol) {
  return "\\"+symbol;
};

var flatten = function(obj) {
  return (function acc(obj, line, lines) {
    if(typeof obj === 'function' || typeof obj === 'undefined')
      return;
    if(obj === null)
      return lines.push(line + '=null');
    if(typeof obj !== 'object')
      return lines.push(line + '=' + (typeof obj === 'string' ? ('"'+obj+'"') : obj));

    var arr = obj instanceof Array;
    var empty = true;
    for(var k in obj) {
      empty = false;
      var ke = k.replace(/[\[\]\.=]/g, esc);
      acc(obj[k], line.length ? line + (arr ? ('['+ke+']') : '.' + ke) : ke, lines);
    }
    if(empty)
      lines.push(line + '='+ (arr ? '[]' : '{}'));
    return lines;
  })(obj, '', []).join('\n');
};

var expand = function(str) {
  var obj = {}, o, k, v, i, cha, c,
      line, lines = str.split('\n');
  for(i = 0; i < lines.length; ++i) {
    line = lines[i]; k = '', o = obj, c = 0;
    while(cha = line.charAt(c++)) {
      if(cha === '\\') {
        k += line.charAt(c++);
      } else if(cha === '=') {
        v = line.substr(c);
        if(v === '{}')
          o[k] = {};
        else if(v === '[]')
          o[k] = [];
        else if(v.charAt(0) === '"')
          o[k] = v.substr(1,v.length-2);
        else if(/true|false/.test(v))
          o[k] = v === 'true';
        else if(/-?\d+(\.\d+)?/.test(v))
          o[k] = parseFloat(v, 10);
        else
          o[k] = null;
        break;
      } else if(cha === '.') {
        if(!o[k]) o[k] = {};
        o = o[k];
        k = '';
      } else if(cha === '[') {
        if(!o[k]) o[k] = [];
        o = o[k];
        if(/^(\d+)\]/.test(line.substr(c)))
          c += (k = RegExp.$1).length+1;
      } else {
        k += cha;
      }
    }
  }
  return obj;
};

module.exports = flatten;
module.exports.flatten = flatten;
module.exports.expand = expand;
