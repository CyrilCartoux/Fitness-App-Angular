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

  trainingToEditId: string;
  trainingToEdit: Exercice;
  isLoading = false;
  needReps = false;

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
      this.trainingToEditId = route.get('trainingId');
      console.log(this.trainingToEditId)
      this.adminService.fetchTrainingByName(this.trainingToEditId)
        .subscribe((exercice: Exercice) => {
          if (exercice.reps) {
            this.needReps = true;
          }
          this.trainingToEdit = exercice;
          this.uiService.loadingStateChanged.next(false);
        });
    });
  }

  onEditTraining(form: NgForm) {
    this.adminService.editExercice(this.trainingToEditId, form.value);
  }

}
