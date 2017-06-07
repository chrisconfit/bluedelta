import { Component, Input } from '@angular/core';

/*
  Generated class for the ButtonItemComponent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'button-item',
  templateUrl: 'button-item.html'
})
export class ButtonItemComponent {

  @Input() button;

  constructor() {
  }

}
