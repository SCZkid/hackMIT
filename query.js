//keywords: mongo search for tags, identify files to parse with extract
var server = require("./server");
var mongoose = server.mongoose;
mongoose.connect('mongodb:hack:hack,hack.kalosal.com/test');
var db = mongoose.connection;
Doc.find(function(err, notes) {
  if (err) {
    return err;
  } else {
    console.log(notes);
  }
});
