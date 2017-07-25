import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from '@angular/http';

import { routing } from './orders.routing';
import { Orders } from './orders.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { SmartTablesService } from './components/smartTables/smartTables.service';
import { BlockForm } from './components/blockForm/blockForm.component';
import { DatePickerModule } from 'ng2-datepicker';
import { MomentModule } from 'angular2-moment';

import { OrderDetailsComponent } from './orderDetails/orderDetails.component';
import { JeanDetailsComponent } from './components/jeanDetails/jeanDetails.component';
import { OrderInfoComponent } from './components/orderInfo/orderInfo.component';
import { OrderInfoService } from './components/orderInfo/orderInfo.service';
import { OrderProfileComponent } from './components/orderProfile/orderProfile.component';
import { OrderTimelineComponent } from './components/orderTimeline/orderTimeline.component';
import { JeanDetailsEditComponent } from './components/jeanDetailsEdit/jeanDetailsEdit.component';
import {DataTableModule} from "angular2-datatable";
import {DataFilterPipe} from "./components/dataTables/data-filter.pipe";
import {DataTables} from "./components/dataTables/dataTables.component";
import {DataTablesService} from "./components/dataTables/dataTables.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    HttpModule,
    DatePickerModule,
    MomentModule,
    DataTableModule,
  ],
  declarations: [
    Orders,
    SmartTables,
    BlockForm,
    OrderDetailsComponent,
    JeanDetailsComponent,
    JeanDetailsEditComponent,
    OrderInfoComponent,
    OrderProfileComponent,
    OrderTimelineComponent,
    DataTables,
    DataFilterPipe,
  ],
  providers: [
    SmartTablesService,
    OrderInfoService,
    DataTablesService,
  ],
})
export class OrdersModule {
}
