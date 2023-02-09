import { APIGatewayEvent } from "aws-lambda";
import noteService from "../../services/NoteService";
import handler from "../../lib/handler-lib";

export const update = handler(
  async (
    event: APIGatewayEvent
  ): Promise<{ statusCode: number; body: any }> => {
    const userId = event.requestContext.identity.cognitoIdentityId;
    const noteId = event?.pathParameters?.id;

    if (!userId) {
      return {
        statusCode: 401,
        body: { message: "Please provide user Id" },
      };
    }

    if (!noteId) {
      return {
        statusCode: 400,
        body: { message: "Please provide note Id" },
      };
    }
    if (!event.body) {
      return {
        statusCode: 400,
        body: { message: "Please provide note" },
      };
    }

    const note = JSON.parse(event.body);

    const responseBody = await noteService.updateNote(userId, noteId, note);

    return {
      statusCode: 200,
      body: responseBody,
    };
  }
);
