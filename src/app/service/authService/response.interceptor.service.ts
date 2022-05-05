import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req)
               .pipe(
                  tap(),
                  catchError((error: HttpErrorResponse) => {

                    if (error.status === 401) {

                      this.authService.logout();

                      swal.fire('Unauthorized or Unauthenticated', error.message, 'error');

                    } else if (error.status === 403) {

                      swal.fire('Opps, something went wrong!', 'Wrong Username or Password', 'error');

                    } else if (error.status === 500) {

                      swal.fire('Something fail with the server', error.message, 'error');

                    } else {

                      swal.fire('Opps something happen', error.message, 'error');

                    }

                    return throwError(error);
                  })
               )

  }



}
