import { AdminService } from './admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercice } from '../training/exercice.model';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns = ['name', 'duration', 'reps', 'number', 'calories', 'actions'];
  dataSource = new MatTableDataSource<Exercice>();
  exercicesCompletedSubscription: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.exercicesCompletedSubscription = this.adminService.getAvailableExercices()
      .subscribe((exercice: Exercice[]) => {
        console.log(exercice)
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
  onEditTraining(exercice: Exercice) {
    console.log(exercice.name)
  }

  onDeleteTraining(exercice: Exercice) {
    this.adminService.deleteExercice(exercice.name);
  }

}
