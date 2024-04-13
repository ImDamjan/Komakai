export interface CreateProject {
    userIds : number[],
    priorityId : number,
    title : string,
    start : Date,
    end : Date,
    budget : number,
    description : string,
    type : string
}
