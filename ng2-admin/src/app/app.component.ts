import { Component, ViewContainerRef, OnInit, enableProdMode } from '@angular/core';
import * as $ from 'jquery';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
import {Router} from '@angular/router';
import {
  IUserLogin,
  UserLoginService,
  CognitoUtil,
  UserState,
  UserRegistrationService
} from '../services/account-management.service';
if (window.location.href.indexOf('localhost') === 0) {
  enableProdMode();
}

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  template: `
    <main [class.menu-collapsed]="isMenuCollapsed" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  parentRouter: Router;
  isMenuCollapsed: boolean = false;

  constructor(
    private _state: GlobalState,
    private _imageLoader: BaImageLoaderService,
    private _spinner: BaThemeSpinner,
    private viewContainerRef: ViewContainerRef,
    private themeConfig: BaThemeConfig,
    public userService: UserLoginService,
    public cognito: CognitoUtil,
    public _router: Router,
  ) {
    this.parentRouter = _router;
    themeConfig.config();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  ngOnInit() {
    console.log('AppComponent: Checking if the user is already authenticated');
    let state = CognitoUtil.getUserState();
    if(state !== 1) {
      console.log('Not logged in!');
      this.parentRouter.navigateByUrl('/login');
    } else {
      console.log('Logged In');
    }
  }
}
