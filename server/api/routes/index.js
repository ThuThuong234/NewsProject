var express = require("express");
var app = express();
var bodyParser = require('body-parser');
const utils = require('../../app/helpers/api_helper');
const feedbacksServices = require("../../app/services/feedbacksServices");
const newsServicers = require("../../app/services/newsServicers");
const auth_utils = require('../../lib/auth_utils');
app.use(bodyParser.json());
app.get('/', function (req, res) {
    var body = req.body;
    console.log();
    newsServicers.Getlastestnews().then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
app.post('/feedback', function (req, res) {
    var body = req.body;
    console.log(body);
    feedbacksServices.insertFeedbacks(body).then(data => {
        res.status(200).json(utils.successResponse());
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
app.get('/', function (req, res) {
    var body = req.body;
    console.log(body);
    newsServicers.Getlastestnews(body).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
module.exports = app;