import { UiService } from './../shared/ui.service';
import { Exercice } from './../training/exercice.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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
    this.db.collection('availableExercices').add(training)
      .then((res) => {
        console.log(res.id);
        this.uiService.openSnackBar('Training created');
      })
      .catch(() => {
        this.uiService.openSnackBar('Add to database failed.. please try again later');
      });
  }

  getAvailableExercices() {
    return this.db.collection<Exercice>('availableExercices').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Exercice;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  fetchTrainingByName(name: string) {
    this.uiService.loadingStateChanged.next(true);
    return this.db.collection('availableExercices')
      .doc(name)
      .valueChanges();
  }

  editExercice(id: string, exercice: Exercice) {
    this.db.collection('availableExercices').doc(id).update(exercice)
      .then(() => {
        this.uiService.openSnackBar('Training edited');
      })
      .catch(err => { this.uiService.openSnackBar(err.message); });
  }

  deleteExercice(name: string) {
    console.log(name)
    this.db.collection('availableExercices').doc(name).delete()
      .then(() => {
        this.uiService.openSnackBar('Training deleted');
      })
      .catch(() => {
        this.uiService.openSnackBar('Something went wrong please try again later..')
      });
  }
}
