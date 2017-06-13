import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OrdersPage } from '../pages/orders/orders';
import { CustomersPage } from '../pages/customers/customers';
import { VendorsPage } from "../pages/vendors/vendors";
import { AdminsPage } from "../pages/admins/admins";
import { ProfilePage } from "../pages/profile/profile";


import { NgRedux, DevToolsExtension } from "@angular-redux/store";
import { IAppState, rootReducer, INITIAL_STATE } from "../reducers/index";
import { BottomTabsPage } from "../pages/bottom-tabs/bottom-tabs";
import { ResourceProvider } from "../providers/resource/resource.provider";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = OrdersPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    public resourceService: ResourceProvider) {
      
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    ngRedux.configureStore(
        rootReducer,
        INITIAL_STATE,
        null,
        devTools.isEnabled() ? [ devTools.enhancer() ] : []);

            // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Orders',    component: OrdersPage },
      { title: 'Customers', component: CustomersPage },
      { title: 'Vendors',   component: VendorsPage },
      { title: 'Admins',    component: AdminsPage },
      { title: 'Profile',   component: ProfilePage },
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}








  

  

  

  
    


    

  

  

  

