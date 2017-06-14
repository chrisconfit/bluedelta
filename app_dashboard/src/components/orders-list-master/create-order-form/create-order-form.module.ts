import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateOrderFormComponent } from './create-order-form';

@NgModule({
  declarations: [
    CreateOrderFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(CreateOrderFormComponent),
  ],
  exports: [
    CreateOrderFormComponent
  ]
})
export class CreateOrderFormComponentModule {}
