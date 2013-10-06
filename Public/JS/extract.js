var extract = function(tag, markdown) {
  var lines = markdown.match(/^.*([\n\r]+|$)/gm);
  var re = new RegExp('\\b' + tag + '\\b', 'gi');
  results = [];
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].match(re)) {
      var indentation = lines[i].match(/^\s*/)[0].length;
      results.push(lines[i]);
      while (i+1 < lines.length && 
              lines[i+1].match(/^\s*/)[0].length > indentation) {
        results.push(lines[++i]);
      }
    }
  }
  return results;
}   

var args = process.argv.slice(2);
console.log(extract(args[0], args[1]));
