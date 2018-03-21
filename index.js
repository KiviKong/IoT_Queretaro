const net = require('net');

let server = net.createServer( async (socket) => {
    
    socket.on('data', async (data) => {

        try {
            
            console.log('------------------------------------');
            console.log(data);
            console.log('------------------------------------');

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