var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var port = 3333;

app.use('/fsmimages', express.static(__dirname + '/fsmimages'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// the code below will check for change every 100secs and emit a message to all clients of / , and inform that the file has changed
fs.watch('fsmimages',function(event, filename) {
  console.log('... ' + filename);
  io.emit('fsm image', filename);
});

io.on('connection', function(socket){
  socket.on('fsm image', function(msg){
    io.emit('fsm image', msg);
  });
});

http.listen(port, function(){
  console.log('listening on port ' + port);
});
