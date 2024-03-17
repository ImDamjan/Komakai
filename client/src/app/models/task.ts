export interface Task{
    id: number;
    assignees: Array<number>[];
    title: string;
    description: string;
    start: string;
    end: string;
    stateId: number;
    percentage: number;
    dependent: Task;
    priorityId: number;
    projectId: number;
    type: string;
}