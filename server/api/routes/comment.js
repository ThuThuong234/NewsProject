const express = require('express');
var bodyParser = require('body-parser');
const auth_untils = require('../../lib/auth_utils');
const utils = require('../../app/helpers/api_helper');
const usersServices = require("../../app/services/usersServices");
const newsServicers = require("../../app/services/newsServicers");
const commentsServices  = require("../../app/services/commentsServices");


var app = express();
app.use(bodyParser.json());

//insert
app.post('/', function (req,res) {
    var body = req.body;
    console.log("fxgdxff");
    commentsServices.insertComment(body).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

//get comments
app.get('/', function (req, res) {
    commentsServices.getComments(req.params.id).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

// get detail
app.get('/:id', function (req, res) {
    commentsServices.getCommentsdetails(req.params.id).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));

        });
});

// delete item
app.delete('/id', (req, res,) => {

    commentsServices.Deletecomments(req.id).then(function () {

        res.status(200).json(utils.successResponse());
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
module.exports = app;

