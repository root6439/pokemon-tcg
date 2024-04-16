import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = 'b1455db4-924e-472c-aff1-255d09affd31';

    const authReq = req.clone({
      headers: req.headers.set('X-Api-Key', authToken),
    });

    return next.handle(authReq);
  }
}
