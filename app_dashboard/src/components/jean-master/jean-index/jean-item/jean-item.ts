import { Component, Input } from '@angular/core';


@Component({
  selector: 'jean-item',
  templateUrl: 'jean-item.html'
})
export class JeanItemComponent {
  @Input() jean;
  

  constructor() {
  }

}
