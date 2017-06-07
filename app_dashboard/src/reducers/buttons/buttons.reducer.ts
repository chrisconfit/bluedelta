// import { Action } from 'redux';
// import { ButtonActions } from "./buttons.actions";


// export interface IButtonState {
//   list: any[];
// }

// export const BUTTONS_INITIAL_STATE: IButtonState = {
//   list: []
// };

// // TODO, find the default type for Action so I don't have to do the stupid union workaround

// export function buttonsReducer(state: IButtonState = BUTTONS_INITIAL_STATE, action: Action|any): IButtonState {
//   switch (action.type) {
//     case ButtonActions.REQUEST_START:
//       return Object.assign({}, state);
//     case ButtonActions.REQUEST_END:
//       return Object.assign({}, state);
//     default:
//       return state;
//   }
// }
