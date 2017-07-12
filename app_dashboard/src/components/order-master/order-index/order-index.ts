import { Component } from '@angular/core';
import { OrdersProvider } from '../../../providers/orders/orders';

@Component({
  selector: 'order-index',
  templateUrl: 'order-index.html'
})
export class OrderIndexComponent {

  constructor(
    public orderService: OrdersProvider
  ) {
  }

}
