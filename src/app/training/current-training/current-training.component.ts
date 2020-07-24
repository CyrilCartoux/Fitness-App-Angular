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
  constructor() { }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.timerCount++;
      if (this.timerCount === 100) {
        this.onClearTimer();
      }
    }, 100);
    this.timerStopped = false;
  }

  onPauseTimer() {
    clearInterval(this.timerId);
    this.timerStopped = true
  }

  onClearTimer() {
    clearInterval(this.timerId);
    this.timerStopped = true;
    this.timerCount = 0;
  }

}
