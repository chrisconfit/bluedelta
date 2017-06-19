import { Component } from '@angular/core';

/**
 * Generated class for the OrderItemButtonsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'order-item-buttons',
  templateUrl: 'order-item-buttons.html'
})
export class OrderItemButtonsComponent {

  text: string;

  constructor() {
    console.log('Hello OrderItemButtonsComponent Component');
    this.text = 'Hello World';
  }

}
