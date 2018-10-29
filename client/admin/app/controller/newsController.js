var request = require('request');
const app = request();

app.get('/', function (err,req, res, body) {
    if (!err && res.statusCode == 200) {
        var locals = JSON.parse(body);
        res.render('index', locals);
    }
});