import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersProvider } from '../../../../providers/orders/orders';


function storeOrderDetails(dataReceived) {
  window.localStorage.setItem('orderDetails', JSON.stringify(dataReceived));
}

@Component({
  selector: 'orderDetails',
  templateUrl: './orderDetails.html',
  styleUrls: ['./orderDetails.scss'],
})
export class OrderDetailsComponent {
  id: string;
  private sub: any;
  data;
  order;

  constructor(
    private route: ActivatedRoute,
    public orderService: OrdersProvider,
  ) {
    this.assignSub();
    this.grabData();
  }


  grabData() {
    this.data = this.orderService.list;
    this.order = this.getOrderById(this.data, this.orderService.idToViewDetails);
    console.log('Order ', this.order);
    this.orderService.orderToViewDetails = this.order;
  }

  getOrderById(list: any[], orderId: string) {
    return list.filter(v => v.orderId === orderId);
  }


  getOrderIndex(orderList: any[], item: any) {
    return orderList.indexOf(item);
  }

  assignSub() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  /*ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });

    debugger;
    var obj = this.data.filter(function ( obj ) {
      return obj.orderId === this.id.toString();
    })[0];
  }*/

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
