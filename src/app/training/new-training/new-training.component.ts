import { UiService } from './../../shared/ui.service';
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
  loadingSubscription: Subscription;
  isLoading = false;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.fetchExercices();
    this.exerciceSub = this.trainingService.exercicesChanged.subscribe((exercices: Exercice[]) => {
      this.exercises = exercices;
    });
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
  }

  onStartNewTraining(form: NgForm) {
    this.trainingService.startExercice(form.value.selectedExercice);
  }

  fetchExercices() {
    this.trainingService.getExercices();
  }

  ngOnDestroy() {
    this.exerciceSub.unsubscribe();
  }

}
