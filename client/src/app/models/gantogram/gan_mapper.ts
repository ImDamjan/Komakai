import { GanttItem, GanttItemType } from "@worktile/gantt";
import { TaskCardKanbanComponent } from "../../components/task-card-kanban/task-card-kanban.component";
import { Task } from "../task/task";
import { Priority } from "../priority/priority";
import { GantogramService } from "../../services/gantogram.service"
import { log } from "node:console";
export class GanttMapper {
    // Normalni članovi klase
    static mapTasksToGantItems(tasks:Task[]) : GanttItem[]{
        

        const ganttItems: GanttItem[] = []
        // Implementacija statičke metode
        
        for (let i = 0; i < tasks.length; i++) {
            // console.log(tasks[i]);
            console.log("********************");
            console.log(tasks[i].start);
            console.log(new Date(tasks[i].start).toDateString());
            
            console.log("********************");
            
            
            
            ganttItems.push(this.mapTaskToGanttItem(tasks[i]));
            
        }
        console.log("====================================================");
        console.log(ganttItems);
        
        console.log("====================================================");

        return ganttItems
    }

    static mapTaskToGanttItem(task: Task): GanttItem {
        const ganttItem: GanttItem = {
            id: task.id.toString(),
            title: task.title,
            start: new Date(task.start).getTime()/1000, // ili drugi odgovarajući atribut za početak
            end: new Date(task.end).getTime()/1000, // ili drugi odgovarajući atribut za kraj
            links: [], // Možete dodati logiku za mapiranje linkova ako je potrebno
            draggable: true, // Postavite na true ako želite omogućiti povlačenje
            itemDraggable: true, // Postavite na true ako želite omogućiti povlačenje samo na ovom elementu
            linkable: true, // Postavite na true ako želite omogućiti dodavanje linkova
            expandable: true, // Postavite na true ako želite omogućiti proširivanje
            expanded: false, // Postavite na true ako želite da je element početno proširen
            color: this.mapPrioprityToColor(task.priority), // Postavite boju po želji
            // barStyle: {color: 'red !important'}, // Postavite stil trake po želji
            origin: task, // Originalni task
            type: GanttItemType.bar, // Tip gant elementa
            progress: task.percentage/100, // Napredak elementa ako je dostupno u tasku
        };
        return ganttItem;
    }


    static mapPrioprityToColor(priority:Priority):string{
        switch(priority.level){
            case  1: return "#A9A9A9" // low;
            case  2: return "#FFD700" // Medium;
            case  3: return "#FF6347" // High;
            case  4: return "#8B008B" // AtRisk;
            default: return "#1E90FF"
        }
    }


} 