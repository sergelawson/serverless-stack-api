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
    const { note } = JSON.parse(event.body);

    console.log(note);

    const noteData = await noteService.createNote(note);
    return {
      statusCode: 200,
      body: JSON.stringify({
        note: noteData,
      }),
    };
  }
);

export { create };
