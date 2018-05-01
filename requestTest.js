const request = require('./modules/request.js');
const bufferTest = '633030303030303034353031313331323033313531373134313731343061353036336330';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const sockets = new Map();

io.on('connection', (socket) => {

    console.log('front-end connected');
    sockets.set('front',socket);
    
    socket.on('front-message', (msg) => {
        console.log('front message: ' + msg);
        //socket.emit('server-message', 'from server: ' + msg);
    });

    socket.on('disconnect', () => {
      console.log('front disconnected');
      sockets.delete('front');
    });

});

const test = async () => {

    let buffer = Buffer.from(bufferTest,'hex');
    let user = await request.receiveBuffer(Buffer.from(buffer.toString(),'hex'));
    await sleep(5000); 
    let socketToFront = await sockets.get('front');
    console.log(user);
    socketToFront.emit('server-message', user);
}

http.listen(8082, () => {console.log('listening front-end on port 8082')});

const sleep = (ms) => {

    return new Promise(resolve => setTimeout(resolve, ms));

};

test();