const express = require('express');
var bodyParser = require('body-parser');
const auth_utils = require('../../lib/auth_utils');
const utils = require('../../app/helpers/api_helper');
const feedbacksServices = require("../../app/services/feedbacksServices");
var app = express();
app.use(bodyParser.json());

//insert
app.post('/', function (req,res) {
    var body = req.body;
    feedbacksServices.insertFeedbacks(body).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
//getfeedback
app.get('/', function (req, res) {

    feedbacksServices.getFeedbacks(req.params.id).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
//getdetail
app.get('/', function (req, res) {

    feedbacksServices.getFeedbackdetails(req.params.id).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
//delete
app.delete('/id', (req, res,) => {

    feedbacksServices.Deletefeedback(req.id).then(function () {

        res.status(200).json(utils.successResponse());
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
module.exports = app;