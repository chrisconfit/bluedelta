import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserRegistrationService } from "../../services/account-management.service";
import { GlobalStateService } from "../../services/global-state.service";
import { ResourceProvider } from "../../providers/resource/resource.provider";
import { UsersActions } from "../../reducers/users/users.actions";

@Component({
  selector: 'page-account-confirmation-code',
  templateUrl: 'account-confirmation-code.html',
})
export class AccountConfirmationCodePage {

  

  public registrationCode = {
    code: undefined
  };

  constructor(
    private navCtrl: NavController, 
    private alertCtrl: AlertController, 
    private globals: GlobalStateService, 
    public resourceService: ResourceProvider,
    public userActions: UsersActions) {
  }

  confirmSignUp(form) {
    this.userActions.confirmationCodeSubmitted(true);
    if (form && form.valid) {
      UserRegistrationService.confirmSignUp(this.registrationCode.code.toString())
      .then(() => {
        this.showConfirmationSuccessAlert();
      }).catch((err: Error) => {
        console.error(err);
        this.showConfirmationFailureAlert(err);
      });
    }
  }

  showConfirmationSuccessAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: `You are now successfully registered! You can now sign-in using your username/password.`,
      buttons: [{
          text: 'OK',
          handler: data => {
            this.navCtrl.popToRoot({animate: false});
          }
        }]
    });
    alert.present();
  }

  showConfirmationFailureAlert(err: Error): void {
    let alert = this.alertCtrl.create({
      title: 'Verification failed',
      subTitle: err.message,
      buttons: [{
          text: 'OK',
        }]
    });
    alert.present();
  }



}
