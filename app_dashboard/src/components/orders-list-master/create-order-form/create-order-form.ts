import { Component } from '@angular/core';

/**
 * Generated class for the CreateOrderFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'create-order-form',
  templateUrl: 'create-order-form.html'
})
export class CreateOrderFormComponent {

  text: string;

  constructor() {
    console.log('Hello CreateOrderFormComponent Component');
    this.text = 'Hello World';
  }

}
