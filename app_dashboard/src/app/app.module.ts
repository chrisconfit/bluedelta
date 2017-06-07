import { NgModule }                    from '@angular/core';
import { IonicApp, IonicModule }       from 'ionic-angular';
import { MyApp }                       from './app.component';
import { HttpModule }                  from "@angular/http";

import { AboutPage }                   from '../pages/about/about';
import { AccountConfirmationCodePage } from '../pages/account-confirmation-code/account-confirmation-code';
import { AccountChangePasswordPage }   from '../pages/account-change-password/account-change-password';
import { AccountForgotPasswordPage }   from '../pages/account-forgot-password/account-forgot-password';
import { AccountPage }                 from '../pages/account/account';
import { AccountSigninPage }           from '../pages/account-signin/account-signin';
import { AccountSigninUsingSAMLPage }  from '../pages/account-signin-using-saml/account-signin-using-saml';
import { AccountSignupPage }           from '../pages/account-signup/account-signup';
import { ButtonListPage }            from '../pages/button-list/button-list';
import { ButtonAddPage }             from '../pages/button-add/button-add';
import { TabsPage }                    from '../pages/tabs/tabs';
import { WelcomePage }                 from '../pages/welcome/welcome';
import { BrowserModule }               from "@angular/platform-browser";
import { HttpService }                 from "../services/http-service";
import {
  IamAuthorizerClient,
  CustomAuthorizerClient,
  UserPoolsAuthorizerClient,
  NoAuthorizationClient
} from "../services/blue-delta-api.service";
import { ButtonItemComponent } from '../components/button-item/button-item';

@NgModule({
  declarations: [
    AccountConfirmationCodePage,
    AccountChangePasswordPage,
    AccountForgotPasswordPage,
    AccountPage,
    AccountSigninPage,
    AccountSigninUsingSAMLPage,
    AccountSignupPage,
    ButtonAddPage,
    ButtonListPage,
    MyApp,
    TabsPage,
    WelcomePage,
    ButtonItemComponent
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(MyApp),
    BrowserModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AccountConfirmationCodePage,
    AccountChangePasswordPage,
    AccountForgotPasswordPage,
    AccountPage,
    AccountSigninPage,
    AccountSigninUsingSAMLPage,
    AccountSignupPage,
    ButtonAddPage,
    ButtonListPage,
    MyApp,
    TabsPage,
    WelcomePage,
  ],
  providers: [
    { provide: HttpService, useClass: HttpService },
    { provide: CustomAuthorizerClient, useClass: CustomAuthorizerClient },
    { provide: IamAuthorizerClient, useClass: IamAuthorizerClient },
    { provide: UserPoolsAuthorizerClient, useClass: UserPoolsAuthorizerClient },
    { provide: NoAuthorizationClient, useClass: NoAuthorizationClient },
  ]
})
export class AppModule {}
