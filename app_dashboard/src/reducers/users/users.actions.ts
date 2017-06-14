import { Injectable } from '@angular/core';
import { NgRedux } from "@angular-redux/store";
import { IAppState } from '../index';

@Injectable()
export class UsersActions {

  
  static SET_CURRENT_USER_NAME  = 'SET_CURRENT_USER_NAME';
  static SET_CURRENT_USER_ID    = 'SET_CURRENT_USER_ID';
  static SET_CODE_SUBMIT_BOOL   = 'SET_CODE_SUBMIT_BOOL';
  static SIGN_UP_FORM_SUBMITTED = 'SIGN_UP_FORM_SUBMITTED';

  constructor(private ngRedux: NgRedux<IAppState>) {    
  }

  

  setCurrentUserName(currentUserName) {
    let action = {
      type: UsersActions.SET_CURRENT_USER_NAME,
      payload: currentUserName
    };
    this.ngRedux.dispatch(action);
  }

  setCurrentUserId(globalUserId: string|null) {
    let action = {
      type: UsersActions.SET_CURRENT_USER_ID,
      payload: globalUserId
    };
    this.ngRedux.dispatch(action);
  }

  confirmationCodeSubmitted(bool: boolean) {
    let action = {
      type: UsersActions.SET_CODE_SUBMIT_BOOL,
      payload: bool
    };
    this.ngRedux.dispatch(action);
  }

  signUpFormSubmitted(bool: boolean) {
    let action = {
      type: UsersActions.SIGN_UP_FORM_SUBMITTED,
      payload: bool
    };
    this.ngRedux.dispatch(action);
  }


}
