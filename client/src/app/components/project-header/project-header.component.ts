import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.css'
})
export class ProjectHeaderComponent {
  currentView: string = 'kanban';
  searchText: string = "";
  @Output() viewChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() getSearchText: EventEmitter<string> = new EventEmitter<string>();

  getText()
  {
    this.getSearchText.emit(this.searchText);
  }


  changeView(view: string) {
    this.viewChange.emit(view);
    this.currentView = view;
  }
}
