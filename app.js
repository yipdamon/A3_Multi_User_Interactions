const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server);     //get package and instantiate with server

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/playerOne', function(req,res) {
    res.sendFile(__dirname + '/public/playerOne.html');
});

app.get('/playerTwo', function(req,res) {
    res.sendFile(__dirname + '/public/playerTwo.html');
});

//websocket events
socketIO.on('connection', function(socket) {
    console.log(socket.id + 'has connect!');

    socket.on('dissconnect', function(data) {
        console.log(socket.id + 'has disconnect');
    });

    //custom events
    socket.on('red', function(data){
        console.log('red event heard');
        //.sockets sends data to all sockets (other pages)
        socketIO.sockets.emit('checkRock', {r:255, g:0, b:0});
    });

    socket.on('green', function(data){
        console.log('green event heard');
        socketIO.sockets.emit('color_change', {r:0, g:255, b:0});
    });

    socket.on('blue', function(data){
        console.log('blue event heard');
        socketIO.sockets.emit('color_change', {r:0, g:0, b:255});
    });
});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);