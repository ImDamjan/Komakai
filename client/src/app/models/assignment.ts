export interface Assignment {
    id : number,
    assignees : number[],
    dependentOn : number[],
    title : string,
    description : string,
    start : Date | number,
    end : Date | number,
    stateId : number,
    percentage : number,
    priorityId : number,
    taskGroupId : number,
    type : string,
    dummyTitle : string,
    owner : number
}
