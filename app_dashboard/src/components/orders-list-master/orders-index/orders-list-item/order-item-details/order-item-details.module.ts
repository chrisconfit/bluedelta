import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderItemDetailsComponent } from './order-item-details';

@NgModule({
  declarations: [
    OrderItemDetailsComponent,
  ],
  imports: [
    IonicPageModule.forChild(OrderItemDetailsComponent),
  ],
  exports: [
    OrderItemDetailsComponent
  ]
})
export class OrderItemDetailsComponentModule {}
