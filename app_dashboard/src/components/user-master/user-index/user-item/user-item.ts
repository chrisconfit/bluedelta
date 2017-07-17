import { Component, Input } from '@angular/core';
import { UsersProvider } from "../../../../providers/users/users";


@Component({
  selector: 'user-item',
  templateUrl: 'user-item.html'
})
export class UserItemComponent {
  @Input() user;
  

  constructor(
    public userService: UsersProvider
  ) {
    
  }

}
