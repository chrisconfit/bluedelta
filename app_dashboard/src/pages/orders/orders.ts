import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ResourceProvider } from "../../providers/resource/resource.provider";
import { AccountSignupPage } from "../account-signup/account-signup";
import { AccountSigninPage } from "../account-signin/account-signin";
import { GlobalStateService } from "../../services/global-state.service";
import {OrdersProvider} from "../../providers/orders/orders";

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  accountSignupPage = AccountSignupPage;
  accountSigninPage = AccountSigninPage;


  constructor(
    public globals: GlobalStateService,
    public navCtrl: NavController,
    public resourceService: ResourceProvider,
    public orderService: OrdersProvider
    ) {

  }

  

}
