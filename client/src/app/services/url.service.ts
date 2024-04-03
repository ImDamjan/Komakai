import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private isRedirected: boolean=false;

  changeDirected(){
    this.isRedirected=!this.isRedirected;
  }

  getRedirected(){
    return this.isRedirected;
  }

}
