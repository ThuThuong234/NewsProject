const express = require('express');
var bodyParser = require('body-parser');
const auth_utils = require('../../lib/auth_utils');
const utils = require('../../app/helpers/api_helper');
const feedbacksServices = require("../../app/services/feedbacksServices");
var app = express();
app.use(bodyParser.json());


app.get('/', function (req, res) {

    feedbacksServices.getFeedbacks().then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
module.exports = app;