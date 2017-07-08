import {Component, Input, EventEmitter, Output, AfterViewInit} from '@angular/core';
import { OrderInfoService } from './orderInfo.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
declare var moment: any;

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
      jeanDob: '07/01/2017',
    },
  ];

  date: DateModel;
  options: DatePickerOptions;
  jeanDobDate;
  fittingDate;
  dueDate;


  public arrayOfKeys;

  constructor() {
    this.arrayOfKeys = Object.keys(this.orderInfoService);
    this.options = new DatePickerOptions({format: 'MM-DD-YYYY'});
    // TODO: use this to set the current date values on the order info panel...
    var dateModel:DateModel = new DateModel();
    var momentObj = moment('07-19-2017', 'MM-DD-YYYY');
    dateModel.formatted = momentObj.format('MM-DD-YYYY');
    this.jeanDobDate = dateModel;

    var fittingDateModel:DateModel = new DateModel();
    var momentObj = moment('07-02-2017', 'MM-DD-YYYY');
    fittingDateModel.formatted = momentObj.format('MM-DD-YYYY');
    this.fittingDate = fittingDateModel;

    var dueDateModel:DateModel = new DateModel();
    var momentObj = moment('07-10-2017', 'MM-DD-YYYY');
    dueDateModel.formatted = momentObj.format('MM-DD-YYYY');
    this.dueDate = dueDateModel;
  }

  saveOrder() {
    // TODO: get form values and submit to api
  }

  ngAfterViewInit() {
    document.getElementById('jeanPrice').setAttribute('value', this.orderInfoService[0].jeanPrice);
    // TODO: select dropdown values based on current order info from api
  }
}
