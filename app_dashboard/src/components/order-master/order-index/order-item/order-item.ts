import {Component, Input} from '@angular/core';
import {OrdersProvider} from "../../../../providers/orders/orders";

@Component({
  selector: 'order-item',
  templateUrl: 'order-item.html'
})
export class OrderItemComponent {
  @Input() order;

  constructor(
    public orderService: OrdersProvider
  ) {
  }

}
