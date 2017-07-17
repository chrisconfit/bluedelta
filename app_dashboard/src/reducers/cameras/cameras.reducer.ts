import { Action } from 'redux';
import { CameraActions } from './cameras.actions'

export interface ICameraState {
  list: any[];
  stage: {
    nickname: string|null;
    clientCameraId: string|null;
    location: string;
    status: string;
  };
  create: {
    requestInProgress: boolean;
    response: string|null;
  };
  read: {
    requestInProgress: boolean;
    response: string|null;
  };
  update: {
    requestInProgress: boolean;
    response: string|null;
  };
  delete: {
    requestInProgress: boolean;
    response: string|null;
  };
}

export const CAMERAS_INITIAL_STATE: ICameraState = {
  list: [],
  stage: {
    nickname: null,
    clientCameraId: null,
    location: '',
    status: ''
  },
  create: {
    requestInProgress: false,
    response: null
  },
  read: {
    requestInProgress: false,
    response: null
  },
  update: {
    requestInProgress: false,
    response: null
  },
  delete: {
    requestInProgress: false,
    response: null
  }
};

// TODO, find the default type for Action so I don't have to do the stupid union workaround

export function camerasReducer(state: ICameraState = CAMERAS_INITIAL_STATE, action: Action|any): ICameraState {
  switch (action.type) {
    case CameraActions.REQUEST_START:
      return { ...state, create: { ...state.create, requestInProgress: action.payload } };
    case CameraActions.REQUEST_END:
      return { ...state, create: { ...state.create, requestInProgress: action.payload } };
    case CameraActions.RECEIVE_RESPONSE_SUCCESS:
      return { ...state, create: { ...state.create, response: action.payload } };
    case CameraActions.RECEIVE_RESPONSE_ERROR:
      return { ...state, create: { ...state.create, response: action.payload } };   
    default:
      return state;
  }
}
