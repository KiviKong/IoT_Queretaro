const net = require('net');
const request = require('./modules/request.js');

let server = net.createServer( async (socket) => {
    
    socket.on('data', async (data) => {

        try {

            request.receiveBuffer(Buffer.from(data.toString(),'hex'));

        } catch (err) {

            console.log(err);

        }

    });
    
    socket.on('end', async () => {

        console.log('Device desconnected: ' + socket.remoteAddress);

    });

}).on('error', (err) => {

    // Errores en el server
    console.log(err);

});

server.listen(8081);
console.log('Back-end running on port 8081');