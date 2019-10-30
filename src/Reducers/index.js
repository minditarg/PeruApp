import { combineReducers } from "redux";

import User from "./User";
import Servicios from "./Servicios";
import Trabajos from "./Trabajos";

import AppChose from "./AppChose";
import LoadingData from "./LoadingData";

export default combineReducers({
  User,
  Servicios,
  Trabajos,
  AppChose,
  LoadingData
});
