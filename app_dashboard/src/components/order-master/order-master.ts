import { Component } from '@angular/core';

/**
 * Generated class for the OrderMasterComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'order-master',
  templateUrl: 'order-master.html'
})
export class OrderMasterComponent {

  text: string;

  constructor() {
    console.log('Hello OrderMasterComponent Component');
    this.text = 'Hello World';
  }

}
