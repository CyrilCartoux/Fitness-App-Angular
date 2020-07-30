
import { Injectable } from '@angular/core';
import { Exercice } from './exercice.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  runningExercice: Exercice;
  exerciceSelected = new Subject<Exercice>();
  exercicesCompleted: Exercice[] = [];
  availableExercices: Exercice[] = [
    { id: 'crunches', name: 'Crunches', duration: 10, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  constructor() { }

  getExercices(): Exercice[] {
    return [...this.availableExercices];
  }
  startExercice(selectedId: string) {
    this.runningExercice = this.availableExercices.find(ex => ex.id === selectedId);
    this.exerciceSelected.next({ ...this.runningExercice });
  }

  completeExercice() {
    this.exercicesCompleted.push({ ...this.runningExercice, date: new Date(), state: 'completed' });
    this.runningExercice = null;
    this.exerciceSelected.next(null);
  }

  getCompletedExercices(): Exercice[] {
    return this.exercicesCompleted.slice();
  }

  cancelExercice(progress: number) {
    this.exercicesCompleted.push({
      ...this.runningExercice,
      date: new Date(),
      duration: this.runningExercice.duration * (progress / 100),
      calories: this.runningExercice.duration * (progress / 100),
      state: 'cancelled'
    });
    console.log('progress: ' + progress)
    console.log(this.exercicesCompleted)
    console.log(this.runningExercice.duration)
    this.runningExercice = null;
    this.exerciceSelected.next(null);
  }

  getRunningExercice(): Exercice {
    return { ...this.runningExercice };
  }
}
