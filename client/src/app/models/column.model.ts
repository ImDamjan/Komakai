import { TaskCardKanbanComponent } from "../components/task-card-kanban/task-card-kanban.component";
import { Assignment } from "./assignment";

export class Column {
  //promenjeno na interfejs Assignment(bilo je TaskCardKanbanComponent)
    constructor(public name: string, public id: string, public tasks: Assignment[]) {}
  }
  