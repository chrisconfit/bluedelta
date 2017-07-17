import { Component } from '@angular/core';
import { UsersProvider } from "../../../providers/users/users";


@Component({
  selector: 'user-index',
  templateUrl: 'user-index.html'
})
export class UserIndexComponent {


  constructor(
    public userService: UsersProvider
  ) {
    
  }

}
