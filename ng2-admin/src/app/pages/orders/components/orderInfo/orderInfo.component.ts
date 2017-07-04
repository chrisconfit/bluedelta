import {Component, Input, EventEmitter, Output, AfterViewInit} from '@angular/core';
import { OrderInfoService } from './orderInfo.service';

@Component({
  selector: 'orderInfo',
  templateUrl: './orderInfo.html',
  styleUrls: ['./orderInfo.scss']
})
export class OrderInfoComponent {
  @Input() title:any;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  orderInfoService = [
    {
      id: 1,
      jeanPrice: '299.95',
      vendor: 'Blue Delta',
      rep: 'James',
      orderType: 'Blue Delta',
      fittingDate: '07/01/2017',
      dueDate: '08/01/2017',
      jeanDob: '07/01/2017'
    }
    ];

  public arrayOfKeys;

  constructor() {
    this.arrayOfKeys = Object.keys(this.orderInfoService);
  }

  onClick() {
    console.log('clicked');
    //this.notify.emit('Click from nested component');
  }

  ngAfterViewInit() {
    console.log('loaded');
    document.getElementById('jeanPrice').setAttribute('value', this.orderInfoService[0].jeanPrice);
  }
}
