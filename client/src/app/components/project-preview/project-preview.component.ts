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
  titleCharacterLimit: number = 0;
  descriptionCharacterLimit: number = 0;

  //promenljive za menjane stranica
  cards: any[] = [];
  currentPage: number = 1;
  cardsPerPage: number = 6;

  constructor() {
    this.calculateCharacterLimit();
    this.cards = [
      { title: 'Card 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', status: 'Ready', teamMembers: ['John Doe', 'Jane Smith'], teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg'] },
      { title: 'Card 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et', status: 'In progress', teamMembers: ['Alice Johnson', 'Bob Brown', 'Charlie Davis'], teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg'] },
      { title: 'Card 3', description: 'Description 3', status: 'Done', teamMembers: ['Ella Martinez'], teamMemberImages: ['/assets/project-task/person.svg'] },
      { title: 'Card 4', description: 'Description 4', status: 'Ready', teamMembers: ['Frank Wilson', 'Grace Lee', 'Henry Taylor', 'Ivy Clark'], teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg'] },
      { title: 'Card 5', description: 'Description 5', status: 'In progress', teamMembers: [], teamMemberImages: [] },
      { title: 'Card 6', description: 'Description 6', status: 'Done', teamMembers: ['Jack White'], teamMemberImages: ['/assets/project-task/person.svg'] },
      { title: 'Card 7', description: 'Description 7', status: 'Ready', teamMembers: ['Liam King', 'Mia Lopez', 'Noah Moore'], teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg'] },
      { title: 'Card 8', description: 'Description 8', status: 'In progress', teamMembers: [], teamMemberImages: [] },
      { title: 'Card 9', description: 'Description 9', status: 'Done', teamMembers: ['Peter Green', 'Quinn Hall', 'Ryan Adams'], teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg'] },
      { title: 'Card 10', description: 'Description 10', status: 'Ready', teamMembers: ['Sophia Baker'], teamMemberImages: ['/assets/project-task/person.svg'] },
    ];
  }

  ngOnInit(): void {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', () => {
      this.calculateCharacterLimit();
      this.truncateText();
    });

    // Initialize truncated titles and descriptions
    this.cards.forEach(card => {
      card.truncatedTitle = this.truncate(card.title, this.titleCharacterLimit);
      card.truncatedDescription = this.truncate(card.description, this.descriptionCharacterLimit);
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
    this.cards.forEach(card => {
      card.truncatedTitle = this.truncate(card.title, this.titleCharacterLimit);
      card.truncatedDescription = this.truncate(card.description, this.descriptionCharacterLimit);
    });
  }

  truncate(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    } else {
      return text;
    }
  }

  //deo za strane
  getPaginatedCards(): any[] {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    return this.cards.slice(startIndex, startIndex + this.cardsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  totalPages(): number {
    return Math.ceil(this.cards.length / this.cardsPerPage);
  }
}
