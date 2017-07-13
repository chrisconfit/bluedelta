import { Component } from '@angular/core';
import {OrdersProvider} from "../../providers/orders/orders";

@Component({
  selector: 'order-master',
  templateUrl: 'order-master.html'
})
export class OrderMasterComponent {


  constructor(
    public orderService: OrdersProvider
  ) {
  }

}
