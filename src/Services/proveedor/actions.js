import * as actionTypes from "./actionTypes";

export const getProveedor = proveedor => ({
  type: actionTypes.GET_PROVEEDOR,
  data: proveedor
});

export const getServicios = servicios => ({
  type: actionTypes.GET_SERVICIOS,
  data: servicios
});
