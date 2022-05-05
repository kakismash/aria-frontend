import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService,
              private router: Router,
              private authService: AuthService) {
    this.sessionService
        .load();
  }

  canActivate(): boolean {
    let can = true;

    if (!this.authService.isAuthenticated()) {
      this.redirectToLogin();
      can = false;
    }

    return can;
  }

  private redirectToLogin(): void {
    this.router.navigate(['login']);
  }
}
