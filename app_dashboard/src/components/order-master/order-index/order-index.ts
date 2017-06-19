import { Component } from '@angular/core';

/**
 * Generated class for the OrderIndexComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'order-index',
  templateUrl: 'order-index.html'
})
export class OrderIndexComponent {

  text: string;

  constructor() {
    console.log('Hello OrderIndexComponent Component');
    this.text = 'Hello World';
  }

}
