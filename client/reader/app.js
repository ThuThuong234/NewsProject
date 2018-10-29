var express = require('express');
var config = require("config");
var app = express();
app.use("/static",express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.set("views", __dirname+ "/app/views");