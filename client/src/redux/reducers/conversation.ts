import { AnyAction } from "redux"
import { IConversation } from "../../interfaces/conversation"
import { CREATE_CONVERSATION, GET_CONVERSATION, SELECTED_CONVERSATION } from '../action-types/conversation'

const initialState = {
  conversation: [],
  selectedConversation: ""
}

export const conversation: any = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case GET_CONVERSATION:
      return {
        conversation: [...payload],
      }
    case SELECTED_CONVERSATION:
      return {
        ...state,
        selectedConversation: payload
      }
    default: return state;
  }
}