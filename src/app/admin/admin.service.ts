import { UiService } from './../shared/ui.service';
import { Exercice } from './../training/exercice.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  trainingToEdit: Exercice;

  constructor(
    private db: AngularFirestore,
    private uiService: UiService
  ) { }

  createTraining(training: Exercice) {
    this.db.collection('availableExercices').doc(training.name).set(training)
      .catch(() => {
        this.uiService.openSnackBar('Add to database failed.. please try again later');
      });
  }

  getAvailableExercices() {
    return this.db.collection('availableExercices').valueChanges();
  }

  fetchTrainingByName(name: string) {
    this.uiService.loadingStateChanged.next(true);
    return this.db.collection('availableExercices')
      .doc(name)
      .valueChanges();
  }

  editExercice(name: string, exercice: Exercice) {
    this.db.collection('availableExercices').doc(name).update(exercice)
      .catch(err => { this.uiService.openSnackBar(err.message); });
  }

  deleteExercice(name: string) {
    console.log(name)
    this.db.collection('availableExercices').doc(name).delete()
      .catch(() => {
        this.uiService.openSnackBar('Something went wrong please try again later..')
      });
  }
}
