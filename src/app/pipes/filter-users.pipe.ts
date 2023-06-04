import {Pipe, PipeTransform} from '@angular/core';
import {IUser} from "../models/user";

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: IUser[], username: string): IUser[] {
    if (username.length === 0) return users
    return users.filter(user => user.username.toLowerCase().includes(username.toLowerCase()));
  }

}
