import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private Url: string = '';

  setUrl(noviUrl: string){
    this.Url=noviUrl;
  }

  getUrl(){
    return this.Url;
  }

}
