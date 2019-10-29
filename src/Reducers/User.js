import { LOGIN, CREATE_USER, UPDATE_USER } from "../Actions/actionsTypes";

const User = (state = [], action) => {
  switch (action.type) {
    case LOGIN:
      console.log("login");
      return state;
    case CREATE_USER:
      console.log("login");
      return state;
    case UPDATE_USER:
      console.log("login");
      return state;
    default:
      console.log("default");
      return state;
  }
};

export default User;
