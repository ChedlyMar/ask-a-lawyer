import axios from "axios"
import { BASE_API_URL } from "../../utils/constants"
import { CREATE_MESSAGE, GET_MESSAGES } from "../action-types/message"

export const getMessage = (conversationId: string) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/message/${conversationId}`)

    dispatch({
      type: GET_MESSAGES,
      payload: res.data
    })
  } catch (error) {
    console.log(error);
  }
}

export const AddMessage = (conversationId: string, sender: string, text: string) => async (dispatch: any) => {
  try {
    const res = await axios.post(`${BASE_API_URL}/message/`, { conversationId, sender, text })

    dispatch({
      type: CREATE_MESSAGE,
      payload: res.data
    })
    return res.data
  } catch (error) {
    console.log(error);
  }
}

export const recivedMessage = (message: string) => (dispatch: any) => {
  dispatch({
    type: CREATE_MESSAGE,
    payload: message
  })
}