// app.js
var express = require('express');
var app = express();
app.use(express.json());
BigInt.prototype.toJSON = function () { return this.toString() }
module.exports = app;
