import { UiService } from './../../shared/ui.service';
import { AdminService } from './../admin.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private uiService: UiService
    ) { }

  ngOnInit(): void {
  }

  onCreateTraining(form: NgForm) {
    this.adminService.createTraining(form.value);
    form.reset();
    this.uiService.openSnackBar('Training added!');
  }

}
