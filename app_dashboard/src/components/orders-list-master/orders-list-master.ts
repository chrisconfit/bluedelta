import { Component } from '@angular/core';
import { OrdersIndexComponent } from './orders-index/orders-index';
import { OrdersProvider } from "../../providers/orders/orders";

@Component({
  selector: 'orders-list-master',
  templateUrl: 'orders-list-master.html'
})
export class OrdersListMasterComponent {

  

  constructor(
    public orderService: OrdersProvider
  ) {
    
  }

  
}
