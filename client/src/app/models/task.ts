import { Assignment } from "./assignment";
import { Priority } from "./priority";

export interface Task{
    timeDifference: number;
    remaining: string;
    priority: string;
    endMilliseconds: number;
    startMilliSeconds: number;
    endSeconds: number;
    endMinutes: number;
    endHours: number;
    endYear: number;
    endMonth: number;
    endDate: number;
    owner: number;
    startSeconds: number;
    startMinutes: number;
    startHours: number;
    startYear: number;
    startMonth: number;
    startDate: number;
    id: number;
    assignees: number[];
    title: string;
    description: string;
    start: Date;
    end: Date;
    stateId: number;
    percentage: number;
    dependent: number[];
    priorityId: number;
    projectId: number;
    type: string;
}