import { Component, Input } from '@angular/core';
import { UsersProvider } from "../../../../../providers/users/users";

@Component({
  selector: 'edit-user-form',
  templateUrl: 'edit-user-form.html'
})
export class EditUserFormComponent {
  @Input() user;
  

  constructor(
    public userService: UsersProvider
  ) {
    
  }

}
