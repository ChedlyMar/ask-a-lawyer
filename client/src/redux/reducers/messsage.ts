import { AnyAction } from "redux";
import { CREATE_MESSAGE, GET_MESSAGES } from "../action-types/message";

const initialState: [] = []

export const message = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_MESSAGES:
      return payload;
    case CREATE_MESSAGE:
      return [...state, payload]
    default: return state
  }
}