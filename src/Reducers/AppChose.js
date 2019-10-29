import { APP_CHOOSE_TYPE } from "../Actions/actionsTypes";

const AppChose = (state = [], action) => {
  switch (action.type) {
    case APP_CHOOSE_TYPE:
      state = [{ appPara: action.playload.tipo }];
      return state;
    default:
      console.log("default appchose");
      return state;
  }
};

export default AppChose;
