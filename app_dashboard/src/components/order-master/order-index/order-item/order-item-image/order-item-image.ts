import { Component, Input } from '@angular/core';
import { OrdersProvider } from "../../../../../providers/orders/orders";

@Component({
  selector: 'order-item-image',
  templateUrl: 'order-item-image.html'
})
export class OrderItemImageComponent {
  @Input() order;

  constructor(
    public orderService: OrdersProvider
  ) {
  }

}
