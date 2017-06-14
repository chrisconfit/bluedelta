import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { GlobalStateService } from "../../services/global-state.service";
import { AccountSignupPage } from "../account-signup/account-signup";
import { BottomTabsPage } from "../bottom-tabs/bottom-tabs";
import { IUserLogin, UserLoginService, CognitoUtil, UserState, UserRegistrationService } from "../../services/account-management.service";
import { Config } from "../../config/config";
import { AccountForgotPasswordPage } from "../account-forgot-password/account-forgot-password";
import { ResourceProvider } from "../../providers/resource/resource.provider";
import { UsersActions } from "../../reducers/users/users.actions";


@Component({
  selector: 'page-account-signin',
  templateUrl: 'account-signin.html',
})
export class AccountSigninPage {

  allowButtonPresses = true; // to prevent multiple clicks
  accountSignupPage = AccountSignupPage;
  accountForgotPasswordPage = AccountForgotPasswordPage;
  tabsPage = BottomTabsPage;
  alertCtrl : AlertController = this.resourceService.getAlertController();

  public userData: IUserLogin = {
    username: "user1",
    password: "Test123!"
  };

  signInButtonClicked: boolean = false;
  forgotPasswordButtonClicked: boolean = false;

  constructor(
    public navCtrl: NavController, 
    private globals: GlobalStateService, 
    public resourceService: ResourceProvider, 
    public userActions: UsersActions) {
  }

  onSignIn(form) {
    this.signInButtonClicked = true;
    this.forgotPasswordButtonClicked = false;

    if (form && form.valid) {
      this.login();
      this.resourceService.initialized = true;
    }
  }

  onForgotPassword(form) {
    if (!this.allowButtonPresses) {
      return;
    }
    // Check for a special exception:
    // Do not allow default users to change their passwords
    if (form && this.userData.username != null) {
      if (Config['DEFAULT_USERNAMES'].findIndex((el)=>{ return el === this.userData.username; }) > -1) {
        this.resourceService.displayAlert('Cannot reset passwords for default users',
          `The user [${this.userData.username}] is a default user. ` +
          `Passwords for default users cannot be reset.<br/><br/>Please try ` +
          'again using a username for a user that you have manually registered.');
        return;
      }
    }
    this.signInButtonClicked = false;
    this.forgotPasswordButtonClicked = true;
    this.allowButtonPresses = false;
    if (form && this.userData.username != null) {
      UserLoginService.forgotPassword(this.userData.username).then((data) => {
        // Forgot password request successfully initiated
        this.allowButtonPresses = true;
        console.log('Forgot password request process initiated. Email sent. Data from Cognito response:\n' + data);
        this.navCtrl.push(this.accountForgotPasswordPage);
      }).catch((err: Error) => {
        this.allowButtonPresses = true;
        // Forgot password request failed to initiate
        console.log('Forgot password request failed to initiate', err);
        this.showForgotPasswordFailureAlert(err);
      });
    }
  }

  // return a LoginStatus
  login(): void {
    // prevent multiple clicks
    if (!this.allowButtonPresses) {
      return;
    }
    this.allowButtonPresses = false;
    this.resourceService.displayLoader('Signing in...');
    UserLoginService.signIn(this.userData)
    .then(() => {
      // Login was successful
      this.resourceService.dismissLoader();
      this.showLoginSuccessAlert(this.userData.username, () => {
        this.userActions.setCurrentUserId(this.resourceService.getUserId());
        this.globals.setViewAdminFeaturesOverride(this.globals.isAdminRole());
        this.navCtrl.popToRoot({animate: false});
        // this.navCtrl.push(WelcomePage);
      });
    }).catch((err: Error): void => {
      // Login was unsuccessful
      this.resourceService.dismissLoader();
      this.allowButtonPresses = true;
      this.displayAlertError(err);
    });
  }

