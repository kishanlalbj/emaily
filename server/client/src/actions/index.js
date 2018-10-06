import axios from "axios";
import { GET_USER, REMOVE_USER } from "./types";

export const getUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  if (Object.keys(res.data).length === 0) {
    let data = {
      isAuthenticated: false,
      user: {}
    };
    dispatch({ type: GET_USER, payload: data });
  } else {
    let data = {
      isAuthenticated: true,
      user: res.data
    };
    dispatch({ type: GET_USER, payload: data });
  }
};

export const removeUser = () => async dispatch => {
  const res = await axios.get("/api/logout");
  dispatch({ type: REMOVE_USER, payload: res.data });
};

export const handleStripeToken = token => async dispatch => {
  const res = await axios.post("/api/pay", token);
  if (Object.keys(res.data).length === 0) {
    let data = {
      isAuthenticated: false,
      user: {}
    };
    dispatch({ type: GET_USER, payload: data });
  } else {
    let data = {
      isAuthenticated: true,
      user: res.data
    };
    dispatch({ type: GET_USER, payload: data });
  }
};
