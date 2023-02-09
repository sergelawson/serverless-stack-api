import { APIGatewayEvent } from "aws-lambda";
import noteService from "../../services/NoteService";
import handler from "../../lib/handler-lib";

export const get = handler(
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

    const note = await noteService.getNote(userId, noteId);

    if (!note) {
      return {
        statusCode: 404,
        body: { meassage: "note does not exist" },
      };
    }

    return {
      statusCode: 200,
      body: note,
    };
  }
);
