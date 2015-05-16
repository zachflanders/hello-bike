var express = require('express');
var app = express();
var path = require('path');

app.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.listen(8000);
console.log('App running on port 8000;')
