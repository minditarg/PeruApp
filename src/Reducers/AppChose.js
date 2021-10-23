import { APP_CHOOSE_TYPE, LOAD_TOKEN_USER } from "../Actions/actionsTypes";

const AppChose = (state = [], action) => {
  switch (action.type) {
    case APP_CHOOSE_TYPE:
      state = [{ appPara: action.playload.tipo }];
      return state;
    case LOAD_TOKEN_USER:
      state["userToken"] = action.payload;

      return state;
    default:
      return state;
  }
};

export default AppChose;
