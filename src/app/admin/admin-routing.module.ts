import { AdminComponent } from './admin.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'new', component: CreateTrainingComponent },
  { path: 'edit/:trainingId', component: EditTrainingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
