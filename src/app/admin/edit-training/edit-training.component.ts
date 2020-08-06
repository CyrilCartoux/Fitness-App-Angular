import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.css']
})
export class EditTrainingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onEditTraining(form: NgForm) {
    console.log(form.value)
  }

}
