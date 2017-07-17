import { Component } from '@angular/core';
import { UsersProvider } from "../../../providers/users/users";


@Component({
  selector: 'create-user-form',
  templateUrl: 'create-user-form.html'
})
export class CreateUserFormComponent {

  

  constructor(
    public userService: UsersProvider
  ) {
  }

}
