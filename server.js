#!/usr/bin/env node
var debug = require('debug')('humid');
var app = require('./app');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');
var router = express.Router();


app.set('port', process.env.PORT || 3000);

io.on('connection', function(socket){
    console.log('a user connected');
});

router.get('/gettemp/:temp/:humid', function(req, res) {
    //var tempAndHumid = req.body;
    console.log(req.params.temp);
    console.log(req.params.humid);
    var params = {
        "temp": req.params.temp,
        "humid": req.params.humid
    };
    io.emit('tesselreceive', params);
    res.send('Received temp');
});

app.use('/io', router);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
//var server = app.listen(app.get('port'), function() {
//  debug('Express server listening on port ' + server.address().port);
//});

http.listen(app.get('port'), function(){
    debug('Express server listening on port ' + app.get('port'));
});