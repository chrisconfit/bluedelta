import { Component, Input } from '@angular/core';
import {OrdersProvider} from "../../../../../providers/orders/orders";

@Component({
  selector: 'order-item-details',
  templateUrl: 'order-item-details.html'
})
export class OrderItemDetailsComponent {
  @Input() order;

  constructor(
    public orderService: OrdersProvider
  ) {
  }

}
