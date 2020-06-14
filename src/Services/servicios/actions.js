import * as actionTypes from "./actionTypes";

export const actualizarServicios = servicios => ({
  type: actionTypes.ACTUALIZAR_SERVICIOS,
  data: servicios
});

export const seleccionarServicio = servicio => ({
  type: actionTypes.SELECCIONAR_SERVICIO,
  data: servicio
});
export const isLoading = servicio => ({
  type: actionTypes.ISLOADING
});
