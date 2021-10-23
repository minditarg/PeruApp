import * as api from "./api";
import * as session from "../session";
import store from "../../Store";
import * as selectors from "./selectors";
import * as actionCreators from "./actions";

const onRequestSuccess = response => {
  if (response.statusType == "success")
    session.actualizarProveedorEnStore(response.data);
  return response;
};

const onRequestFailed = exception => {
  throw exception;
};

export const get = id => {
  // store.dispatch(actionCreators.isLoading());
  return api.get(id).then(response => {
    if (response.statusType == "success") {
      store.dispatch(actionCreators.getProveedor(response.data));
    }
  });
};
export const getPremium = () => {
  return api.getPremium().then(response => {
    if (response.statusType == "success") {
      console.log(response.data, "dataaa");
      store.dispatch(actionCreators.getProveedor(response.data));
      getServicios(response.data.id);
    }
  });
};
export const getServicios = id => {
  // store.dispatch(actionCreators.isLoading());
  return api.getServicios(id).then(response => {
    if (response.statusType == "success") {
      store.dispatch(actionCreators.getServicios(response.data));
    }
  });
};


export const getStore = () => {
  return selectors.get();
};

export const listado = () => api.listado();
export const crear = (
  nombre,
  email,
  descripcion,
  direccion,
  localidadId,
  telefono,
  foto
) =>
  api
    .crear(
      nombre,
      email,
      descripcion,
      direccion,
      localidadId,
      telefono,
      foto,
      session.usuarioLogueado().id
    )
    .then(onRequestSuccess)
    .catch(onRequestFailed);

export const actualizar = (
  nombre,
  email,
  descripcion,
  direccion,
  localidadId,
  telefono,
  foto
) =>
  api
    .actualizar(
      nombre,
      email,
      descripcion,
      direccion,
      localidadId,
      telefono,
      foto,
      session.usuarioLogueado().Proveedor.id
    )
    .then(onRequestSuccess)
    .catch(onRequestFailed);


    export const soyPremium = () => {
      return session.usuarioLogueado().Proveedor.tipo=='Premium';
    };