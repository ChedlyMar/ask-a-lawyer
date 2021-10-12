import { AnyAction } from 'redux'
import { ILawyerState } from '../../interfaces/lawyer'
import { CURRENT_LAWYER, DELETE_LAWYER, FAIL_LAWYER, GET_ALL_LAWYERS, GET_LAWYER, LOAD_LAWYER, LOGIN_LAWYER, LOGOUT_LAWYER, REGISTER_LAWYER, UPDATE_LAWYER } from '../action-types/lawyer'

const initialState: ILawyerState = {
  myLawyer: [],
  allLawyer: [],
  lawyer: undefined,
  loadLawyer: false,
  isAuth: false
}

export const lawyer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_LAWYER:
      return { ...state, myLawyer: [...state.myLawyer, payload] }
    case UPDATE_LAWYER:
      return { ...state, lawyer: { ...payload } }
    case DELETE_LAWYER:
      return { ...initialState }
    case GET_ALL_LAWYERS:
      return { ...state, allLawyer: [...payload] }
    case LOGIN_LAWYER:
      return { ...state, loadLawyer: false, lawyer: payload.lawyer, isAuth: true }
    case LOAD_LAWYER:
      return { ...state, loadLawyer: true };
    case REGISTER_LAWYER:
      return { ...state, loadLawyer: false, lawyer: payload.lawyer, isAuth: true }
    case CURRENT_LAWYER:
      return { ...state, loadLawyer: false, isAuth: true, lawyer: payload };
    case LOGOUT_LAWYER:
      return { ...initialState }
    case FAIL_LAWYER:
      return { ...state, loadLawyer: false, errors: payload }

    default:
      return state
  }
}