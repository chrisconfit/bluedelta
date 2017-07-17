import { Injectable } from '@angular/core';
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../index";
import { Button } from "../../services/blue-delta-sdk/index";


@Injectable()
export class ButtonActions {
    /************ LIST ACTIONS ********************/
  static FETCH_BUTTONS_LIST_REQUEST         = 'FETCH_BUTTONS_LIST_REQUEST';
  static FETCH_BUTTONS_LIST_SUCCESS         = 'FETCH_BUTTONS_LIST_SUCCESS';
  static FETCH_BUTTONS_LIST_ERROR           = 'FETCH_BUTTONS_LIST_ERROR';
  static RECEIVE_BUTTONS_LIST               = 'RECEIVE_BUTTONS_LIST';
  static FETCH_BUTTONS_LIST_REQUEST_FINISH  = 'FETCH_BUTTONS_LIST_REQUEST_FINISH';
    /************ END LIST ACTIONS ****************/

    /************ DELETE ACTIONS ******************/
  static MARK_BUTTON_FOR_DELETION      = 'MARK_BUTTON_FOR_DELETION';
  static DELETE_BUTTON_REQUEST         = 'DELETE_BUTTON_REQUEST';
  static DELETE_BUTTON_SUCCESS         = 'DELETE_BUTTON_SUCCESS';
  static DELETE_BUTTON_ERROR           = 'DELETE_BUTTON_ERROR';
  static DELETE_BUTTON_REQUEST_FINISH  = 'DELETE_BUTTON_REQUEST_FINISH';
    /************ END DELETE ACTIONS **************/

    /************ CREATE ACTIONS ******************/
  static STAGE_BUTTON                       = 'STAGE_BUTTON';
  static SHOW_BUTTON_CREATE_FORM            = 'SHOW_BUTTON_CREATE_FORM';
  static CREATE_BUTTON_REQUEST              = 'CREATE_BUTTON_REQUEST';
  static CREATE_BUTTON_SUCCESS              = 'CREATE_BUTTON_SUCCESS';
  static CREATE_BUTTON_ERROR                = 'CREATE_BUTTON_ERROR';
  static CREATE_BUTTON_REQUEST_FINISH       = 'CREATE_BUTTON_REQUEST_FINISH';
  static RECEIVE_CREATED_BUTTON             = 'RECEIVE_CREATED_BUTTON';
    /************ END CREATE ACTIONS **************/

    /************ GET ONE ACTIONS *****************/
  static FETCH_ONE_BUTTON_REQUEST           = 'FETCH_ONE_BUTTON_REQUEST';
  static FETCH_ONE_BUTTON_SUCCESS           = 'FETCH_ONE_BUTTON_SUCCESS';
  static FETCH_ONE_BUTTON_ERROR             = 'FETCH_ONE_BUTTON_ERROR';
  static FETCH_ONE_BUTTON_REQUEST_FINISH    = 'FETCH_ONE_BUTTON_REQUEST_FINISH';
  static RECEIVE_BUTTON                     = 'RECEIVE_BUTTON';
    /************ END GET ONE ACTIONS *************/


