import { ulid } from "ulid";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import noteService from "../../services/NoteService";

const create = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

  if (!event.body) {
    return {
      statusCode: 400,
      headers: headers,
      body: JSON.stringify({
        message: "Please send valid note",
      }),
    };
  }
  const { note } = JSON.parse(event.body);

  console.log(note);
  try {
    const noteData = await noteService.createNote(note);
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({
        note: noteData,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        message: "Server error",
      }),
    };
  }
};

export { create };
