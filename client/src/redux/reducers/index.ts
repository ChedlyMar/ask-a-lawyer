import { combineReducers } from "redux"
import { user } from "./user"
import { conversation } from "./conversation"
import { lawyer } from './lawyer'
import { message } from "./messsage"

export const rootReducer = combineReducers({
  user,
  conversation,
  lawyer,
  message
})