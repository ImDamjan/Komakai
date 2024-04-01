import { TaskCardKanbanComponent } from "../components/task-card-kanban/task-card-kanban.component";

export class Column {
    constructor(public name: string, public id: string, public tasks: TaskCardKanbanComponent[]) {}
  }
  