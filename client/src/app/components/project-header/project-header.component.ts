import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.css'
})
export class ProjectHeaderComponent {
  @Output() viewChange: EventEmitter<string> = new EventEmitter<string>();

  changeView(view: string) {
    this.viewChange.emit(view);
  }
}