    /************ EDIT ACTIONS ********************/
  static MARK_BUTTON_FOR_EDIT               = 'MARK_BUTTON_FOR_EDIT';
  static EDIT_BUTTON_REQUEST                = 'EDIT_BUTTON_REQUEST';
  static EDIT_BUTTON_SUCCESS                = 'EDIT_BUTTON_SUCCESS';
  static RECEIVE_EDITED_BUTTON              = 'RECEIVE_EDITED_BUTTON';
  static EDIT_BUTTON_ERROR                  = 'EDIT_BUTTON_ERROR';
  static EDIT_BUTTON_REQUEST_FINISH         = 'EDIT_BUTTON_REQUEST_FINISH';
    /************ END EDIT ACTIONS ****************/
    

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
  }


    fetchListRequest() {
        let action = {
            type: ButtonActions.FETCH_BUTTONS_LIST_REQUEST
        };
        this.ngRedux.dispatch(action);
    }
    fetchListSuccess(successResponse: any) {
        if (!successResponse) return;
        let action = {
            type: ButtonActions.FETCH_BUTTONS_LIST_SUCCESS
        };
        this.ngRedux.dispatch(action);
    }
    fetchListError(errorResponse: any) {
    if (!errorResponse) return;
    let action = {
        type: ButtonActions.FETCH_BUTTONS_LIST_ERROR,
        payload: errorResponse
    };
    this.ngRedux.dispatch(action);
    }
    receiveButtonsList(buttonsListResponse: Button[]) {
        let action = {
            type: ButtonActions.RECEIVE_BUTTONS_LIST,
            payload: buttonsListResponse
        };
        this.ngRedux.dispatch(action);
    }
    fetchListRequestFinish() {
        let action = {
            type: ButtonActions.FETCH_BUTTONS_LIST_REQUEST_FINISH
        };
        this.ngRedux.dispatch(action);
    }






    markForDeletion(idOfButtonToDelete: string) {
        let action = {
            type: ButtonActions.MARK_BUTTON_FOR_DELETION,
            payload: idOfButtonToDelete
        };
        this.ngRedux.dispatch(action);
    }
    deleteRequest(idOfButtonToDelete: string) {
        let action = {
            type: ButtonActions.DELETE_BUTTON_REQUEST,
            payload: idOfButtonToDelete
        };
        this.ngRedux.dispatch(action);
    }
    deleteSuccess(successResponse: any) {
        if (!successResponse) return;
        let action = {
            type: ButtonActions.DELETE_BUTTON_SUCCESS
        };
        this.ngRedux.dispatch(action);
    }
    deleteError(errorResponse: any) {
        if (!errorResponse) return;
        let action = {
            type: ButtonActions.DELETE_BUTTON_ERROR
        };
        this.ngRedux.dispatch(action);
    }
    deleteRequestFinish():void {
        let action = {
            type: ButtonActions.DELETE_BUTTON_REQUEST_FINISH
        };
        this.ngRedux.dispatch(action);
    }




    stageButton(button: Button) {
        let action = {
            type: ButtonActions.STAGE_BUTTON,
            payload: button
        };
        this.ngRedux.dispatch(action);
    }
    showButtonCreateForm(bool: boolean) {
        let action = {
            type: ButtonActions.SHOW_BUTTON_CREATE_FORM,
            payload: bool
        };
        this.ngRedux.dispatch(action);
    }
    createRequest(stagedButton: Button) {
        let action = {
            type: ButtonActions.CREATE_BUTTON_REQUEST,
            payload: stagedButton
        };
        this.ngRedux.dispatch(action);
    }
    createSuccess(successResponse: any) {
        let action = {
            type: ButtonActions.CREATE_BUTTON_SUCCESS,
            payload: successResponse
        };
        this.ngRedux.dispatch(action);
    }
    createError(errorResponse: any) {
        let action = {
            type: ButtonActions.CREATE_BUTTON_ERROR,
            payload: errorResponse
        };
        this.ngRedux.dispatch(action);
    }
    createRequestFinish():void {
        let action = {
            type: ButtonActions.CREATE_BUTTON_REQUEST_FINISH
        };
        this.ngRedux.dispatch(action);
    }
    receiveCreatedButton(buttonFromServer: Button) {
        let action = {
            type: ButtonActions.RECEIVE_CREATED_BUTTON,
            payload: buttonFromServer
        };
        this.ngRedux.dispatch(action);
    }
/*************************************************
    =====\\
  //      \\
 //
||
||
||      ========  
 \\        ||
  \\      //
    ======

****************************************************/


    fetchOneRequest(buttonId: string) {
        if (!buttonId) return;
        let action = {
            type: ButtonActions.FETCH_ONE_BUTTON_REQUEST,
            payload: buttonId
        };
        this.ngRedux.dispatch(action);
    }
    fetchOneSuccess(button: Button) {
        if (!button) return;
        let action = {
            type: ButtonActions.FETCH_ONE_BUTTON_SUCCESS,
            payload: button
        };
        this.ngRedux.dispatch(action);
    }
    fetchOneError(err: any) {
        if (!err) return;
        let action = {
            type: ButtonActions.FETCH_ONE_BUTTON_ERROR,
            payload: err
        };
        this.ngRedux.dispatch(action);
    }
    fetchOneRequestFinish() {
        let action = {
            type: ButtonActions.FETCH_ONE_BUTTON_REQUEST_FINISH
        };
        this.ngRedux.dispatch(action);
    }
    receiveButton(button: Button) {
        if (!button) return;
        let action = {
            type: ButtonActions.RECEIVE_BUTTON,
            payload: button
        };
        this.ngRedux.dispatch(action);
    }



/*************************************************

========    =====       ========    ========
||          ||   \\        ||          ||
||          ||    ||       ||          ||
||====      ||    ||       ||          ||
||          ||    ||       ||          ||
||          ||   //        ||          ||
=========   ====//      ========       ||

****************************************************/

    markForEdit(buttonId: string) {
        let action = {
            type: ButtonActions.MARK_BUTTON_FOR_EDIT,
            payload: buttonId
        };
        this.ngRedux.dispatch(action);
    }

    editRequest(buttonId: string):void {
        let action = {
            type: ButtonActions.EDIT_BUTTON_REQUEST,
            payload: buttonId
        };
        this.ngRedux.dispatch(action);
    }
    editSuccess(data: any):void {
        if (!data) return;
        let action = {
            type: ButtonActions.EDIT_BUTTON_SUCCESS,
            payload: data
        };
        this.ngRedux.dispatch(action);
    }
    editError(err: any) {
        if (!err) return;
        let action = {
            type: ButtonActions.EDIT_BUTTON_ERROR,
            payload: err
        };
        this.ngRedux.dispatch(action);
    }
    receiveEditedButton(editedButton) {
        let action = {
            type: ButtonActions.RECEIVE_EDITED_BUTTON,
            payload: editedButton
        };
        this.ngRedux.dispatch(action);
    }
    editRequestFinish() {
        let action = {
            type: ButtonActions.EDIT_BUTTON_REQUEST_FINISH
        };
        this.ngRedux.dispatch(action);
    }
    

}
