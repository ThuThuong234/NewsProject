var express = require("express");
const app = express();
var bodyParser = require('body-parser');
const newsRoutes =  require("./news");
const feedbacksRoutes =  require("./feedbacks");
const usersServices = require("../../app/services/usersServices");
const utils = require('../../app/helpers/api_helper');
app.use("/news",newsRoutes);
app.use("/feedbacks",feedbacksRoutes);
app.use(bodyParser.json())
app.get("/",(req,res,next) => {
    res.status(200).json({
    //   TODO
    })
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
module.exports = app;