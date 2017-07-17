import { Component, Input } from '@angular/core';
import { UsersProvider } from "../../../../../providers/users/users";


@Component({
  selector: 'user-item-buttons',
  templateUrl: 'user-item-buttons.html'
})
export class UserItemButtonsComponent {
  @Input() user;

  constructor(
    public userService: UsersProvider
  ) {
    
  }

}
