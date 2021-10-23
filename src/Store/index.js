import { createStore } from "redux";
import rootReducer from "../Reducers";

export default store = createStore(rootReducer);

//Para correrlo con el debugger
//export default store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
//   trace: true}
//));
