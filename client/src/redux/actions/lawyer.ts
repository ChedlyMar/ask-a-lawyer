import axios from 'axios'
import { NavigateFunction } from 'react-router-dom'

import { ILawyer } from '../../interfaces/lawyer'
import { BASE_API_URL } from '../../utils/constants'
import { CURRENT_LAWYER, DELETE_LAWYER, FAIL_LAWYER, GET_ALL_LAWYERS, GET_LAWYER, LOAD_LAWYER, LOGIN_LAWYER, LOGOUT_LAWYER, REGISTER_LAWYER, UPDATE_LAWYER } from '../action-types/lawyer'

export const getLawyer = (lawyerId: string) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/lawyer/${lawyerId}`)

    dispatch({
      type: GET_LAWYER,
      payload: res.data
    })
  } catch (error) {
    console.log(error);
  }
}

export const getAllLawyers = () => async (dispatch: any) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/lawyer/`)

    dispatch({
      type: GET_ALL_LAWYERS,
      payload: res.data
    })
  } catch (error) {
    console.log(error);
  }
}

export const getMyLawyer = (userId: string[]) => async (dispatch: any) => {

  const res = await axios.get(`${BASE_API_URL}/lawyer/`, {
    params: {
      userId
    }
  })
}

export const registerLawyer = (lawyer: ILawyer, navigate: NavigateFunction) => async (dispatch: any) => {
  dispatch({ type: LOAD_LAWYER })
  try {
    const res = await axios.post(`${BASE_API_URL}/lawyer/signup`, lawyer);// {user token}
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("profile", "lawyer")

    dispatch({
      type: REGISTER_LAWYER,
      payload: res.data
    })

    // history.push("/dashboard/profile")
    navigate("/lawyer/dashboard/profile", { replace: true })
  } catch (error: any) {
    dispatch({
      type: FAIL_LAWYER,
      payload: error.response.data
    })
  }
}

export const loginLawyer = (lawyer: ILawyer, navigate: NavigateFunction) => async (dispatch: any) => {
  dispatch({ type: LOAD_LAWYER });
  try {
    const result = await axios.post(`${BASE_API_URL}/lawyer/login`, lawyer)
    localStorage.setItem("token", result.data.token)
    localStorage.setItem("profile", "lawyer")
    dispatch({ type: LOGIN_LAWYER, payload: result.data }) // {lawyer token}
    navigate("/lawyer/dashboard/profile", { replace: true })
  } catch (error: any) {
    dispatch({ type: FAIL_LAWYER, payload: error.response.data })
  }
}

export const logoutLawyer = (navigate: NavigateFunction) => async (dispatch: any) => {
  dispatch({ type: LOGOUT_LAWYER })

  localStorage.removeItem("token")
  localStorage.removeItem("profile")
  navigate("/", { replace: true })
}

export const updateLawyer = (lawyer: FormData, id: string, navigate: NavigateFunction) => async (dispatch: any) => {
  try {
    const res = await axios.patch(`${BASE_API_URL}/lawyer/${id}`, lawyer)

    dispatch({
      type: UPDATE_LAWYER,
      payload: res.data
    })

    navigate("/lawyer/dashboard/profile", { replace: true })
  } catch (error) {

  }

}

export const deleteLawyer = (id: string, navigate: NavigateFunction) => async (dispatch: any) => {
  try {
    const res = await axios.delete(`${BASE_API_URL}/lawyer/${id}`)

    dispatch({
      type: DELETE_LAWYER,
    })

    localStorage.removeItem("token")
    localStorage.removeItem("profile")
    navigate("/", { replace: true })
  } catch (error) {

  }

}

export const currentLawyer = () => async (dispatch: any) => {
  dispatch({ type: LOAD_LAWYER })
  const options = {
    headers: { "auth-token": localStorage.getItem("token") }
  }
  try {
    let result = await axios.get(`${BASE_API_URL}/lawyer/current`, options)

    dispatch({ type: CURRENT_LAWYER, payload: result.data })
  } catch (error) {

  }
}