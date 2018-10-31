var express = require("express");
const app = express();
var bodyParser = require('body-parser');
const newsRoutes =  require("./news");
const feedbacksRoutes =  require("./feedbacks");
app.use("/news",newsRoutes);
app.use("/feedbacks",feedbacksRoutes);

app.get("/",(req,res,next) => {
    res.status(200).json({
    //   TODO
    })
});
module.exports = app;