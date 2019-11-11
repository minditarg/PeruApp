import { combineReducers } from "redux";

import User from "./User";
import Servicios from "./Servicios";
import Trabajos from "./Trabajos";

import AppChose from "./AppChose";
import LoadingData from "./LoadingData";

import { reducer as sessionReducer } from '../Services/session/reducer';

export default combineReducers({
  User,
  session: sessionReducer,
  Servicios,
  Trabajos,
  AppChose,
  LoadingData
});
