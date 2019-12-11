import { combineReducers } from "redux";

import User from "./User";


import AppChose from "./AppChose";
import LoadingData from "./LoadingData";

import { reducer as sessionReducer } from '../Services/session/reducer';
import { reducer as serviciosReducer } from '../Services/servicios/reducer';
import { reducer as trabajosReducer } from '../Services/trabajos/reducer';

export default combineReducers({
  User,
  session: sessionReducer,
  servicios: serviciosReducer,
  trabajos: trabajosReducer,
  AppChose,
  LoadingData
});
