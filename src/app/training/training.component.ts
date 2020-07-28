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

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.exerciceSubscription = this.trainingService.exerciceSelected.subscribe((exercice: Exercice) => {
      if (exercice) {
        this.onGoingTraining = true;
        this.exercice = exercice;
        console.log(this.exercice)
      } else {
        this.onGoingTraining = false;
      }
    })
  }

  ngOnDestroy() {
    this.exerciceSubscription.unsubscribe();
  }

}
