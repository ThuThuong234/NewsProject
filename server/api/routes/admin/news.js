const express = require('express');
// const app = express();
const router = express.Router();

// get list
    router.get('/', (req, res, next) => {
        res.status(200).json({
            message: "get success",
            // TODO
        })
    });

//get detail of item
    router.get('/id', (req, res, next) => {
        res.status(200).json({
            message: "get item success",
            // TODO
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
            message: "put success",
        })
    });

// delete item
    router.delete('/id', (req, res, next) => {
        res.status(200).json({
            message: "delete success",
            // TODO
        })
    });
module.exports = router;