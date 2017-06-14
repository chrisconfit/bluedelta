import { Component } from '@angular/core';

/**
 * Generated class for the OrderItemDetailsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'order-item-details',
  templateUrl: 'order-item-details.html'
})
export class OrderItemDetailsComponent {

  text: string;

  constructor() {
    console.log('Hello OrderItemDetailsComponent Component');
    this.text = 'Hello World';
  }

}
