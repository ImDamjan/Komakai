import { User } from "../user/user";

export interface Comment {
    id : number,
    content : string,
    editedTime : Date,
    postTime : Date,
    userId : number,
    user : User
}
