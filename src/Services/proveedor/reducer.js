import * as actionTypes from "./actionTypes";

export const initialState = {
  ProveedorSeleccionado: {},
  ServiciosPorProveedor: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROVEEDOR:
      return {
        ...state,
        ProveedorSeleccionado: action.data
      };
    case actionTypes.GET_SERVICIOS:
      return {
        ...state,
        ServiciosPorProveedor: action.data
      };
    default:
      return state;
  }
};
