const express = require('express');
var bodyParser = require('body-parser');
// const app = express();
const router = express.Router();

// get list
    router.get('/', (req, res, next) => {
        res.status(200).json({
            //   TODO
        })
    });

//get detail of item
    router.get('/id', (req, res, next) => {
        res.status(200).json({
            //   TODO
        })
    });

// add item
    router.post('/', (req, res, next) => {
        res.status(201).json({
            message: "post success",
            // TODO
        })
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