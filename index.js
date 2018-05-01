const net = require('net');
const request = require('./modules/request.js');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const sockets = new Map();

io.on('connection', function(socket) {

    console.log('front-end connected');
    sockets.set('front',socket);
    
    socket.on('front-message', (msg) => {
        console.log('front message: ' + msg);
    });

    socket.on('disconnect', () => {
      console.log('front disconnected');
      sockets.delete('front');
    });

});

let server = net.createServer( async (socket) => {
    
    socket.on('data', async (data) => {

        try {
            //console.log(data.toString('hex'));
            let user = await request.receiveBuffer(Buffer.from(data.toString(),'hex'));
            let socketToFront = await sockets.get('front');
            console.log(user);
            socketToFront.emit('server-message', user);
        } catch (err) {

            console.log(err);

        }

    });

    socket.on('front-message', async (data) => {
        console.log('hola');
        console.log(data);
    });
    
    socket.on('end', async () => {

        console.log('Device desconnected: ' + socket.remoteAddress);

    });

}).on('error', (err) => {

    // Errores en el server
    console.log(err);

});

server.listen(8081);
console.log('listening rfd device on port 8081');
http.listen(8082, () => {console.log('listening front-end on port 8082')});