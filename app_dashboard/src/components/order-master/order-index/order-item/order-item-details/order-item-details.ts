import { Component, Input } from '@angular/core';


@Component({
  selector: 'order-item-details',
  templateUrl: 'order-item-details.html'
})
export class OrderItemDetailsComponent {
  @Input() order;

  constructor() {
  }

}
