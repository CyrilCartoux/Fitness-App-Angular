import { UiService } from './../../shared/ui.service';
import { Exercice } from './../../training/exercice.model';
import { AdminService } from './../admin.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.css']
})
export class EditTrainingComponent implements OnInit {

  trainingToEditName: string;
  trainingToEdit: Exercice;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.route.paramMap.subscribe(route => {
      this.trainingToEditName = route.get('trainingId');
      this.adminService.fetchTrainingByName(this.trainingToEditName)
        .subscribe((exercice: Exercice) => {
          this.trainingToEdit = exercice;
          this.uiService.loadingStateChanged.next(false);
        });
    });
  }

  onEditTraining(form: NgForm) {
    this.adminService.editExercice(form.value.name, this.trainingToEdit);
  }

}
