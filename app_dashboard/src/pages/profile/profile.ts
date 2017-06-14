import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { AccountConfirmationCodePage } from '../account-confirmation-code/account-confirmation-code';
import { AccountForgotPasswordPage } from '../account-forgot-password/account-forgot-password';
import { AccountSigninPage } from '../account-signin/account-signin';
import { AccountSignupPage } from '../account-signup/account-signup';
import { ResourceProvider } from "../../providers/resource/resource.provider";



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  confirmationCodePage = AccountConfirmationCodePage;
  forgotPasswordPage = AccountForgotPasswordPage;
  signInPage = AccountSigninPage;
  signUpPage = AccountSignupPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public resourceService: ResourceProvider) {
  }

  presentModal(page) {
    let modal = this.modalCtrl.create(page);
    modal.present();
  }
  

}



