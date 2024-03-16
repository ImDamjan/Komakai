import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.css'
})
export class ProjectPreviewComponent {
  title: string = 'Addodle';
  description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  status: string = 'Not started';
  truncatedTitle: string = '';
  truncatedDescription: string = '';
  titleCharacterLimit: number = 0;
  descriptionCharacterLimit: number = 0;

  constructor() {
    this.calculateCharacterLimit();
    this.truncateText();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.calculateCharacterLimit();
    this.truncateText();
  }

  calculateCharacterLimit() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.titleCharacterLimit = 5; // Adjust as needed
      this.descriptionCharacterLimit = 60; // Adjust as needed
    } else if (screenWidth >= 768 && screenWidth < 1025) {
      this.titleCharacterLimit = 10; // Adjust as needed
      this.descriptionCharacterLimit = 100; // Adjust as needed
    } else {
      this.titleCharacterLimit = 20; // Adjust as needed
      this.descriptionCharacterLimit = 190; // Adjust as needed
    }
  }

  truncateText() {
    this.truncatedTitle = this.truncate(this.title, this.titleCharacterLimit);
    this.truncatedDescription = this.truncate(this.description, this.descriptionCharacterLimit);
  }

  truncate(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    } else {
      return text;
    }
  }
}
