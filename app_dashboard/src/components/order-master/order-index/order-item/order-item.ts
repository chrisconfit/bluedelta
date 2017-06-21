import {Component, Input} from '@angular/core';
import {OrdersProvider} from "../../../../providers/orders/orders";

/**
 * Generated class for the OrderItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'order-item',
  templateUrl: 'order-item.html'
})
export class OrderItemComponent {
  @Input() order;

  constructor(
    public orderService: OrdersProvider
  ) {
  }

}
