import { ChangePasswordDialogComponent } from './../../user/change-password-dialog/change-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/authService/auth.service';
import { User } from 'src/app/model/user.model';
import { SessionService } from '../../../../service/authService/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  loggedUser:                           User = new User();

  constructor(private sessionService:   SessionService,
              private authService:      AuthService,
              private router:           Router,
              public  dialog:           MatDialog) {

    this.loggedUser =  sessionService.load();

  }

  ngOnInit(): void {
  }

  logout(): void {

    this.authService
        .logout()
        .subscribe(res => {

          this.sessionService.remove();
          this.router.navigate(['/login']);

        });

  }

  openChangePasswordDialog(): void {

    this.dialog.open(ChangePasswordDialogComponent);

  }

}
