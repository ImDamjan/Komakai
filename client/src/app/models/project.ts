import { Priority } from "./priority"
import { State } from "./state"
import { User } from "./user"

export interface Project {
    id : number, 
    title : string,
    start : Date, 
    end : Date,
    state : State,
    budget : number,
    spent : number,
    type : string,
    percentage : number,
    description : string,
    priority : Priority,
    users : User[],
    truncatedTitle : string,
    truncatedDescription : string
}
