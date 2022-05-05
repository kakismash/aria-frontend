import { SessionService } from './../../../../service/authService/session.service';
import { RoleService } from './../../../../service/role.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user.model';
import { Role } from 'src/app/model/role.model';
import { Building } from 'src/app/model/building.model';
import { BuildingService } from 'src/app/service/building.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  maskPhone           = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  maskSocialSecurity  = [ /[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  options!:                     FormGroup;
  firstNameControl!:            FormControl;
  lastNameControl!:             FormControl;
  phoneControl!:                FormControl;
  socialSecurityControl!:       FormControl;
  usernameControl!:             FormControl;
  roleControl!:                 FormControl;
  defaultBuildingControl!:      FormControl;

  buildings:                    Array<Building> = new Array();

  user:                         User = new User();

  LoggedUser:                   User = new User();


  title!:                       string;

  roles:                        Array<Role> = new Array<Role>();

  hide = true;

  constructor(public dialogRef:                     MatDialogRef<AddDialogComponent>,
                            fb:                     FormBuilder,
              private buildingService:              BuildingService,
              private roleService:                  RoleService,
              private sessionService:               SessionService,
              @Inject(MAT_DIALOG_DATA) public data: User) {

    this.LoggedUser = sessionService.load();

    Object.assign(this.user, data);

    if (this.user.id === undefined) {
      this.title = 'Invite New User';
    } else {
      this.title = 'Editing User Invitation: ' + this.user.firstname + ' ' + this.user.lastname;
    }

    this.firstNameControl             = new FormControl(this.user.firstname);
    this.lastNameControl              = new FormControl(this.user.lastname);
    this.phoneControl                 = new FormControl(this.user.phoneNumber);
    this.socialSecurityControl        = new FormControl(this.user.socialSecurity);
    this.usernameControl              = new FormControl(this.user.username, [Validators.required,
                                                                             Validators.email,]);
    this.roleControl                  = new FormControl(this.user.role);
    this.defaultBuildingControl       = new FormControl(this.user.defaultBuilding);

    this.options = fb.group({
      firstName:              this.firstNameControl,
      lastName:               this.lastNameControl,
      phone:                  this.phoneControl,
      socialSecurity:         this.socialSecurityControl,
      username:               this.usernameControl,
      role:                   this.roleControl,
      defaultBuilding:        this.defaultBuildingControl
    });

  }

  ngOnInit(): void {
    this.loadBuildings();
    this.loadRoles();
  }

  loadBuildings(): void {
    this.buildingService
        .list()
        .subscribe(b => this.buildings = b,
                   err => console.log(err));
  }

  loadRoles(): void {
    this.roleService
        .list()
        .subscribe(r => this.roles = r,
          err => console.log(err));
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {

    this.user.firstname       = this.firstNameControl.value;
    this.user.lastname        = this.lastNameControl.value;
    this.user.phoneNumber     = this.phoneControl.value;
    this.user.socialSecurity  = this.socialSecurityControl.value.replace(/-/gi, '');
    this.user.username        = this.usernameControl.value;

    if(this.user.role === undefined) {
      this.user.role      = new Role();
      this.user.role.name = 'GUEST';
    }

    this.dialogRef.close(this.user);
  }


  buildingChanged(event: any): void {
    this.user.defaultBuilding = event.value;
  }

  roleChanged(event: any): void {
    this.user.role = new Role();
    this.user.role.id = event.value;
  }

}
