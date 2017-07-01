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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    HttpModule
  ],
  declarations: [
    Customers,
    SmartTables,
    BlockForm
  ],
  providers: [
    SmartTablesService
  ]
})
export class CustomersModule {
}
