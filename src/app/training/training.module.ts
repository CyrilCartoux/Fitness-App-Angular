import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { TrainingRoutingModule } from './training-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';



@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
    StopTrainingComponent
  ]
})
export class TrainingModule { }
