import { MatCheckboxModule } from '@angular/material/checkbox';
import { FloorComponent } from './floor.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorRoutingModule } from './floor-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { TableComponent } from './table/table.component';
import { ResetDialogComponent } from './reset-dialog/reset-dialog.component';


@NgModule({
  declarations: [
    AddDialogComponent,
    TableComponent,
    FloorComponent,
    ResetDialogComponent
  ],
  imports: [
    CommonModule,
    FloorRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatTooltipModule,
    MatCheckboxModule
  ]
})
export class FloorModule { }
