import { Action } from 'redux';
import { UsersActions } from "./users.actions";
import { IUserRegistration } from "../../services/account-management.service";

export interface IUsersState {
  currentUserName: string|null;
  currentUserId: string|null;
  registrationCode: {
    code: any|undefined;
    submitted: boolean;
  };
  signUp: {
    submitted: boolean;
    userData: IUserRegistration;
  };
  
};

export const USERS_INITIAL_STATE: IUsersState = {
  currentUserName: null,
  currentUserId: null,
  registrationCode: {
    code: undefined,
    submitted: false
  },
  signUp: {
    submitted: false,
    userData: {
      username: '',
      password: '',
      givenName: '',
      familyName: '',
      email: ''
    }
  }
};

export function usersReducer(state: IUsersState = USERS_INITIAL_STATE, action: Action|any): IUsersState {
  switch (action.type) {
    case UsersActions.SET_CURRENT_USER_NAME:
      return { ...state, currentUserName: action.payload };
    case UsersActions.SET_CURRENT_USER_ID:
      return { ...state, currentUserId: action.payload };
    case UsersActions.SIGN_UP_FORM_SUBMITTED:
      return { ...state, signUp: { ...state.signUp, submitted: action.payload }};
    default:
      return state;
  }
}
