import { Exercice } from './../exercice.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercice[];
  exerciceSub: Subscription;

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.trainingService.getExercices();
    this.exerciceSub = this.trainingService.exercicesChanged.subscribe((exercices: Exercice[]) => {
      this.exercises = exercices;
    })
  }

  onStartNewTraining(form: NgForm) {
    this.trainingService.startExercice(form.value.selectedExercice);
  }

  ngOnDestroy() {
    this.exerciceSub.unsubscribe();
  }

}
