const request = require('./request.js');

const bufferTest = 'c0e2a11e1101111203140f200001020304c0';

const test = async () => {
    request.receiveBuffer(Buffer.from(bufferTest, 'hex'));
}

test();