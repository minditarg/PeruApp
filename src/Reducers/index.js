import { combineReducers } from "redux";

//import User from "./User";

import AppChose from "./AppChose";
import LoadingData from "./LoadingData";

import { reducer as sessionReducer } from "../Services/session/reducer";
import { reducer as serviciosReducer } from "../Services/servicios/reducer";
import { reducer as trabajosReducer } from "../Services/trabajos/reducer";
import { reducer as proveedorReducer } from "../Services/proveedor/reducer";
import { reducer as commonReducer } from "../Services/common/reducer";

export default combineReducers({
  // User,
  session: sessionReducer,
  common: commonReducer,
  servicios: serviciosReducer,
  trabajos: trabajosReducer,
  proveedor: proveedorReducer,
  AppChose,
  LoadingData
});
