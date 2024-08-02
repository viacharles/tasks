import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }
  /** 視窗點擊 */
  public clickSubject = new Subject<Event>();
  /** 視窗點擊訂閱 */
  public click$ = this.clickSubject.asObservable();
}
