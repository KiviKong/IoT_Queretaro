const aws = require('aws-sdk');
const dynamoDB = aws.DynamoDB();

const dynamoModule = {
    updatePosition: async (deviceID, x, y) => {
        let params = {
            ExpressionAttributeNames: {
                "#X": "x", 
                "#Y": "y"
            }, 
            ExpressionAttributeValues: {
                ":x": {
                    N: x
                }, 
                ":y": {
                    N: y
                }
            }, 
            Key: {
                "deviceID": {
                    N: deviceID
                }
            }, 
            ReturnValues: "ALL_NEW", 
            TableName: "Usuario", 
            UpdateExpression: "SET #Y = :y, SET #X = :x"
        };

        dynamoDB.updateItem(params, (err,data) => {
            if (err)
                console.log(err);
            if (data)
                console.log(data);
        });
    },
    registerUser: async (user,deviceID) => {

    },
}

module.exports = dynamoModule;