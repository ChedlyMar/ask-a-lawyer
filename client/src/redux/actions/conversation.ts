import axios from 'axios'
import { NavigateFunction } from 'react-router-dom';
import { BASE_API_URL } from '../../utils/constants';
import { CREATE_CONVERSATION, GET_CONVERSATION, SELECTED_CONVERSATION } from '../action-types/conversation'

export const getConversation = (userId: string) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/conversation/${userId}`);//[conversations]

    dispatch({
      type: GET_CONVERSATION,
      payload: res.data
    })
  } catch (error) {
    console.log(error);
  }
}

export const createConversation = (userId: string, lawyerId: string, navigate: NavigateFunction) => async (dispatch: any) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/conversation/`, { userId, lawyerId })

    dispatch(getConversation(userId))

    navigate("/user/dashboard/messenger", { replace: true })
  } catch (error) {
    console.log(error);
  }
}

export const getLawyerConversation = (lawyerId: string) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/conversation/lawyer/${lawyerId}`);//[conversations]
    console.log(res.data);

    dispatch({
      type: GET_CONVERSATION,
      payload: res.data
    })
  } catch (error) {
    console.log(error);
  }
}

export const selectedConversation = (convId: string) => (dispatch: any) => {
  dispatch({
    type: SELECTED_CONVERSATION,
    payload: convId
  })
}