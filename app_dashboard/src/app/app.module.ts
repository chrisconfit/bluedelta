import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { NgReduxModule } from '@angular-redux/store';

import { WelcomePage } from "../pages/welcome/welcome";
import { BottomTabsPage } from "../pages/bottom-tabs/bottom-tabs";
import { GlobalStateService } from "../services/global-state.service";
import { AccountSigninPage } from "../pages/account-signin/account-signin";
import { AccountSignupPage } from "../pages/account-signup/account-signup";
import { AccountConfirmationCodePage } from "../pages/account-confirmation-code/account-confirmation-code";
import { UserRegistrationService } from "../services/account-management.service";
import { AccountForgotPasswordPage } from "../pages/account-forgot-password/account-forgot-password";
import { NoAuthorizationClient, CustomAuthorizerClient, UserPoolsAuthorizerClient } from "../services/blue-delta-api.service";
import { HttpModule } from "@angular/http";
import { HttpService } from "../services/http-service";
import { ButtonItemComponent } from '../components/button-master/button-index/button-item/button-item';
import { ResourceProvider } from '../providers/resource/resource.provider';
import { ButtonActions } from "../reducers/buttons/buttons.actions";
import { UsersActions } from "../reducers/users/users.actions";
import { ButtonIndexComponent } from '../components/button-master/button-index/button-index';
import { ButtonMasterComponent } from '../components/button-master/button-master';
import { CreateButtonFormComponent } from '../components/button-master/create-button-form/create-button-form';
import { EditButtonFormComponent } from '../components/button-master/button-index/button-item/edit-button-form/edit-button-form';
import { ButtonItemDetailsComponent } from '../components/button-master/button-index/button-item/button-item-details/button-item-details';
import { ButtonItemButtonsComponent } from '../components/button-master/button-index/button-item/button-item-buttons/button-item-buttons';
import { ButtonItemImageComponent } from '../components/button-master/button-index/button-item/button-item-image/button-item-image';
import { VendorsPage } from "../pages/vendors/vendors";
import { ProfilePage } from "../pages/profile/profile";
import { AdminsPage } from "../pages/admins/admins";
import { OrdersIndexComponent } from '../components/orders-list-master/orders-index/orders-index';
import { OrdersListItemComponent } from '../components/orders-list-master/orders-index/orders-list-item/orders-list-item';
import { OrdersListMasterComponent } from '../components/orders-list-master/orders-list-master';
import { OrdersPage } from '../pages/orders/orders';
import { CustomersPage } from '../pages/customers/customers';
import { ButtonsProvider } from "../providers/buttons/buttons";
import { OrdersProvider } from "../providers/orders/orders";



@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    VendorsPage,
    ProfilePage,
    AdminsPage,
    OrdersPage,
    CustomersPage,
    BottomTabsPage,
    AccountSigninPage,
    AccountSignupPage,
    AccountConfirmationCodePage,
    AccountForgotPasswordPage,
    ButtonItemComponent,
    ButtonIndexComponent,
    ButtonMasterComponent,
    CreateButtonFormComponent,
    EditButtonFormComponent,
    ButtonItemDetailsComponent,
    ButtonItemButtonsComponent,
    ButtonItemImageComponent,
    OrdersIndexComponent,
    OrdersListItemComponent,
    OrdersListMasterComponent,
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    VendorsPage,
    ProfilePage,
    AdminsPage,
    OrdersPage,
    CustomersPage,
    BottomTabsPage,
    AccountSigninPage,
    AccountSignupPage,
    AccountConfirmationCodePage,
    AccountForgotPasswordPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalStateService,
    UserRegistrationService,
    NoAuthorizationClient,
    HttpService,
    CustomAuthorizerClient,
    UserPoolsAuthorizerClient,
    ResourceProvider,
    ButtonActions,
    UsersActions,
    ButtonsProvider,
    OrdersProvider
  ]
})
export class AppModule {}
