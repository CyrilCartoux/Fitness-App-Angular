import { NgForm } from '@angular/forms';
import { Exercice } from './../exercice.model';
import { TrainingService } from './../training.service';
import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercices: Exercice[];

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.exercices = this.trainingService.getExercices();
  }

  onStartNewTraining(form: NgForm) {
    this.trainingService.startExercice(form.value.selectedExercice);
  }

}
