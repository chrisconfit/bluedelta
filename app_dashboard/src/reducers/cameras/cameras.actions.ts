import { Injectable } from '@angular/core';
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../index";


@Injectable()
export class CameraActions {

  static REQUEST_START = 'UPDATE_REQUEST_START';
  static REQUEST_END = 'UPDATE_REQUEST_END';
  static RECEIVE_RESPONSE_SUCCESS = 'UPDATE_RECEIVE_RESPONSE_SUCCESS';
  static RECEIVE_RESPONSE_ERROR = 'UPDATE_RECEIVE_RESPONSE_ERROR';

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  requestInProgress(boolean: boolean) {
    let action = {
      type: (boolean) ? CameraActions.REQUEST_START : CameraActions.REQUEST_END,
      payload: boolean
    };
    this.ngRedux.dispatch(action);
  }


  receiveResponse(response) {
    let action = {
      type: (response.status) ? CameraActions.RECEIVE_RESPONSE_SUCCESS : CameraActions.RECEIVE_RESPONSE_ERROR,
      payload: response
    };
    this.ngRedux.dispatch(action);
  }

}
