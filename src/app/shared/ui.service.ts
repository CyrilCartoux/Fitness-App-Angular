import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  loadingStateChanged = new Subject<boolean>();

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000
    });
  }
}