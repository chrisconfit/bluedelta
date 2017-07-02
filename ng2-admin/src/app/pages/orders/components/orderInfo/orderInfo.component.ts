import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OrderInfoService } from './orderInfo.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'orderInfo',
  //template: `<strong>Order Details for Order {{id}}</strong>`,
  templateUrl: './orderInfo.html',
  styleUrls: ['./orderInfo.scss']
})
export class OrderInfoComponent {
  id: number;
  private sub: any;

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: OrderInfoService, private route: ActivatedRoute) {
    this.service.getData().then((data) => {
      this.source.load(data);
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
