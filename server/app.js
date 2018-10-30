// file khoi tao ung dung

var express = require('express');
var config = require("config");
const log4js = require('log4js');
var bodyParser = require("body-parser");
var app= express();
var router = express.Router();

const adminRoutes = require("./api/routes/admin/admin");
const readerRoutes = require("./api/routes/reader/index");


/**
 * Setup routes
 */
app.use("/admin",adminRoutes );
app.use("/",readerRoutes);

app.use(bodyParser.json());

/**
 * Setup logger
 */
const logger = log4js.getLogger('http');
app.use(log4js.connectLogger(logger));

/**
 * Catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Error handlers
 */
app.use(function (err, req, res) {
    res.status(err.status || 500)
        .json({
            success: false,
            message: err.message,
            code: err.status
        });
})

module.exports = router;
module.exports = app;


