import { AfterViewInit, Component, OnInit, inject} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  constructor(private spinner: NgxSpinnerService) { }

  ngAfterViewInit(): void {
    this.spinner.show();
    this.hideSpinnerAfterLoad();
  }

  hideSpinnerAfterLoad(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 2000); 
  }
}
