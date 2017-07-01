import { Routes, RouterModule } from '@angular/router';

import { Orders } from './orders.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { BlockForm } from './components/blockForm/blockForm.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Orders,
    children: [
      { path: 'list', component: SmartTables },
      { path: 'new', component: BlockForm }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
