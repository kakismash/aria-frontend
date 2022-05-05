import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Building } from 'src/app/model/building.model';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  options!:                 FormGroup;
  nameControl!:             FormControl;
  numberOfFloorsControl!:   FormControl;
  descriptionControl!:      FormControl;

  title:                    string = 'Create New Building';

  building!:                Building;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Building) {

    this.building = new Building();

    Object.assign(this.building, data);

    if (this.building.id === undefined) {
      this.title = 'Create New Building';
    } else {
      this.title = 'Editing: ' + this.building.name;
    }

    this.nameControl              = new FormControl(this.building.name);
    this.numberOfFloorsControl    = new FormControl();
    this.descriptionControl       = new FormControl(this.building.description);

    this.options = fb.group({
      name:                     this.nameControl,
      numberOfFloorsControl:    this.numberOfFloorsControl,
      description:              this.descriptionControl
    });

  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.building);
  }



}
