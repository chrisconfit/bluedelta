import { Component } from '@angular/core';

/**
 * Generated class for the EditOrderFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'edit-order-form',
  templateUrl: 'edit-order-form.html'
})
export class EditOrderFormComponent {

  text: string;

  constructor() {
    console.log('Hello EditOrderFormComponent Component');
    this.text = 'Hello World';
  }

}
