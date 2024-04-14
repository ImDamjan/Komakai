import { Task } from "./task";

export interface TaskGroup {
    id: number,
    title: string,
    projectId: number,
    parentTaskGroupId: number,
    children : TaskGroup[],
    assignments : Task[]
}
