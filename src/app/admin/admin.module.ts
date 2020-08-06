import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from './../material/material.module';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';



@NgModule({
  declarations: [
    EditTrainingComponent,
    CreateTrainingComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AdminRoutingModule
  ],
  exports: [CreateTrainingComponent, EditTrainingComponent]
})
export class AdminModule { }
