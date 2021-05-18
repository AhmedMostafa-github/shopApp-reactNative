import {
  LOGIN,
  SIGNUP,
  AUTHENTICATE,
  SET_DID_TRY_AL,
  LOGOUT,
} from "../actions/auth";

const initialState = {
  isLoggedin: false,
  token: null,
  userId: null,
  didTrytoAutoLogin: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        isLoggedin: true,
        token: action.token,
        userId: action.userId,
        didTrytoAutoLogin: true,
      };

    case SET_DID_TRY_AL:
      return {
        ...state,
        didTrytoAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTrytoAutoLogin: true,
      };

    //   case SIGNUP:
    //     return {
    //       isLoggedin: true,
    //       token: action.token,
    //       userId: action.userId,
    //     };
  }
  return state;
};
