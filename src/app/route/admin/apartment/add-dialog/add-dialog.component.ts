import { SessionService } from 'src/app/service/authService/session.service';
import { BuildingService } from './../../../../service/building.service';
import { Building } from 'src/app/model/building.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apartment } from 'src/app/model/apartment.model';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  options!:                   FormGroup;
  displayControl!:            FormControl;
  descriptionControl!:        FormControl;

  title:                      string = 'Create New Apartment';

  apartment:                  Apartment = new Apartment();

  buildings:                  Array<Building> = new Array<Building>();

  currentBuilding:            Building = new Building();

  constructor(public dialogRef:                     MatDialogRef<AddDialogComponent>,
              private buildingService:              BuildingService,
                                   fb:              FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: Apartment,
              private sessionService:               SessionService) {

    this.currentBuilding = sessionService.loadCurrentBuilding();

    Object.assign(this.apartment, data);

    if (this.apartment.id === undefined) {
      this.title = 'Create new Apartment';
    } else {
      this.title = 'Editing Apartment: ' + this.apartment.display;
    }

    this.displayControl     = new FormControl(this.apartment.display, [Validators.required]);
    this.descriptionControl = new FormControl(this.apartment.description);

    this.options = fb.group({
      display:        this.displayControl,
      description:    this.descriptionControl
    });

  }

  ngOnInit(): void {}


  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.apartment.building    = new Building();
    this.apartment.building.id = this.currentBuilding.id;
    this.dialogRef.close(this.apartment);
  }

}
