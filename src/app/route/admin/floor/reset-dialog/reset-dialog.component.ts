import { MatDialogRef } from '@angular/material/dialog';
import { SessionService } from './../../../../service/authService/session.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Building } from 'src/app/model/building.model';
import { IFloorsForm } from './../../../../interface/ifloors-form';

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.scss']
})
export class ResetDialogComponent {

  options!:                   FormGroup;
  numberOfFloorsControl!:     FormControl;
  prefixControl!:             FormControl;
  floor13Control!:            FormControl;

  result:                     IFloorsForm = {floor13: false, prefix: '', numberOfFloors: 1};

  currentBuilding:            Building = new Building();


  constructor(public  dialogRef:                    MatDialogRef<ResetDialogComponent>,
              private sessionService:               SessionService,
                      fb:                           FormBuilder) {

    this.currentBuilding          = sessionService.loadCurrentBuilding();

    this.numberOfFloorsControl    = new FormControl();
    this.prefixControl            = new FormControl();
    this.floor13Control           = new FormControl(false);

    this.options = fb.group({
      numberOfFloors:         this.numberOfFloorsControl,
      prefix:                 this.prefixControl,
      floor13:                this.floor13Control
    });

  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {

    this.result.numberOfFloors  = this.numberOfFloorsControl.value;
    this.result.prefix          = this.prefixControl.value;
    this.result.floor13         = this.floor13Control.value;
    this.dialogRef.close(this.result);
  }

}
