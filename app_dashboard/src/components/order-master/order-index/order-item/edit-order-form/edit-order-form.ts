import { Component } from '@angular/core';
import {OrdersProvider} from "../../../../../providers/orders/orders";

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

  constructor(
    public orderService: OrdersProvider
  ) {
  }

}
