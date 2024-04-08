export interface Assignment {
    id : number,
    assignees : Number[],
    dependentOn : Number[],
    title : String,
    description : String,
    start : Date | number,
    end : Date | number,
    stateId : Number,
    percentage : Number,
    priorityId : Number,
    taskGroupId : Number,
    type : String,
    dummyTitle : String,
    owner : number
}
