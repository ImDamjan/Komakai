export interface Assignment {
    id : Number,
    assignees : Number[],
    dependentOn : Number[],
    title : String,
    description : String,
    start : Date,
    end : Date,
    stateId : Number,
    percentage : Number,
    priorityId : Number,
    taskGroupId : Number,
    type : String
}
