import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalStateService } from '../../services/global-state.service';
import { AccountSigninPage } from '../account-signin/account-signin';
import { AccountSignupPage } from '../account-signup/account-signup';
import { ButtonAddPage } from '../button-add/button-add';
import { Button } from "../../services/blue-delta-sdk/model/Button";
import { UserLoginService } from "../../services/account-management.service";
import { CustomAuthorizerClient, NoAuthorizationClient, UserPoolsAuthorizerClient } from "../../services/blue-delta-api.service";
import { Config }             from '../../config/config'
import { Logger } from '../../services/logger.service';

declare const AWS: any;

@Component({
  templateUrl: 'button-list.html',
})
export class ButtonListPage {

  initialized = false;
  accountSigninPage = AccountSigninPage;
  accountSignupPage = AccountSignupPage;
  buttonAddPage = ButtonAddPage;
  buttons: Button[] = [];
  // resourceListPage = ResourceListPage;

  displayDeleteButtonConfirmation(buttonId, buttonName) {
    console.log("Deleting buttonID " + buttonId);

    let confirm = this.globals.getAlertController().create({
      title: 'Delete button?',
      message: `Are you sure you want to delete [<b>${buttonName}</b>]? All resources and bookings associated with [<b>${buttonName}</b>] will also be deleted!`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => { /* do nothing */ }
        },
        {
          text: 'OK',
          handler: () => {
            this.deleteButton(buttonId)
            .then(() => {
              this.globals.dismissLoader();
              this.globals.displayToast(`Button [${buttonName}] has been successfully deleted`);
            })
            .catch((err) => {
              this.globals.dismissLoader();
              this.globals.displayAlert('Error encountered',
                'Delete failed. Please check the console logs for more information.');
              console.log(err);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  deleteButton(buttonId): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // delete from the database
      this.globals.displayLoader("Deleting...");
      this.customAuthClient.getClient().buttonsDelete(buttonId).subscribe(
        () => {
          // remove the item from the buttons array
          let index = this.buttons.findIndex( button => { return button.buttonId == buttonId});
          if (index > -1) {
            this.buttons.splice(index, 1);
          }
          resolve();
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  gotoResourceListPage(button) {
    // this.navCtrl.push(ResourceListPage, button);
  }

  loadButtonsWithAuth(): void {
    this.buttons = [];
    this.userPoolsAuthClient.getClient().buttonsList().subscribe(
      (data) => {
        // this.buttons = data.items
        // sort by name
        this.buttons = data.items.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        this.globals.dismissLoader();
        this.initialized = true;
      },
      (err) => {
        this.globals.dismissLoader();
        this.initialized = true; 
        console.error(err);
        this.globals.displayAlert('Error encountered',
          `An error occurred when trying to load the buttons. Please check the console logs for more information.`)
      }
    );
  };

  loadButtonsWithoutAuth(): void {
    this.buttons = [];
    this.noAuthClient.getClient().buttonsList().subscribe(
      (data) => {
        // this.buttons = data.items
        // sort by name
        this.buttons = data.items.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        this.globals.dismissLoader();
        this.initialized = true;
      },
      (err) => {
        this.globals.dismissLoader();
        this.initialized = true; 
        console.error(err);
        this.globals.displayAlert('Error encountered',
          `An error occurred when trying to load the buttons. Please check the console logs for more information.`)
      }
    );
  };


  constructor(private navCtrl: NavController,  public globals: GlobalStateService, private noAuthClient: NoAuthorizationClient, private customAuthClient: CustomAuthorizerClient, private userPoolsAuthClient: UserPoolsAuthorizerClient) {
  }
  ionViewDidEnter() {

    Logger.banner("Buttons");

    this.initialized = true;
    this.buttons = [];

    if (Config['DEVELOPER_MODE']) {
      this.initialized = false;
      
      if (UserLoginService.getAwsAccessKey() != null) {
      // if (CognitoUtil.getUserState() === UserState.SignedIn) {
        // console.log(AWS.config.credentials);
        UserLoginService.getAwsCredentials()
        .then(() => {
          this.globals.displayLoader("Loading...");
          this.loadButtonsWithAuth();
        })
        .catch((err) => {
          console.log("ERROR: Unable to load buttons!");
          console.log(err)
        })
      }
    }
  }

  ionViewDidLeave() {
    this.initialized = false;
    this.buttons = [];
  }

}
