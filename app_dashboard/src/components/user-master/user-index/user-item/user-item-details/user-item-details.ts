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

}
