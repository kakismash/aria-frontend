import { SessionService } from './../../../../service/authService/session.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Floor } from './../../../../model/floor.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Building } from 'src/app/model/building.model';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  options!:                 FormGroup;
  nameControl!:             FormControl;
  typeControl!:             FormControl;
  descriptionControl!:      FormControl;

  title:                    string   = 'Create New Role';

  floor:                    Floor    = new Floor();

  currentBuilding:          Building = new Building();

  constructor(public dialogRef:                     MatDialogRef<AddDialogComponent>,
              private sessionService:               SessionService,
              fb:                                   FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Floor) {

    this.currentBuilding = sessionService.loadCurrentBuilding();

    Object.assign(this.floor, data);

    if (this.floor.id === undefined) {
      this.title = 'Create New Floor';
    } else {
      this.title = 'Editing Floor: ' + this.floor.name;
    }

    this.nameControl          = new FormControl(this.floor.name);
    this.typeControl          = new FormControl(this.floor.type);
    this.descriptionControl   = new FormControl(this.floor.description);

    this.options = fb.group({
      name:         this.nameControl,
      type:         this.typeControl,
      description:  this.descriptionControl
    });

  }

  ngOnInit(): void {
  }

  typeChange(event: any) {
    this.floor.type = event.value;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.floor.building    = new Building();
    this.floor.building.id = this.currentBuilding.id;
    this.dialogRef.close(this.floor);
  }

}
