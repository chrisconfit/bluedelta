import { Component } from '@angular/core';
import {OrdersProvider} from "../../../../../providers/orders/orders";

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

  constructor(
    public orderService: OrdersProvider
  ) {
  }

}
