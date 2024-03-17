import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css']
})
export class ProjectPreviewComponent implements OnInit {
  title: string = 'Addodle';
  description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  status: string = 'Not started';
  truncatedTitle: string = '';
  truncatedDescription: string = '';
  titleCharacterLimit: number = 0;
  descriptionCharacterLimit: number = 0;

  teamMembers: any[] = [];

  constructor() {
    this.calculateCharacterLimit();
    this.truncateText();
  }

  ngOnInit(): void {
    for (let i = 0; i < 6; i++) {
      this.teamMembers.push({ name: `Test Member ${i}`, imageUrl: '/assets/project-task/person.svg' });
    }
  
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', () => {
      this.calculateCharacterLimit();
      this.truncateText();
    });
  }

  calculateCharacterLimit() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.titleCharacterLimit = 5;
      this.descriptionCharacterLimit = 60;
    } else if (screenWidth >= 768 && screenWidth < 1025) {
      this.titleCharacterLimit = 10;
      this.descriptionCharacterLimit = 100;
    } else {
      this.titleCharacterLimit = 20;
      this.descriptionCharacterLimit = 190;
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
