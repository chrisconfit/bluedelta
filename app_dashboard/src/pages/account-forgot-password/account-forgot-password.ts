import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalStateService } from "../../services/global-state.service";
import { CognitoUtil, UserLoginService } from "../../services/account-management.service";
import { ResourceProvider } from "../../providers/resource/resource.provider";
import { Logger } from "../../services/logger.service";

@Component({
  selector: 'page-account-forgot-password',
  templateUrl: 'account-forgot-password.html',
})
export class AccountForgotPasswordPage {

  formData: {
    verificationCode?: string,
    password?: string
  } = {};

  submitted: boolean = false;

  constructor(
    public navCtrl: NavController,
    private globals: GlobalStateService,
    public resourceService: ResourceProvider) {
  }

  onSubmit(form) {
    this.submitted = true;

    if (form && form.valid) {
      console.log('Form User data' + this.formData);
      UserLoginService.confirmForgotPassword(CognitoUtil.getUsername(), this.formData.verificationCode, this.formData.password)
      .then(() => {
        console.log("Password successfully changed");
        this.showSuccessAlert();
      }).catch((err: Error) => {
        console.log('Forgot password request failed to initiate', err);
        this.showFailureAlert();
      });
    }
  }

  showSuccessAlert() {
    let alertController = this.resourceService.getAlertController();
    let alert = alertController.create({
      title: 'Password changed.',
      subTitle: 'Your password has been successfully changed. Please try signing in again with your new password.',
      buttons: [{
          text: 'Return to the Sign In screen',
          handler: data => {
            // go back to the Signin screen
            this.navCtrl.pop();
          }
        }]
    });
    alert.present();
  }

  showFailureAlert() {
    let alertController = this.resourceService.getAlertController();
    let alert = alertController.create({
      title: 'Error encountered',
      subTitle: 'There was a problem changing your password. Please try again.',
      buttons: [{
          text: 'Return to the Sign In screen',
          handler: data => {
            // go back to the Signin screen
            this.navCtrl.pop();
          }
        }]
    });
    alert.present();
  }



  ionViewDidEnter() {
    Logger.banner("Forgot Password");
  }


}
