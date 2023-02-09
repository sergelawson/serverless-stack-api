import { APIGatewayProxyResult, Context } from "aws-lambda";
import { APIGatewayProxyEvent } from "aws-lambda";

type HandleType = (
  event: APIGatewayProxyEvent,
  context: Context
) => Promise<{ statusCode: number; body: any }>;

export default function handler(lamda: HandleType) {
  return async function (
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    };

    try {
      const response = await lamda(event, context);
      return {
        statusCode: response.statusCode,
        headers: headers,
        body: JSON.stringify(response.body),
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ message: error.message }),
      };
    }
  };
}

const parseBody = (event: APIGatewayProxyEvent) => {
  if (!event.body) {
    return { ...event };
  }
  const parsedBody = JSON.parse(event.body);
  return {
    ...event,
    body: parsedBody,
  };
};
