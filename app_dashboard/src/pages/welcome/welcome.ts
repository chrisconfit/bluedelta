import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalStateService } from "../../services/global-state.service";
import { AccountSigninPage } from "../account-signin/account-signin";
import { AccountSignupPage } from "../account-signup/account-signup";
import { ResourceProvider } from "../../providers/resource/resource.provider";

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  accountSigninPage = AccountSigninPage;
  accountSignupPage = AccountSignupPage;

  constructor(
    public navCtrl: NavController,
    public globals: GlobalStateService,
    public resourceService: ResourceProvider) {
  }

  ionViewWillEnter() {
    if (!this.resourceService.ngRedux.getState().users.currentUserId) return;
    this.resourceService.loadButtonsWithAuth();
  }


}
