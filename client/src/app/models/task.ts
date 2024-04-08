import { Assignment } from "./assignment";
import { Priority } from "./priority";

export interface Task{
    timeDifference: number;
    remaining: string;
    priority: String;
    endMilliseconds: number;
    startMilliSeconds: Number;
    endSeconds: Number;
    endMinutes: Number;
    endHours: Number;
    endYear: Number;
    endMonth: Number;
    endDate: Number;
    owner: Number;
    startSeconds: Number;
    startMinutes: Number;
    startHours: Number;
    startYear: Number;
    startMonth: Number;
    startDate: Number;
    id: Number;
    assignees: Number[];
    title: String;
    description: String;
    start: Date;
    end: Date;
    stateId: Number;
    percentage: Number;
    dependent: Number[];
    priorityId: Number;
    projectId: Number;
    type: String;
}