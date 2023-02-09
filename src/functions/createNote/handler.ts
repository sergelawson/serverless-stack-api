import { ulid } from "ulid";
import { APIGatewayProxyEvent } from "aws-lambda";
import noteService from "../../services/NoteService";
import handler from "../../lib/handler-lib";

const create = handler(
  async (
    event: APIGatewayProxyEvent
  ): Promise<{ statusCode: number; body: any }> => {
    const userId = event.requestContext.identity.cognitoIdentityId;
    if (!event.body) {
      return {
        statusCode: 400,
        body: {
          message: "Please send valid note",
        },
      };
    }
    if (!userId) {
      return {
        statusCode: 401,
        body: {
          message: "Please send user",
        },
      };
    }

    const note = JSON.parse(event.body);

    const noteId = ulid();

    const noteData = await noteService.createNote({
      userId: userId,
      noteId: noteId,
      content: note.content,
      attachment: note.attachment,
      createdAt: new Date().toISOString(),
    });
    return {
      statusCode: 201,
      body: {
        note: noteData,
      },
    };
  }
);

export { create };
