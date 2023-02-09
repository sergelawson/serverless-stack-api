import { ulid } from "ulid";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import noteService from "../../services/NoteService";
import handler from "../../lib/handler-lib";

const create = handler(
  async (
    event: APIGatewayProxyEvent
  ): Promise<{ statusCode: number; body: any }> => {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Please send valid note",
        }),
      };
    }
    if (!event.requestContext.identity.cognitoIdentityId) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "Please send user",
        }),
      };
    }
    const note = JSON.parse(event.body);

    const noteId = ulid();

    const noteData = await noteService.createNote({
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: noteId,
      content: note.content,
      attachment: note.attachment,
      createdAt: new Date().toISOString(),
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        note: noteData,
      }),
    };
  }
);

export { create };
