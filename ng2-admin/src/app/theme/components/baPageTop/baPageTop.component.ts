import {Component, OnInit} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {
  IUserLogin,
  UserLoginService,
  CognitoUtil,
  UserState,
  UserRegistrationService
} from '../../../../services/account-management.service';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  currentUsername: string;

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  signOut() {
    UserLoginService.signOut();
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  ngOnInit() {
    this.currentUsername = CognitoUtil.getUsername();
  }
}
