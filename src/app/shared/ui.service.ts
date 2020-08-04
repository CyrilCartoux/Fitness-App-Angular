import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingStateChanged = new Subject<any>();

  constructor() { }
}
