
import * as api from './api';
import * as session from '../session';
import store from '../../Store';

import * as actionCreators from '../session/actions';


const onRequestSuccess = (response) => {
     console.log(response);
     if (response.statusType == "success") session.actualizarProveedorEnStore(response.data);
     return response;
};

const onRequestFailed = (exception) => {
     console.log(exception);
     throw exception;
};


export const listado = () => api.listado()
export const crear = (nombre, email, descripcion, direccion, telefono, foto) =>
     api.crear(nombre, email, descripcion, direccion, telefono, foto, session.usuarioLogueado().id)
          .then(onRequestSuccess)
          .catch(onRequestFailed);

export const actualizar = (nombre, email, descripcion, direccion, telefono, foto) =>
     api.actualizar(nombre, email, descripcion, direccion, telefono, foto, session.usuarioLogueado().Proveedor.id)
          .then(onRequestSuccess)
          .catch(onRequestFailed);