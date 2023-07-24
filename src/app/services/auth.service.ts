import {Injectable} from '@angular/core';
import {tap} from "rxjs";
import {CreateUserDto} from "../models/dto/create-user.dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userId: number
    username: string

    constructor(private http: HttpClient) {
    }

    login(userDto: CreateUserDto) {
        return this.http.post<CreateUserDto>(`${environment.apiUrl}/auth/login`, userDto).pipe(
            tap((response: any) => {
                localStorage.setItem('auth-nestjs', response.token);
            })
        )
    }

    register(userDto: CreateUserDto) {
        return this.http.post<CreateUserDto>(`${environment.apiUrl}/auth/registration`, userDto).pipe(
            tap((response: any) => {
                localStorage.setItem('auth-nestjs', response.token);
            })
        )
    }

    async isTokenValid() {
        return this.http.get(`${environment.apiUrl}/auth/isJwtValid`).pipe(
            tap((res: any) => {
                this.username = res.username
                this.userId = res.userId
            })
        ).toPromise()
    }

}
