import Note from "../../models/Note";
import {
  PutItemCommand,
  UpdateItemCommand,
  ScanCommand,
  GetItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";

import {
  PutCommand,
  PutCommandInput,
  DynamoDBDocument,
} from "@aws-sdk/lib-dynamodb";

class NoteService {
  private TableName = process.env.noteTable;

  constructor(private dynamodbDoc: DynamoDBDocument) {}

  async createNote(note: Note): Promise<Note> {
    const input: PutCommandInput = {
      TableName: this.TableName,
      Item: note,
    };

    await this.dynamodbDoc.send(new PutCommand(input));

    return note;
  }
}

export default NoteService;
