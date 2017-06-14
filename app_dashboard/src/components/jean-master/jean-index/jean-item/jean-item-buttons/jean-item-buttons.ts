import { Component, Input } from '@angular/core';


@Component({
  selector: 'jean-item-buttons',
  templateUrl: 'jean-item-buttons.html'
})
export class JeanItemButtonsComponent {
  @Input() jean;

  constructor() {
  }

}
