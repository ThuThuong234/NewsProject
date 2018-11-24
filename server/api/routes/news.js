const express = require('express');
var bodyParser = require('body-parser');
const auth_untils = require('../../lib/auth_utils');
const utils = require('../../app/helpers/api_helper');
const usersServices = require("../../app/services/usersServices");
const newsServicers = require("../../app/services/newsServicers");
var app = express();
app.use(bodyParser.json());

// get list
app.get('/', function (req, res) {
    newsServicers.getallNews().then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
//get detail of item
app.get('/:id', function (req, res) {
    newsServicers.getNews(req.params.id).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
//get detail new by type id

// add item
app.post('/', function (req, res) {
    var body = req.body;
    newsServicers.insertNews(body).then(data => {
        res.status(200).json(utils.successResponse());
    })
        .catch(error => {
            res.json(utils.failedResponse(error));

        });
});

// update item
app.put('/:id', function (req, res) {
    var body = req.body;
    newsServicers.updateNews(body).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        })
});

// delete item
app.delete('/:id', (req, res,) => {
    newsServicers.Deletenews(req.params.id).then(function () {
        res.status(200).json(utils.successResponse());
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        })
});
// search new
app.get('/:title', function (req, res) {
    newsServicers.Search(req.params.title).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
module.exports = app;