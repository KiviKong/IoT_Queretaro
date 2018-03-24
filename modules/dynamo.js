const aws = require('aws-sdk');
aws.config.update({region:'us-east-2'});
const dynamoDB = new aws.DynamoDB();

const dynamoModule = {
    updatePosition: async (deviceID, x, y) => {
        
        let params = {
            ExpressionAttributeNames: {
                "#X": "x", 
                "#Y": "y"
            }, 
            ExpressionAttributeValues: {
                ":x": {
                    N: x + ''
                }, 
                ":y": {
                    N: y + ''
                }
            }, 
            Key: {
                "deviceID": {
                    N: deviceID
                }
            },
            ReturnValues: "ALL_NEW", 
            TableName: "Usuario", 
            UpdateExpression: "SET #Y = :y, #X = :x"
        };

        dynamoDB.updateItem(params, (err,data) => {
            if (err)
                console.log(err);
            if (data)
                console.log(data);
        });
    },
    registerUser: async (user,deviceID) => {
        // 
    },
}

module.exports = dynamoModule;