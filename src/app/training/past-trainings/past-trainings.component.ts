import { Subscription } from 'rxjs';
import { Exercice } from './../exercice.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'reps', 'number', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercice>();
  exercicesCompletedSubscription: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercicesCompletedSubscription = this.trainingService.getCompletedExercices()
      .subscribe((exercice: Exercice[]) => {
        this.dataSource.data = exercice;
      });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.exercicesCompletedSubscription) {
      this.exercicesCompletedSubscription.unsubscribe();
    }
  }
}
