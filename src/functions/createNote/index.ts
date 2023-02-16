import { ulid } from "ulid";
import noteService from "../../services/NoteService";
import Note from "../../models/Note";

const createNote = async (
  note: Note,
  userId: string
): Promise<{ statusCode: number; body: any }> => {
  if (!note) {
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
};

export default createNote;
