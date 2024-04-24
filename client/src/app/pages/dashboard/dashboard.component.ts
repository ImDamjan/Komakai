import { Component, OnInit, inject} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  private spinner = inject(NgxSpinnerService);
  ngOnInit(): void {
    this.spinner.show();
    this.spinner.hide();
  }
  //ng create component components/naziv-komponente
}
