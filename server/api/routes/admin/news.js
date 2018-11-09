const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const auth_untils = require('../../../lib/auth_utils');
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
    router.get('/:id', function (req, res) {
    usersServices.getNews().then(data => {
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
    router.put('/updateNews',function (req, res) {
        var body = req.body;
        usersServices.updateNews().then(data => {
            res.status(200).json(utils.successResponse(data));
        })
            .catch(error => {
                res.json(utils.failedResponse(error));
        })
    });

// delete item
    router.delete('/id', (req, res, next) => {
        res.status(200).json({
            //   TODO
        })
    });
module.exports = router;