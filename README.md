shared-cookies
=================

A cookie parsing middleware for both Express (4+) and Socket.IO (1+).
This module will simplify accessing secured cookies from both Express and Socket.IO.

    var app = require('express')();
    var server = require('http').createServer(app);
    var io = require('socket.io')(server);
    var cookies = require('shared-cookies')({ secret: 'keyboard cat' });

    app.use(cookies.express);
    io.use(cookies.socket);

    app.get('/', function(req, res) {
      // req.cookies
    });

    io.on('connection', function(socket) {
      // socket.cookies
    });

    server.listen(3000, function() {
      debug('server listening');
    });
