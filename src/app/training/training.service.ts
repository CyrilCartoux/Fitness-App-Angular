import { AngularFirestore } from 'angularfire2/firestore';

import { Injectable } from '@angular/core';
import { Exercice } from './exercice.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  runningExercice: Exercice;
  exerciceSelected = new Subject<Exercice>();
  exercicesChanged = new Subject<Exercice[]>();
  exercicesCompleted: Exercice[] = [];
  availableExercices: Exercice[] = [];

  constructor(
    private db: AngularFirestore
  ) { }

  getExercices() {
    this.db
      .collection('availableExercices')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            const data: any = doc.payload.doc.data();
            return {
              id: doc.payload.doc.id,
              ...data
            };
          });
        })
      )
      .subscribe((exercices: Exercice[]) => {
        this.availableExercices = exercices;
        this.exercicesChanged.next([...this.availableExercices]);
      });
  }

  startExercice(selectedId: string) {
    this.runningExercice = this.availableExercices.find(ex => ex.name === selectedId);
    this.exerciceSelected.next({ ...this.runningExercice });
  }

  completeExercice() {
    this.addDataToDatabase({ ...this.runningExercice, date: new Date(), state: 'completed' });
  }

  getCompletedExercices(): Observable<any> {
    return this.db.collection('completedExercices').valueChanges();
  }

  cancelExercice(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercice,
      date: new Date(),
      duration: this.runningExercice.duration * (progress / 100),
      calories: this.runningExercice.duration * (progress / 100),
      state: 'cancelled'
    });
  }

  getRunningExercice(): Exercice {
    return { ...this.runningExercice };
  }

  private addDataToDatabase(exercice: Exercice) {
    this.db.collection('completedExercices').add(exercice)
      .then(res => {
        this.runningExercice = null;
        this.exerciceSelected.next(null);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
