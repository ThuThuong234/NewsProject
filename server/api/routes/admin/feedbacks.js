const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const auth_utils = require('../../../lib/auth_utils');
const utils = require('../../../app/helpers/api_helper');
const feedbacksServices = require("../../../app/services/feedbacksServices");
var app = express();
app.use(bodyParser.json());

app.post('/', function (req, res) {
    var body = req.body;
    console.log(body);
    feedbacksServices.insertFeedbacks(body).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

app.get('/', function (req, res) {

    feedbacksServices.getFeedbacks().then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
module.exports = app;