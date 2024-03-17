export interface Tast{
    id: number;
    assignees: Array<number>[];
    title: string;
    description: string;
    start: string;
    end: string;
    stateId: number;
    percentage: number;

    priorityId: number;
    projectId: number;
    type: string;
}