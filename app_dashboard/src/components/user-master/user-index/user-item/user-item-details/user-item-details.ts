import { Component, Input } from '@angular/core';
import { UsersProvider } from "../../../../../providers/users/users";


@Component({
  selector: 'user-item-details',
  templateUrl: 'user-item-details.html'
})
export class UserItemDetailsComponent {
  @Input() user;
  

  constructor(
    public userService: UsersProvider
  ) {
  }

  logIt(date) {
    console.log(date);
    console.log(Date.parse(date));
  }

  isRecentEdit(date) {
    return (new Date().getTime() -  Date.parse(date) < 3600);
  }

}
