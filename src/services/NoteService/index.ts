import dynamodbDoc from "../../models";
import NoteService from "./NoteService";

const noteService = new NoteService(dynamodbDoc);

export default noteService;
