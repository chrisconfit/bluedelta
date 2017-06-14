import { Component, Input } from '@angular/core';


@Component({
  selector: 'user-item-image',
  templateUrl: 'user-item-image.html'
})
export class UserItemImageComponent {
  @Input() user;
  

  constructor() {

  }

}
