const net = require('net');
const request = require('./request.js');

let server = net.createServer( async (socket) => {
    
    socket.on('data', async (data) => {

        try {
            
            request.receiveBuffer(Buffer.from(data, 'hex'));

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
console.log('Ganon running in port 8500');