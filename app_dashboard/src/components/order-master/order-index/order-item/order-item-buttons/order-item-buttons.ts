import { Component, Input } from '@angular/core';
import {OrdersProvider} from "../../../../../providers/orders/orders";

@Component({
  selector: 'order-item-buttons',
  templateUrl: 'order-item-buttons.html'
})
export class OrderItemButtonsComponent {
  @Input() order;


  constructor(
    public orderService: OrdersProvider
  ) {
  }

}
