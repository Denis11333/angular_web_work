import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {IUser} from "../models/user";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: IUser[]
  sharedUsers: IUser[]

  constructor(private http: HttpClient) {
  }

  getAllNonCurrentUsers() {
    return this.http.get<IUser[]>(`${environment.apiUrl}/users`).pipe(
      tap(users => this.users = users)
    )
  }

  getUsersWithIShare() {
    return this.http.get<IUser[]>(`${environment.apiUrl}/users/shared`).pipe(
      tap(users => this.sharedUsers = users)
    )
  }

  addShareUser(user: IUser) {
    return this.http.post<IUser>(`${environment.apiUrl}/users/addShare`, user)
  }

  removeShareUser(user: IUser) {
    return this.http.post<IUser>(`${environment.apiUrl}/users/removeShare`, user)
  }

}
