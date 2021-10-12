import axios from "axios";
import { NavigateFunction } from "react-router-dom";

import { IUser } from "../../interfaces/user"
import { BASE_API_URL } from "../../utils/constants";
import { FAIL_USER, LOAD_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER, CURRENT_USER, GET_USER, DELETE_USER, UPDATE_USER } from "../action-types/user"

export const registerUser = (data: any, navigate: NavigateFunction) => async (dispatch: any) => {
  dispatch({ type: LOAD_USER })
  try {
    const res = await axios.post(`${BASE_API_URL}/user/signup`, data);// {user token}

    localStorage.setItem("token", res.data.token)
    localStorage.setItem("profile", "user")

    dispatch({
      type: REGISTER_USER,
      payload: res.data
    })

    navigate("/user/dashboard/profile", { replace: true })
  } catch (error: any) {
    dispatch({
      type: FAIL_USER,
      payload: error.response.data
    })
  }
}

export const loginUser = (user: IUser, navigate: NavigateFunction) => async (dispatch: any) => {
  dispatch({ type: LOAD_USER });
  try {

    const result = await axios.post(`${BASE_API_URL}/user/login`, user)
    localStorage.setItem("token", result.data.token)
    localStorage.setItem("profile", "user")
    dispatch({ type: LOGIN_USER, payload: result.data }) // {user token}
    navigate("/user/dashboard", { replace: true })
  } catch (error: any) {
    dispatch({ type: FAIL_USER, payload: error.response.data })
  }
}

export const logoutUser = (navigate: NavigateFunction) => async (dispatch: any) => {
  dispatch({ type: LOGOUT_USER })

  localStorage.removeItem("token")
  localStorage.removeItem("profile")
  navigate("/", { replace: true })
}

export const current = () => async (dispatch: any) => {
  dispatch({ type: LOAD_USER })
  const options = {
    headers: { "auth-token": localStorage.getItem("token") }
  }
  try {
    let result = await axios.get(`${BASE_API_URL}/user/current`, options)
    console.log(result.data);

    dispatch({ type: CURRENT_USER, payload: result.data })
  } catch (error) {

  }
}

export const getUserById = (userId: string) => async (dispatch: any) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/user/${userId}`)
    console.log(res.data);

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = (userId: string, navigate: NavigateFunction) => async (dispatch: any) => {
  try {
    const res = await axios.delete(`${BASE_API_URL}/user/${userId}`)

    dispatch({ type: DELETE_USER })

    localStorage.removeItem("token")
    localStorage.removeItem("profile")
    navigate("/", { replace: true })
  } catch (error) {

  }
}

export const updateUser = (user: FormData, id: string, navigate: NavigateFunction) => async (dispatch: any) => {
  try {
    const res = await axios.patch(`${BASE_API_URL}/user/${id}`, user)

    dispatch({
      type: UPDATE_USER,
      payload: res.data
    })

    navigate("/user/dashboard/profile", { replace: true })
  } catch (error) {

  }
}