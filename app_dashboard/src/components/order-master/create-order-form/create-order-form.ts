import { Component } from '@angular/core';
import { OrdersProvider } from "../../../providers/orders/orders";

@Component({
  selector: 'create-order-form',
  templateUrl: 'create-order-form.html'
})
export class CreateOrderFormComponent {

  constructor(
    public orderService: OrdersProvider
  ) {
  }

}
