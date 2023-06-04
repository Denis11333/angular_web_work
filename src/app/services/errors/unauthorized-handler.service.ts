import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedHandlerService implements ErrorHandler {
  constructor(private router: Router,
              private zone: NgZone) {
  }

  handleError(error: HttpErrorResponse): void {
    if (error.error?.message === 'token invalid or you not have a needed role' && error.status === 401) {
      localStorage.removeItem('auth-nestjs')
      this.zone.run(() => this.router.navigate(['/login']))
    }
  }
}
