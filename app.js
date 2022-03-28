var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   console.log(`Example app listening at http://${host}:${port}`);
})