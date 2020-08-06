import { UiService } from './../shared/ui.service';
import { Exercice } from './../training/exercice.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private db: AngularFirestore,
    private uiService: UiService
  ) { }

  createTraining(training: Exercice) {
    this.db.collection('availableExercices').add(training)
      .catch(() => {
        this.uiService.openSnackBar('Add to database failed.. please try again later');
      });
  }

  getAvailableExercices() {
    return this.db.collection('availableExercices').valueChanges();
  }
}
