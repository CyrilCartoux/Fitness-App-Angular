import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit  } from '@angular/core';

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

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
    ) { }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    console.log(this.trainingService.getRunningExercice())
    this.step = (this.trainingService.getRunningExercice().duration / 100) * 1000;
    this.timerId = setInterval(() => {
      this.timerCount++;
      if (this.timerCount >= 100) {
        this.timerIsFinished = true;
        this.onPauseTimer();
        this.trainingService.completeExercice();
      }
    }, this.step);
    this.timerStopped = false;
  }

  onPauseTimer() {
    clearInterval(this.timerId);
    this.timerStopped = true;
  }

  onClearTimer() {
    clearInterval(this.timerId);
    this.timerStopped = true;
    this.timerIsFinished = false;
    this.timerCount = 0;
  }

  replayTimer() {
    this.timerCount = 0;
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
