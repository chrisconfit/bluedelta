import { combineReducers } from 'redux';

import { ICameraState, CAMERAS_INITIAL_STATE, camerasReducer } from "./cameras/cameras.reducer";
import { IUsersState, USERS_INITIAL_STATE, usersReducer } from "./users/users.reducer";
import { buttonsReducer, IButtonState, BUTTONS_INITIAL_STATE } from "./buttons/buttons.reducer";


export class IAppState {
  cameras: ICameraState;
  users: IUsersState;
  buttons: IButtonState;
};

export const INITIAL_STATE: IAppState = {
    cameras: CAMERAS_INITIAL_STATE,
    users: USERS_INITIAL_STATE,
    buttons: BUTTONS_INITIAL_STATE
};

export const rootReducer = combineReducers<IAppState>({
  cameras: camerasReducer,
  users: usersReducer,
  buttons: buttonsReducer
});
