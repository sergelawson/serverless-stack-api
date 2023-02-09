import Note from "../../models/Note";
import {
  UpdateCommandInput,
  GetCommandInput,
  DeleteCommandInput,
  QueryCommandInput,
  PutCommandInput,
  DynamoDBDocument,
} from "@aws-sdk/lib-dynamodb";

class NoteService {
  private readonly TableName = process.env.noteTable;

  constructor(private dynamodbDoc: DynamoDBDocument) {}

  async createNote(note: Note): Promise<Note> {
    const input: PutCommandInput = {
      TableName: this.TableName,
      Item: note,
    };

    await this.dynamodbDoc.put(input);

    return note;
  }

  async getAllNote(userId: string): Promise<Note[]> {
    const input: QueryCommandInput = {
      TableName: this.TableName,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const listNotes = await this.dynamodbDoc.query(input);

    return listNotes.Items as Note[];
  }

  async getNote(userId: string, noteId: string): Promise<Note> {
    const input: GetCommandInput = {
      TableName: this.TableName,
      Key: {
        userId: userId,
        noteId: noteId,
      },
    };

    const note = await this.dynamodbDoc.get(input);

    return note.Item as Note;
  }

  async updateNote(note: Note): Promise<any> {
    const input: UpdateCommandInput = {
      TableName: this.TableName,
      Key: {
        userId: note.userId,
        noteId: note.noteId,
      },
      UpdateExpression: "SET content = :content, attachment = :attachment",
      ExpressionAttributeValues: {
        ":content": note.content,
        ":attachment": note.attachment,
      },
      ReturnValues: "ALL_NEW",
    };
    await this.dynamodbDoc.update(input);

    return { status: true };
  }

  async deleteNote(userId: string, noteId: string): Promise<any> {
    const input: DeleteCommandInput = {
      TableName: this.TableName,
      Key: {
        userId: userId,
        noteId: noteId,
      },
    };

    await this.dynamodbDoc.delete(input);

    return { status: true };
  }
}

export default NoteService;
