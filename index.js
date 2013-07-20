var esc = function(symbol) {
  return "\\"+symbol;
};

var flatten = function(obj) {
  return (function acc(obj, line, lines) {
    if(typeof obj === 'function')
    return;
    if(typeof obj !== 'object')
    return lines.push(line + '=' + (typeof obj === 'string' ? ('"'+obj+'"') : obj));


    for(var k in obj) {
      var ke = k.replace(/[\[\]\.=]/g, esc);
      acc( obj[k], line.length ?
          (line) + (obj instanceof Array ? ('['+ke+']') : '.' + ke) : ke,
        lines);
    }
    return lines;
  })(obj, '', []).join('\n');
};

var expand = function(str) {
  var obj = {}, o, k, v, i, cha, c,
    lines = str.split('\n');
  for(i = 0; i < lines.length; ++i) {
    line = lines[i]; k = '', o = obj, c = 0;
    while(cha = line.charAt(c++)) {
      if(cha === '\\') {
        k += line.charAt(c++);
      } else if(cha === '=') {
        v = line.substr(c);
        if(v.charAt(0) === '"')
          o[k] = v.substr(1,v.length-2);
        else if(/true|false/.test(v))
          o[k] = v === 'true';
        else
          o[k] = parseFloat(v, 10);
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
