import { Component, OnInit } from '@angular/core';
import {OrdersProvider} from "../../../../../providers/orders/orders";

@Component({
  selector: 'data-tables',
  templateUrl: './dataTables.html',
  styleUrls: ['./dataTables.scss']
})
export class DataTables {

    data;
    filterQuery = "";
    rowsOnPage = 10;
    sortBy = "orderId";
    sortOrder = "asc";

    constructor(
      public orderService: OrdersProvider,
    ) {
    this.data = this.orderService.list;
  }

  viewDetailsOfOrder(orderId: string) {
    this.orderService.idToViewDetails = orderId;
    this.orderService.setOrderToView(orderId);
  }

    toInt(num: string) {
        return +num;
    }

    sortByWordLength = (a: any) => {
        return a.city.length;
    }

}
