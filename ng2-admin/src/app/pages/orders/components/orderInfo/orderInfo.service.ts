import {Injectable} from '@angular/core';

@Injectable()
export class OrderInfoService {

  orderInfoData = [
    {
      id: 1,
      jeanPrice: 'Marty McFly',
      vendor: 'Blue Delta',
      rep: 'James',
      orderType: 'Blue Delta',
      fittingDate: '07/01/2017',
      dueDate: '08/01/2017',
      jeanDob: '07/01/2017'
    },
  ];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.orderInfoData);
      }, 2000);
    });
  }
}
