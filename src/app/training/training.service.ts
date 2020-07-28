
import { Injectable } from '@angular/core';
import { Exercice } from './exercice.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  runningExercice: Exercice;
  exerciceSelected = new Subject<Exercice>();
  availableExercices: Exercice[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
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
}
