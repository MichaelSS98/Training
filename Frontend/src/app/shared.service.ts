import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  constructor() { }

  private subject = new Subject<any>();

  sendChangeHeaderEvent() {
    this.subject.next();
  }

  getChangeHeaderEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
