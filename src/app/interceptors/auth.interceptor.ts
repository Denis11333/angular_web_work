import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtHelper: JwtHelperService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem("auth-nestjs");

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem("auth-nestjs")
      return next.handle(req)
    }

    const cloned = req.clone({
      headers: req.headers.set("Authorization",
        "Bearer " + token)
    });

    return next.handle(cloned);
  }
}