  displayAlertError(err: Error) {
    switch (CognitoUtil.getUserState()) {
    case UserState.InvalidCredentials:
      console.log('Sign-in failed: ' + err);
      let errorMessage = 'Incorrect username or password entered. Please try again.'
      this.showLoginFailureAlert(this.userData.username, errorMessage);
      break;
    case UserState.PendingConfirmation:
      // If a user has registered, but has not yet confirmed the registration code, then
      // display a dialog where he/she can input the verification code. Alternatively,
      // the user can request a new verification code be emailed.
      console.log('User has not confirmed verification code: ' + err);
      this.showOneTimeVerificationAlert(this.userData.username, () => {
        this.navCtrl.pop();
      });
      break;
    default:
      console.log('Sign-in failed: ' + err);
      errorMessage = `The login failed: ${err}`;
      this.showLoginFailureAlert(this.userData.username, errorMessage);
      break;
    }
  }

  showLoginSuccessAlert(username: String, callbackHandler: () => void): void {
    let subtitle = `You are now signed in.`;
    if (this.globals.isAdminRole()) {
      subtitle = `You are now signed as an Administrator.`
    }
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: subtitle,
      message: `Username: <b>${username}</b><br/>First name: <b>${this.resourceService.getUserFirstName()}</b><br/>Last name: <b>${this.resourceService.getUserLastName()}</b>`,
      buttons: [{
          text: 'OK',
          handler: data => {
            callbackHandler();
          }
        }]
    });
    alert.present();
  }

  showResendSuccessAlert(callbackHandler: () => void): void {
    let alert = this.alertCtrl.create({
      title: 'Verification code sent',
      subTitle: `A new verification code has been emailed to your account. Once you receive it, please try signing in again.`,
      buttons: [{
        text: 'OK',
        handler: data => { callbackHandler(); }
      }]
    });
    alert.present();
  }

  showOneTimeVerificationAlert(username: String, callbackHandler: () => void): void {
    let alert = this.alertCtrl.create({
      title: 'One-time verification',
      subTitle: `When you registered, a verification code was emailed to you. Please enter the code, and click "Verify". Or click "Re-send" to receive another code.`,
      inputs: [{
          name: 'verificationCode',
          placeholder: 'Verification code'
      }],
      buttons: [
        {
          text: 'Verify',
          handler: data => {
            UserRegistrationService.confirmSignUp(data.verificationCode)
            .then(() => {                
              UserLoginService.signIn(this.userData).then(() => {
                this.showLoginSuccessAlert(this.userData.username, () => {
                  this.userActions.setCurrentUserId(this.resourceService.getUserId());
                  this.navCtrl.popToRoot({animate: false});
                });
              }).catch((err: Error): void => {
                this.displayAlertError(err);
              });
            }).catch((err: Error) => {
              console.error(err);
              this.showConfirmationFailureAlert(err);
            });
          }
        },
        {
          text: 'Re-send',
          handler: data => {
            UserRegistrationService.resendConfirmationCode();
            this.showResendSuccessAlert(callbackHandler);
          }
        },
        { text: 'Cancel' },
        ]
    });
    alert.present();
  }

  showConfirmationFailureAlert(err: Error): void {
    let alert = this.alertCtrl.create({
      title: 'Verification failed',
      subTitle: err.message,
      buttons: [{ text: 'OK' }]
    });
    alert.present();
  }


  showLoginFailureAlert(username: String, message: String): void {
    let alert = this.alertCtrl.create({
      title: 'Login was unsuccessful',
      subTitle: `${message}`,
      buttons: [{ text: 'OK' }]
    });
    alert.present();
  }

  showForgotPasswordFailureAlert(err): void {
    let alert = this.alertCtrl.create({
      title: 'Error encountered',
      subTitle: `An error was encountered when attempting to initiate the password change process: [${err}]. Please try again.`,
      buttons: [{ text: 'OK' }]
    });
    alert.present();
  }
 
}
