import { GET_USER, REMOVE_USER } from "../actions/types";
const initialState = {
  isAuthenticated: false,
  user: {}
};
export default (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      };
    case REMOVE_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload
      };
    default:
      return state;
  }
};
