import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { UiService } from './../shared/ui.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Exercice } from './exercice.model';
import { Subject, Observable, Subscription } from 'rxjs';
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
  firebaseSubs: Subscription;

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private authService: AuthService
  ) { }

  getExercices() {
    this.uiService.loadingStateChanged.next(true);
    this.firebaseSubs = this.db
      .collection('availableExercices')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          // throw(new Error())
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
        this.uiService.loadingStateChanged.next(false);
        this.availableExercices = exercices;
        this.exercicesChanged.next([...this.availableExercices]);
      }, error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar('Could not fetch exercises .. Please try again later');
        this.exercicesChanged.next(null);
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
    const uid = this.getUser();
    return this.db.collection('users').doc(uid).collection('completedExercices').valueChanges();
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

  cancelSubs() {
    if (this.firebaseSubs) {
      this.firebaseSubs.unsubscribe();
    }
  }

  private getUser() {
    let uid;
    this.authService.loggedInUser.subscribe((user: User) => {
      if (user) {
        uid = user.userId;
      }
    });
    return uid;
  }

  private addDataToDatabase(exercice: Exercice) {
    const uid = this.getUser();
    this.db.collection('users').doc(uid).collection('completedExercices').add(exercice)
      .then(() => {
        this.runningExercice = null;
        this.exerciceSelected.next(null);
      })
      .catch(err => {
        this.uiService.openSnackBar('Add to database failed.. please try again later');
        console.log(err)
      });
  }
}
