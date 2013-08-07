/**
 * Author: YuMS
 */

var express = require('express')
	, http = require('http')
    , path = require('path');
var routes = require('./routes');

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 405);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

app.get('/', routes.index.get);
app.get('/practice', routes.practice.get);
app.post('/practice', routes.practice.post);
app.get('/claim', routes.claim.get);
app.get('/thankyou', routes.thankyou.get);
app.get('/error', routes.errorpage.get);
