const request = require('./modules/request.js');
const bufferTest = '633030303030303034353031313331323033313531373134313730313032353036336330';

const test = async () => {

    let buffer = Buffer.from(bufferTest,'hex');

    request.receiveBuffer(Buffer.from(buffer.toString(),'hex'));
}

test();