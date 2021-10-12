
import { AnyAction } from "redux";
import { CURRENT_USER, DELETE_USER, FAIL_USER, GET_USER, LOAD_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER, UPDATE_USER } from "../action-types/user";

const initialState = {
  user: null,
  loadUser: false,
  error: null,
  isAuth: false,
  myUser: []
}

export const user: any = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case REGISTER_USER:
      return { ...state, loadUser: false, user: payload.user, isAuth: true }
    case LOGIN_USER:
      return { ...state, loadUser: false, user: payload.user, isAuth: true }
    case LOAD_USER:
      return { ...state, loadUser: true };
    case CURRENT_USER:
      return { ...state, loadUser: false, isAuth: true, user: payload };
    case LOGOUT_USER:
      return { ...initialState }
    case FAIL_USER:
      return { ...state, loadUser: false, errors: payload };
    case GET_USER:
      return { ...state, myUser: [...state.myUser, payload] }
    case UPDATE_USER:
      return { ...state, user: { ...payload } }
    case DELETE_USER:
      return { ...initialState }
    default: return state;
  }
}