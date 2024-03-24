import { Component, OnInit } from '@angular/core';
import { HeaderInfoService } from '../../services/header-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  informacije: any[] | undefined;
  constructor(private header_info: HeaderInfoService){}
  ngOnInit(): void {
    this.header_info.getImenaILokacije().subscribe(data => {
      this.informacije = data;
    });
  }
}
