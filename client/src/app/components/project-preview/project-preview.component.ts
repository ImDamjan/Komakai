import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css']
})
export class ProjectPreviewComponent implements OnInit {
  // Properties for character limits
  titleCharacterLimit: number = 0;
  descriptionCharacterLimit: number = 0;

  // Properties for pagination
  cards: any[] = [];
  currentPage: number = 1;
  cardsPerPage: number = 6;

  constructor() {
    // Initialize component
    this.calculateCharacterLimit();

    // Sample data for cards
    this.cards = [
      { 
        title: 'Project X',
        description: 'A revolutionary project aiming to redefine the way we approach software development. Join us in shaping the future!',
        status: 'In progress',
        teamMembers: ['Johnathan Doe', 'Jane Smithson', 'Alice Johnson'],
        teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg']
      },
      { 
        title: 'Card 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'Ready',
        teamMembers: ['Bob Brown', 'Charlie Davis'],
        teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg']
      },
      { 
        title: 'Super Project Omega',
        description: 'Join the most exciting project of the decade! Our team is dedicated to creating innovative solutions that will shape tomorrow.',
        status: 'Done',
        teamMembers: ['Ella Martinez', 'Frank Wilson', 'Grace Lee'],
        teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg']
      },
      { 
        title: 'Project Prometheus',
        description: 'Embark on a journey to unveil the mysteries of technology. Explore the depths of code with our dynamic team!',
        status: 'In progress',
        teamMembers: ['Jack White', 'Liam King', 'Mia Lopez', 'Noah Moore'],
        teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg']
      },
      { 
        title: 'Exciting Venture',
        description: 'A new venture awaits! Join our team of experts as we embark on a mission to disrupt conventional norms and create something extraordinary.',
        status: 'In progress',
        teamMembers: ['Sophia Baker', 'Peter Green', 'Quinn Hall'],
        teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg']
      },
      { 
        title: 'Project Zeta',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi, ut semper risus.',
        status: 'Done',
        teamMembers: ['Ryan Adams', 'John Johnson'],
        teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg']
      },
      { 
        title: 'Advanced Initiative',
        description: 'Join us in an advanced initiative to push the boundaries of technology. Together, we can achieve the extraordinary!',
        status: 'Ready',
        teamMembers: ['Ella Martinez', 'Grace Lee', 'Henry Taylor', 'Ivy Clark'],
        teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg']
      },
      { 
        title: 'Project Theta',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        status: 'In progress',
        teamMembers: ['Alice Johnson', 'Bob Brown', 'Charlie Davis', 'David Wilson'],
        teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg']
      },
      { 
        title: 'Card 9',
        description: 'Description 9',
        status: 'Done',
        teamMembers: ['Ellie Brown', 'Aaron Smith'],
        teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg']
      },
      { 
        title: 'Exciting Journey',
        description: 'Embark on an exciting journey with our team. Together, we can achieve greatness and make a lasting impact!',
        status: 'Ready',
        teamMembers: ['Michael Davis', 'Olivia White'],
        teamMemberImages: ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg']
      }
    ];
  }

  ngOnInit(): void {
    // Detect changes in screen size for character limits
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', () => {
      this.calculateCharacterLimit();
      this.truncateText();
    });

    // Initialize truncated titles and descriptions for cards
    this.cards.forEach(card => {
      card.truncatedTitle = this.truncate(card.title, this.titleCharacterLimit);
      card.truncatedDescription = this.truncate(card.description, this.descriptionCharacterLimit);
    });
  }

  // Calculate character limits based on screen width
  calculateCharacterLimit() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.titleCharacterLimit = 5;
      this.descriptionCharacterLimit = 60;
    } else if (screenWidth >= 768 && screenWidth < 1025) {
      this.titleCharacterLimit = 10;
      this.descriptionCharacterLimit = 100;
    } else {
      this.titleCharacterLimit = 17;
      this.descriptionCharacterLimit = 190;
    }
  }

  // Truncate text to specified character limit
  truncateText() {
    this.cards.forEach(card => {
      card.truncatedTitle = this.truncate(card.title, this.titleCharacterLimit);
      card.truncatedDescription = this.truncate(card.description, this.descriptionCharacterLimit);
    });
  }

  // Helper function to truncate text
  truncate(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    } else {
      return text;
    }
  }

  // Pagination functions

  // Get cards for the current page
  getPaginatedCards(): any[] {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    return this.cards.slice(startIndex, startIndex + this.cardsPerPage);
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  // Go to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Get the total number of pages
  totalPages(): number {
    return Math.ceil(this.cards.length / this.cardsPerPage);
  }

  // Calculate the pages to show in pagination control
  pagesToShow(): number[] {
    const total = this.totalPages();
    const current = this.currentPage;
    const pagesToShowCount = 3;
  
    let from = Math.max(1, current - Math.floor(pagesToShowCount / 2));
    let to = Math.min(total, from + pagesToShowCount - 1);
  
    if (to - from + 1 < pagesToShowCount) {
      if (current < Math.ceil(pagesToShowCount / 2)) {
        to = Math.min(total, pagesToShowCount);
      } else {
        from = Math.max(1, total - pagesToShowCount + 1);
      }
    }
  
    const pages: number[] = [];
    for (let i = from; i <= to; i++) {
      pages.push(i);
    }
    return pages;
}
  
  // Method to navigate to a specific page
  goToPage(page: number): void {
    this.currentPage = page;
  }
}
