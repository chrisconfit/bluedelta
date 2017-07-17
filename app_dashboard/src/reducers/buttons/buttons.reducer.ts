import { Action } from 'redux';
import { ButtonActions } from './buttons.actions'
import { Button } from "../../services/blue-delta-sdk/index";

export interface IButtonState {
  list: Button[];
  buttonInCreation: boolean;
  buttonInEdit: string|null;
  buttonMarkedForDelete: string|null;
  stagedButton: Button|null;
  itemBeingFetched: string|null;
  request: {
      timeStarted: Date|null;
      timeFinished: Date|null;
      status: string|null;
      whichResource: string|null;
      errorMessage: any|null;
      type: string|null;
  };
}

export const BUTTONS_INITIAL_STATE: IButtonState = {
  list: [],
  buttonInCreation: false,
  buttonInEdit: null,
  buttonMarkedForDelete: null,
  stagedButton: null,
  itemBeingFetched: null,
  request: {
      timeStarted: null,
      timeFinished: null,
      status: null,
      whichResource: null,
      errorMessage: null,
      type: null
  }
};

// TODO, find the default type for Action so I don't have to do the stupid union workaround

export function buttonsReducer(state: IButtonState = BUTTONS_INITIAL_STATE, action: Action|any): IButtonState {
  switch (action.type) {

        /************ LIST ACTIONS ********************/
    case ButtonActions.FETCH_BUTTONS_LIST_REQUEST:
        return { ...state, request: { ...state.request, timeStarted: new Date(), status: 'IN_PROGRESS', whichResource: 'BUTTONS_LIST', errorMessage: null }};
    case ButtonActions.FETCH_BUTTONS_LIST_SUCCESS:
        return { ...state, request: { ...state.request, timeStarted: null, timeFinished: new Date(), status: 'SUCCESS', whichResource: 'BUTTONS_LIST', errorMessage: null }};
    case ButtonActions.FETCH_BUTTONS_LIST_ERROR:
        return { ...state, request: { ...state.request, timeStarted: null,timeFinished: new Date(), status: 'ERROR', whichResource: 'BUTTONS_LIST', errorMessage: action.payload }};
    case ButtonActions.RECEIVE_BUTTONS_LIST:
        return { ...state, list: [ ...state.list, ...action.payload ].filter(v => action.payload.indexOf(v) !== -1), request: { ...state.request, timeStarted: null, timeFinished: null, status: null, whichResource: null, errorMessage: null }};
        /************ END LIST ACTIONS ****************/
  

        /************ DELETE ACTIONS ******************/
    case ButtonActions.MARK_BUTTON_FOR_DELETION:
        return { ...state, buttonMarkedForDelete: action.payload };
    case ButtonActions.DELETE_BUTTON_REQUEST:
        return { ...state, request: { ...state.request, timeStarted: new Date(), timeFinished: null, status: 'IN_PROGRESS', whichResource: `BUTTON ${action.payload}`, errorMessage: null }};
    case ButtonActions.DELETE_BUTTON_SUCCESS:
        return { ...state, list: [ ...state.list ].filter(v => v.buttonId !== state.buttonMarkedForDelete), request: { ...state.request, status: 'SUCCESS' }};
    case ButtonActions.DELETE_BUTTON_ERROR:
        return { ...state, request: { ...state.request, status: 'ERROR', errorMessage: action.payload }};
    case ButtonActions.DELETE_BUTTON_REQUEST_FINISH:
        return { ...state, buttonMarkedForDelete: null, request: { ...state.request, timeStarted: null, timeFinished: new Date(), status: null, whichResource: null, errorMessage: null }};
        /************ END DELETE ACTIONS **************/


        /************ CREATE ACTIONS ******************/
    case ButtonActions.STAGE_BUTTON:
        return { ...state, stagedButton: action.payload };
    case ButtonActions.SHOW_BUTTON_CREATE_FORM:
        return { ...state, buttonInCreation: action.payload }
    case ButtonActions.CREATE_BUTTON_REQUEST:
        return { ...state, list: [ ...state.list, action.payload ] , request: { ...state.request, timeStarted: new Date(), timeFinished: null, status: 'IN_PROGRESS', whichResource: `BUTTON ${action.payload}` }};
    case ButtonActions.CREATE_BUTTON_SUCCESS:
        return { ...state, stagedButton: { ...state.stagedButton, buttonId: null }, request: { ...state.request, status: 'SUCCESS' } };
    case ButtonActions.RECEIVE_CREATED_BUTTON:
        return { ...state, list: [ ...state.list ].map(v => {
            if (!v.buttonId) {
                v.buttonId = action.payload.buttonId;
                v.createTime = action.payload.createTime;
            }
            return v;
        })};
    case ButtonActions.CREATE_BUTTON_ERROR:
        return { ...state, request: { ...state.request, status: 'ERROR', errorMessage: action.payload }};
    case ButtonActions.CREATE_BUTTON_REQUEST_FINISH:
        return { ...state, buttonInCreation: false ,stagedButton: null, request: { ...state.request, timeStarted: null, timeFinished: new Date(), status: null, whichResource: null, errorMessage: null }};
        /************ END CREATE ACTIONS **************/



        /************ GET ONE ACTIONS *****************/
    case ButtonActions.FETCH_ONE_BUTTON_REQUEST:
        return { ...state, itemBeingFetched: action.payload, request: { ...state.request, timeStarted: new Date(), timeFinished: null, status: 'IN_PROGRESS', whichResource: `BUTTON ${action.payload}`, errorMessage: null, type: 'GET' }};
    case ButtonActions.FETCH_ONE_BUTTON_SUCCESS:
        return { ...state, request: { ...state.request, status: 'SUCCESS' }};
    case ButtonActions.FETCH_ONE_BUTTON_ERROR:
        return { ...state, request: { ...state.request, status: 'ERROR', errorMessage: action.payload }};
    case ButtonActions.FETCH_ONE_BUTTON_REQUEST_FINISH:
        return { ...state, itemBeingFetched: null, request: { ...state.request, status: null, timeFinished: new Date(), timeStarted: null, whichResource: null, errorMessage: null }};
    case ButtonActions.RECEIVE_BUTTON:
        return { ...state, list: [ ...state.list ].map(v => {
            if (v.buttonId === action.payload.buttonId) {
                if (v.thumb !== action.payload.thumb) v.thumb = action.payload.thumb;
                if (v.layer !== action.payload.layer) v.layer = action.payload.layer;
                if (v.name  !== action.payload.name ) v.name  = action.payload.name;
            }
            return v;
        }) };
        /************ END GET ONE ACTIONS *************/



        /************ EDIT ACTIONS ******************/
    case ButtonActions.MARK_BUTTON_FOR_EDIT:
        return { ...state, buttonInEdit: action.payload };
    case ButtonActions.EDIT_BUTTON_REQUEST:
        return { ...state, request: { ...state.request, timeStarted: new Date(), timeFinished: null, status: 'IN_PROGRESS', whichResource: `BUTTON ${action.payload}`, errorMessage: null, type: 'EDIT' }};
    case ButtonActions.EDIT_BUTTON_SUCCESS:
        return { ...state, request: { ...state.request, status: 'SUCCESS' }};
    case ButtonActions.EDIT_BUTTON_ERROR:
        return { ...state, request: { ...state.request, status: 'ERROR', errorMessage: action.payload }};
    case ButtonActions.RECEIVE_EDITED_BUTTON:
        return { ...state, list: [ ...state.list ].map(v => {
            if (v.buttonId ===  action.payload.buttonId) {
                if (v.thumb !== action.payload.thumb) v.thumb = action.payload.thumb;
                if (v.layer !== action.payload.layer) v.layer = action.payload.layer;
                if (v.name  !== action.payload.name ) v.name  = action.payload.name;
                if (v.updateTime !== action.payload.updateTime) v.updateTime = action.payload.updateTime;
            }
            return v;
        }) };
    case ButtonActions.EDIT_BUTTON_REQUEST_FINISH:
        return { ...state, stagedButton: null, buttonInEdit: null, request: { ...state.request, timeStarted: null, timeFinished: new Date(), status: null, whichResource: null, errorMessage: null, type: null }};
        /************ END EDIT ACTIONS **************/
    default:
      return state;
  }
}
