import {Injectable} from "@angular/core";
import {root} from "postcss";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router : Router) {

  }

  async canActivate() {
    return await this.authService.isTokenValid().catch(() => {
      this.router.navigate(['/login'])
      return false
    }) !== false
  }
}
