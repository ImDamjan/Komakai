export interface Project {
    id : Number, 
    title : string,
    start : Date, 
    end : Date,
    stateId : Number
    budget : Number
    spent : Number
    type : string,
    percentage : Number,
    description : string,
    priorityId : Number,
    users : Number[]
}
