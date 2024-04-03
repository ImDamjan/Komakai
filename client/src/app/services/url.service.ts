import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviousUrlService {

  private previousUrlSubject = new BehaviorSubject<string | null>(null);
  public previousUrl$ = this.previousUrlSubject.asObservable();

  setPreviousUrl(url: string | null) {
    this.previousUrlSubject.next(url);
  }
}