import {
  GET_TRABAJOS,
  UPDATE_TRABAJO,
  DELETE_TRABAJO,
  CREATE_TRABAJO
} from "../Actions/actionsTypes";
const Trabajos = (state = [], action) => {
  switch (action.type) {
    case GET_TRABAJOS:
      console.log("login");
      return state;
    case UPDATE_TRABAJO:
      console.log("login");
      return state;
    case DELETE_TRABAJO:
      console.log("login");
      return state;
    case CREATE_TRABAJO:
      console.log("login");
      return state;
    default:
      console.log("default");
      return state;
  }
};

export default Trabajos;
