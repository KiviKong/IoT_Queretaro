const Dynamo = require('./dynamo.js');

const requestModule = {
    receiveBuffer: async (buffer) => {
        let protocol = {
	        buffer: buffer.toString('hex'),
            header: {},
            body: {}
        }

        await parser.parseHeader(buffer.slice(1,13), protocol);
        await parser.parseBody(buffer.slice(13,17), protocol);
        
        await Dynamo.updatePosition(protocol.header.deviceID, protocol.body.x, protocol.body.y);
            
        return protocol;
    },
};

const parser = {
    parseHeader: async (buffer,protocol) => {
        let header = {
            deviceID: '',
            command: '',
            packageLength: '',
            utc_time: {
                year: 0,
                month: 0,
                day: 0,
                hour: 0,
                minute: 0,
                second: 0
            }
        }

        header.deviceID = buffer.slice(0,4).toString('hex');
        header.command = buffer.slice(4,5).toString('hex');
        header.packageLength = buffer.slice(5,6).toString('hex');
        header.utc_time.year = parseInt(buffer.slice(6,7).toString('hex'),16);
        header.utc_time.month = parseInt(buffer.slice(7,8).toString('hex'),16);
        header.utc_time.day = parseInt(buffer.slice(8,9).toString('hex'),16);
        header.utc_time.hour = parseInt(buffer.slice(9,10).toString('hex'),16);
        header.utc_time.minute = parseInt(buffer.slice(10,11).toString('hex'),16);
        header.utc_time.second = parseInt(buffer.slice(11,12).toString('hex'),16);

        protocol.header = header;
    },

    parseBody: async (buffer, protocol) => {
        let body = {
            x: 0,
            y: 0,
            x2: 0,
            y2: 0 ,
        }

        body.x = parseInt(buffer.slice(0,1).toString('hex'),16);
        body.y = parseInt(buffer.slice(1,2).toString('hex'),16);
        body.x2 = parseInt(buffer.slice(2,3).toString('hex'),16);
        body.y2 = parseInt(buffer.slice(3,4).toString('hex'),16);

        protocol.body = body;
    }
}

module.exports = requestModule;