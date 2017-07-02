import { Component } from '@angular/core';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
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
      id: {
        title: 'ID',
        type: 'number'
      },
      customer: {
        title: 'Customer',
        type: 'string'
      },
      vendor: {
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
      },
      Actions: //or something
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

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: SmartTablesService) {
    this.service.getData().then((data) => {
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
