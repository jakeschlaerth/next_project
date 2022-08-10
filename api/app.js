// app.js
var express = require('express');
var cors = require('cors')
var app = express();

app.use(cors());
app.use(express.json());
BigInt.prototype.toJSON = function () { return this.toString() }
module.exports = app;
