const express = require('express');
var bodyParser = require('body-parser');
const auth_untils = require('../../lib/auth_utils');
const utils = require('../../app/helpers/api_helper');
const usersServices = require("../../app/services/usersServices");
const newsServicers = require("../../app/services/newsServicers");
const typenewServices = require("../../app/services/typenewServices");
var app = express();
app.use(bodyParser.json());
//getType
app.get('/', function (req, res) {

    typenewServices.getalltype().then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
//get detail of item
app.get('/:id', function (req, res) {
    console.log(req.params.id);
    typenewServices.getDetailType(req.params.id).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
// add item
app.post('/', function (req, res) {
    var body = req.body;
    typenewServices.insertType(body).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));

        });
});
module.exports = app;
