import { IConversations } from "./conversation";
import { ILawyerState } from "./lawyer";
import { IMessage } from './message'
import { IUser } from "./user";

export interface IUserState {
  user: IUser,
  loadUser: boolean,
  error: any,
  isAuth: boolean,
  myUser: IUser[]
}

export interface IState {
  user: IUserState,
  conversation: IConversations,
  message: IMessage[],
  lawyer: ILawyerState
}