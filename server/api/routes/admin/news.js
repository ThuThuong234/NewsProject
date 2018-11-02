const express = require('express');
var bodyParser = require('body-parser');
//var app = express();
const router = express.Router();
const auth_utils = require('../../../lib/auth_utils');
const utils = require('../../../app/helpers/api_helper');
const usersServices = require("../../../app/services/usersServices");
router.use(bodyParser.json());

// get list
    router.get('/', (req, res, next) => {
        res.status(200).json({
            //   TODO
        })
    });

//get detail of item
    router.get('/id', function (req, res) {

    feedbacksServices.getNews().then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

// add item
    router.post('/', function(req, res) {
        var body = req.body;
        usersServices.insertNews(body).then(data => {
            res.status(200).json(utils.successResponse(data));
        })
            .catch(error => {
                res.json(utils.failedResponse(error));

        });
    });

// update item
    router.put('/id', (req, res, next) => {
        res.status(200).json({
            //   TODO
        })
    });

// delete item
    router.delete('/id', (req, res, next) => {
        res.status(200).json({
            //   TODO
        })
    });
module.exports = router;