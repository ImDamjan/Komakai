import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.css'
})
export class ProjectPreviewComponent {
  title: string = 'Addodle';
  truncatedTitle: string = '';
  characterLimit: number = 0;

  constructor() {
    this.calculateCharacterLimit();
    this.truncateTitle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.calculateCharacterLimit();
    this.truncateTitle();
  }

  calculateCharacterLimit() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.characterLimit = 5;
    } else if (screenWidth > 768 && screenWidth < 1020) {
      this.characterLimit = 10;
    }
    else {
      this.characterLimit = 20;
    }
  }

  truncateTitle() {
    if (this.title.length > this.characterLimit) {
      this.truncatedTitle = this.title.substring(0, this.characterLimit) + '...';
    } else {
      this.truncatedTitle = this.title;
    }
  }
}
