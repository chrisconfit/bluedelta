import { Routes, RouterModule } from '@angular/router';

import { Customers } from './customers.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { BlockForm } from './components/blockForm/blockForm.component';
import {DataTables} from "./components/dataTables/dataTables.component";

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Customers,
    children: [
      // { path: 'list', component: SmartTables },
      { path: 'list', component: DataTables },
      { path: 'new', component: BlockForm }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
