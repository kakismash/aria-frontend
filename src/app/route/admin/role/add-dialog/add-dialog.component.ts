import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/model/role.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  options!:                 FormGroup;
  nameControl!:             FormControl;
  levelControl!:            FormControl;

  title:                    string = 'Create New Role';

  role!:                    Role;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Role) {

    this.role = new Role();

    Object.assign(this.role, data);

    if (this.role.id === undefined) {
      this.title = 'Create New Role';
    } else {
      this.title = 'Editing: ' + this.role.name;
    }

    this.nameControl   = new FormControl(this.role.name);
    this.levelControl  = new FormControl(this.role.level);

    this.options = fb.group({
      name:       this.nameControl,
      level:      this.levelControl
    });

  }

  ngOnInit(): void {
  }

  levelChange(event: any) {
    this.role.level = event.value;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.role);
  }

}
