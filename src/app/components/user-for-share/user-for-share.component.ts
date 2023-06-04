import {Component, Input} from '@angular/core';
import {IUser} from "../../models/user";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-user-for-share',
  templateUrl: './user-for-share.component.html',
  styleUrls: ['./user-for-share.component.css']
})
export class UserForShareComponent {
  @Input() user: IUser
  @Input() isShared = false
  isLoading = false

  constructor(private userService: UsersService) {
  }

  addShareUser() {
    this.isLoading = true
    this.userService.addShareUser(this.user).subscribe(() => {
      this.isLoading = false
      this.isShared = !this.isShared
    })
  }

  removeShareUser() {
    this.isLoading = true
    this.userService.removeShareUser(this.user).subscribe(() => {
      this.isLoading = false
      this.isShared = !this.isShared
    })
  }
}
