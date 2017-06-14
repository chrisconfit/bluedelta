import { Component, Input } from '@angular/core';

@Component({
  selector: 'jean-item-image',
  templateUrl: 'jean-item-image.html'
})
export class JeanItemImageComponent {
  @Input() jean;

  constructor() {
  }

}
