import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditOrderFormComponent } from './edit-order-form';

@NgModule({
  declarations: [
    EditOrderFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(EditOrderFormComponent),
  ],
  exports: [
    EditOrderFormComponent
  ]
})
export class EditOrderFormComponentModule {}
