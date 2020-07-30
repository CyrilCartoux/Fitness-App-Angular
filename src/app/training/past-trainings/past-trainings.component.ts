import { Exercice } from './../exercice.model';
import { Component, OnInit } from '@angular/core';

import { TrainingService } from '../training.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercice>();

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedExercices();
  }
}
