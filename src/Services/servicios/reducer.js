import * as actionTypes from "./actionTypes";

export const initialState = {
  servicios: [],
  servicioSeleccionado: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ISLOADING:
      return {
        ...state,
        isloading: true
      };
    case actionTypes.ACTUALIZAR_SERVICIOS:
      return {
        ...state,
        servicios: action.data
      };
    case actionTypes.SELECCIONAR_SERVICIO:
      return {
        ...state,
        servicioSeleccionado: action.data,
        isloading: false
      };
    default:
      return state;
  }
};
