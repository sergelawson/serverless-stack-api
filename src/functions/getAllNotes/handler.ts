import { APIGatewayEvent } from "aws-lambda";
import noteService from "../../services/NoteService";
import handler from "../../lib/handler-lib";

export const getAll = handler(
  async (
    event: APIGatewayEvent
  ): Promise<{ statusCode: number; body: any }> => {
    const userId = event.requestContext.identity.cognitoIdentityId;

    if (!userId) {
      return {
        statusCode: 401,
        body: { message: "Please provide user Id" },
      };
    }

    const note = await noteService.getAllNote(userId);

    return {
      statusCode: 200,
      body: note,
    };
  }
);
