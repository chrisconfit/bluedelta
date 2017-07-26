import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OrdersProvider} from "../../../../../providers/orders/orders";

@Component({
  selector: 'orderProfile',
  templateUrl: './orderProfile.html',
  styleUrls: ['./orderProfile.scss']
})
export class OrderProfileComponent {
  @Input() data;

  private sub: any;
  orderDetails: any;

  constructor(private route: ActivatedRoute,
  public orderService: OrdersProvider) {
    this.orderDetails = this.orderService.orderToViewDetails[0];
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }
}
