import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from "@angular/http";

import { routing } from './customers.routing';
import { Customers } from './customers.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { SmartTablesService } from './components/smartTables/smartTables.service';
import { BlockForm } from './components/blockForm/blockForm.component';
import { DataTables } from './components/dataTables/dataTables.component';
import { DataTablesService } from './components/dataTables/dataTables.service';
import { DataTableModule } from "angular2-datatable";
import { DataFilterPipe } from './components/dataTables/data-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    HttpModule,
    DataTableModule,
  ],
  declarations: [
    Customers,
    SmartTables,
    BlockForm,
    DataTables,
    DataFilterPipe,
  ],
  providers: [
    SmartTablesService,
    DataTablesService,
  ]
})
export class CustomersModule {
}
