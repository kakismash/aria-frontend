import { Router } from '@angular/router';
import { AuthService } from './../../../service/authService/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../model/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  user!:                  User;

  options!:               FormGroup;
  usernameControl!:       FormControl;
  passwordControl!:       FormControl;


  constructor(private fb:          FormBuilder,
              private authService: AuthService,
              private router:      Router) {

    this.user                = new User();

    this.usernameControl     = new FormControl(this.user.username, [Validators.required,
                                                                    Validators.email,]);
    this.passwordControl     = new FormControl(this.user.password);

    this.options = fb.group({
      username:               this.usernameControl,
      password:               this.passwordControl
    });

  }

  ngOnInit(): void {
  }

  login(): void {

    this.authService
        .login(this.user)
        .subscribe(user => {

          this.router.navigate(['/admin/home']);

        }, err => {

          console.log(err)

        });

  }

}
