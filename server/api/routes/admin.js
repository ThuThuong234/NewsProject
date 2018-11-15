var express = require("express");
const app = express();
var bodyParser = require('body-parser');
const newsRoutes =  require("./news");
const commentsRoutes =  require("./comment");
const feedbacksRoutes =  require("./feedbacks");
const usersServices = require("../../app/services/usersServices");
const utils = require('../../app/helpers/api_helper');
app.use("/news",newsRoutes);
app.use("/feedbacks",feedbacksRoutes);
app.use("/comments",commentsRoutes);
app.use(bodyParser.json())
app.get('/', function (req, res) {

    usersServices.getAllUser().then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
app.post("/signin",(req,res) => {
    let username = req.body.username;
    let password = req.body.password;

    usersServices.authenticate(username, password)
        .then(data => {
            res.json(utils.successResponse(data));
        })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});
app.get('/:username', function (req, res) {
    usersServices.getUser(req.params.username).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));
        });
});

// add item
app.post('/', function (req, res) {
    var body = req.body;
    usersServices.insertUsers(body).then(data => {
        res.status(200).json(utils.successResponse(data));
    })
        .catch(error => {
            res.json(utils.failedResponse(error));

        });
});

module.exports = app;