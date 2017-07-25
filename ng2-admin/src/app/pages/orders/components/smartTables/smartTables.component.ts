import { Component } from '@angular/core';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import {OrdersProvider} from "../../../../../providers/orders/orders";

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  //styleUrls: ['./smartTables.scss']
})
export class SmartTables {

  query: string = '';

  settings = {
    mode: 'external',
    pager: {
      perPage: 20
    },
    actions: false,
    columns: {
      orderId: {
        title: 'Order ID',
        type: 'string'
      },
      userId: {
        title: 'Customer ID',
        type: 'string'
      },
      /*vendor: {
        title: 'Vendor',
        type: 'string'
      },
      rep: {
        title: 'Rep',
        type: 'string'
      },
      orderDate: {
        title: 'Order Date',
        type: 'string'
      },
      orderStatus: {
        title: 'Order Status',
        type: 'string'
      },
      paymentStatus: {
        title: 'Payment Status',
        type: 'string'
      },*/
      Actions:
        {
          title:'Order Details',
          type:'html',
          valuePrepareFunction:(cell,row)=>{
            return `<a class="details-link" title="Order Details" href="/#/pages/orders/details/${row.id}">View <span>&rsaquo;&rsaquo;</span></a>`
          },
          filter:false
        },
    }
  };

  tableData: LocalDataSource = new LocalDataSource();

  constructor(
    public orderService: OrdersProvider,
  ) {
    console.log('Service LIST: ', this.orderService.loadItemsWithAuth());
    // this.loadUsers();
    // this.tableData.load(this.orderService.loadItemsWithAuth());
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
