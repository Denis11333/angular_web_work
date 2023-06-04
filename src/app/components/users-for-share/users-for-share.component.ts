import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {IUser} from "../../models/user";

@Component({
  selector: 'app-users-for-share',
  templateUrl: './users-for-share.component.html',
  styleUrls: ['./users-for-share.component.css']
})
export class UsersForShareComponent implements OnInit {
  isLoading = false
  usersSearchText = ''

  constructor(public userService: UsersService) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.userService.getAllNonCurrentUsers().subscribe()

    this.userService.getUsersWithIShare().subscribe(() => {
      this.isLoading = false
    })

  }

  isShared(user: IUser){
    return this.userService.sharedUsers.some(x => x.id === user.id)
  }
}
