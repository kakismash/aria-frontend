import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingRoutingModule } from './building-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { AddEditModalFormComponent } from './add-edit-modal-form/add-edit-modal-form.component';


@NgModule({
  declarations: [
    ListComponent,
    AddEditModalFormComponent
  ],
  imports: [
    CommonModule,
    BuildingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BuildingModule { }
