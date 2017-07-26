import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {
  IUserLogin,
  UserLoginService,
  CognitoUtil,
  UserState,
  UserRegistrationService
} from '../services/account-management.service';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import {UsersProvider} from "../providers/users/users";
import {CustomAuthorizerClient, UserPoolsAuthorizerClient} from "../services/blue-delta-api.service";
import {HttpService} from "../services/http-service";
import {OrdersProvider} from "../providers/orders/orders";


// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,

];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    CognitoUtil,
    UserLoginService,
    UsersProvider,
    OrdersProvider,
    CustomAuthorizerClient,
    HttpService,
    UserPoolsAuthorizerClient,

  ]
})

export class AppModule {

  constructor(
    public appState: AppState,
    public userService: UsersProvider,
    public orderService: OrdersProvider,
  ) {
    // this.userService.loadItemsWithAuth();
    // this.orderService.loadItemsWithAuth();
  }
}
