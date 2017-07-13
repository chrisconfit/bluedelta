import { Component, Input } from '@angular/core';
import {OrdersProvider} from "../../../../../providers/orders/orders";

@Component({
  selector: 'edit-order-form',
  templateUrl: 'edit-order-form.html'
})
export class EditOrderFormComponent {
  @Input() order;

  constructor(
    public orderService: OrdersProvider
  ) {
  }

}
