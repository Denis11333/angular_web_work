import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateUserDto} from "../../models/dto/create-user.dto";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  form = new FormGroup({
    username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])
  })

  get username() {
    return this.form.controls.username as FormControl;
  }

  get password() {
    return this.form.controls.password as FormControl;
  }

  errorMessage = ''

  submitForm() {
    this.authService.register(this.form.value as CreateUserDto).pipe(
      catchError((error) => {
        this.errorMessage = error.error?.message
        return throwError(error)
      })
    ).subscribe(() => {
      this.router.navigate([''])
    })
  }
}
