"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb"); // ES6 import
var dynamodbClient = new client_dynamodb_1.DynamoDBClient({ region: "us-east-1" });
var dynamodbDoc = lib_dynamodb_1.DynamoDBDocument.from(dynamodbClient);
exports.default = dynamodbDoc;
//# sourceMappingURL=index.js.map