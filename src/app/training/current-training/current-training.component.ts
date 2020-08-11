import { Exercice } from './../exercice.model';
import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  timerCount = 0;
  timerId;
  timerStopped = false;
  timerIsFinished = false;
  step: number;

  noDuration = false;
  reps: number;
  number: number;
  sec: number = 0;
  min: number = 0;
  durationTimerId;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    this.durationTimer();
    const duration = this.trainingService.getRunningExercice().duration;
    if (duration) {
      this.step = (this.trainingService.getRunningExercice().duration / 100) * 1000;
      this.timerId = setInterval(() => {
        this.timerCount++;
        if (this.timerCount >= 100) {
          this.timerIsFinished = true;
          this.onPauseTimer();
          this.onCompleteTraining();
        }
      }, this.step);
      this.timerStopped = false;
    } else {
      this.noDuration = true;
      this.startCount();
    }
  }

  startCount() {
    const exercice: Exercice = this.trainingService.getRunningExercice();
    this.number = exercice.number;
    this.reps = exercice.reps;
  }

  durationTimer() {
    this.durationTimerId = setInterval(() => {
      this.sec++;
      if (this.sec >= 60) {
        this.min++;
        this.sec = 0;
      }
    }, 1000);
    this.timerStopped = false;
  }

  onCompleteTraining() {
    this.trainingService.completeExercice();
  }

  onPauseTimer() {
    clearInterval(this.timerId);
    clearInterval(this.durationTimerId);
    this.timerStopped = true;
  }

  onClearTimer() {
    clearInterval(this.timerId);
    clearInterval(this.durationTimerId);
    this.timerStopped = true;
    this.timerIsFinished = false;
    this.timerCount = 0;
    this.sec = 0;
    this.min = 0;
  }

  replayTimer() {
    this.timerCount = 0;
    this.sec = 0;
    this.min = 0;
    this.timerIsFinished = false;
    this.startTimer();
  }

  onCancelTraining() {
    this.onPauseTimer();
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        timerCount: this.timerCount
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.trainingService.cancelExercice(this.timerCount);
        this.onClearTimer();
      }
    });
  }

}
