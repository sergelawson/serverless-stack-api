import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"; // ES6 import

const dynamodbClient = new DynamoDBClient({ region: "us-east-1" });

const dynamodbDoc = DynamoDBDocument.from(dynamodbClient);

export default dynamodbDoc;
