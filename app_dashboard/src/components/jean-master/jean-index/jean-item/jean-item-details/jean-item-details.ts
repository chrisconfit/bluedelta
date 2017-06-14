import { Component, Input } from '@angular/core';

@Component({
  selector: 'jean-item-details',
  templateUrl: 'jean-item-details.html'
})
export class JeanItemDetailsComponent {
  @Input() jean;

  constructor() {
  }

}
