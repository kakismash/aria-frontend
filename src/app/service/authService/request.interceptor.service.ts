import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor{

  constructor(private sessionService: SessionService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes('login')) {
      return next.handle(req.clone({headers: req.headers
                            .set('Authorization',
                                 'Bearer ' + this.sessionService.loadToken())}));
    } else {
      return next.handle(req);
    }
                                                                                }
}
