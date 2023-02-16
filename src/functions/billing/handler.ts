import { APIGatewayProxyEvent } from "aws-lambda";
import handler from "../../lib/handler-lib";
import { calculateCost } from "../../lib/billing-lib";
import paymentService from "../../services/PaymentService";

const main = handler(
  async (
    event: APIGatewayProxyEvent
  ): Promise<{ statusCode: number; body: any }> => {
    if (!event.body) {
      return {
        statusCode: 400,
        body: {
          message: "Please send valid note",
        },
      };
    }

    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";

    const responseBody = await paymentService.makePayment({
      amount,
      source,
      description,
      currency: "usd",
    });

    return {
      statusCode: 200,
      body: responseBody,
    };
  }
);

export { main };
