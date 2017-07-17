import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { CognitoUtil, UserLoginService } from './account-management.service';
import { Logger } from './logger.service';
import { UsersActions } from "../reducers/users/users.actions";


@Injectable()
export class GlobalStateService {


  private viewAdminFeaturesOverride: boolean = false;
  // private loader = null;

  // this needs to be a variable in order to support two-way binding,
  // to refresh the Angular2 templates when this value changes
  

  constructor(
    public alertCtrl: AlertController, 
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController,
    public userActions: UsersActions) {
  }











  getViewAdminFeaturesOverride() {
    return this.viewAdminFeaturesOverride;
  }
  setViewAdminFeaturesOverride(setting : boolean): void {
    this.viewAdminFeaturesOverride = setting;
  }

  displayAdminFeatures(): boolean {
    return this.isAdminRole() || this.viewAdminFeaturesOverride;
  }


  isAdminRole(): boolean {
    return CognitoUtil.getUserGroup() == 'adminGroup';
  }



  logout(navController = null) {
    Logger.banner("Sign Out");
    this.showLogoutAlert();
    UserLoginService.signOut();
    this.userActions.setCurrentUserId(null);
    if (navController) {
      navController.popToRoot({animate: false});
    }
  }

  showLogoutAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Signed out',
      subTitle: 'You have signed out of the system.',
      buttons: [{
          text: 'OK',
        }]
    });
    alert.present();
  }


  displayToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
