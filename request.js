const requestModule = {
    receiveBuffer: async (buffer) => {
        let protocol = {
            header: {},
            body: {}
        }

        parser.parseHeader(buffer.slice(1,14), protocol);
    },
};

const parser = {
    parseHeader: async (header,protocol) => {
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

        header.deviceID = header.slice(0,4).toString('hex');
        header.command = header.slice(4,5).toString('hex');
        header.packageLength = header.slice(5,7).toString('hex');
        header.utc_time.year = header.slice(7,8).toString();
        header.utc_time.month = header.slice(8,9).toString();
        header.utc_time.day = header.slice(9,10).toString();
        header.utc_time.hour = header.slice(10,11).toString();
        header.utc_time.minute = header.slice(11,12).toString();
        header.utc_time.second = header.slice(12,13).toString();

        protocol.header = header;
    }
}

module.exports = requestModule;