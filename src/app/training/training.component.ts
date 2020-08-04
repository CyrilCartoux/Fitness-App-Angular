import { UiService } from './../shared/ui.service';
import { Subscription } from 'rxjs';
import { Exercice } from './exercice.model';
import { TrainingService } from './training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  onGoingTraining = false;
  exercice: Exercice;
  exerciceSubscription: Subscription;
  isLoading = false;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.exerciceSubscription = this.trainingService.exerciceSelected.subscribe((exercice: Exercice) => {
      if (exercice) {
        this.onGoingTraining = true;
        this.exercice = exercice;
      } else {
        this.onGoingTraining = false;
      }
    });
    this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
      console.log(isLoading)
    })
  }

  ngOnDestroy() {
    this.exerciceSubscription.unsubscribe();
  }

}
