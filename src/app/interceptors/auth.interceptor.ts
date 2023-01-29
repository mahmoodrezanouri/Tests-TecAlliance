import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const userUrl = 'https://jsonplaceholder.typicode.com/users';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.checkAuthentication() || req.url == userUrl)
      return next.handle(req);

    this.router.navigateByUrl('/login');

    return next.handle(req);
  }

  private checkAuthentication() {
    let val: string = localStorage.getItem('isUserAuthenticated') || '';
    return val === 'true';
  }
}
