const express = require('express');
var app = express();
var http = require('http');
const socketIO = require('socket.io');


app.use(express.static('www'));

// views is directory for all template files
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
});

app.set('port', process.env.PORT || 80);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
