
import * as api from './api';
import * as session from '../session';
export const listado = () => {
    return api.listado().then(response => {
        if (response.statusType == "success") {
            return response.data;
        }
    })
}
// export const crear = (nombre, descripcion, fotos, subcategoriaId) => {
//     return api.crear(nombre, descripcion, fotos, subcategoriaId, session.usuarioLogueado().Proveedor.id);
// }

const onRequestSuccess = response => {
    console.log(response);
    if (response.statusType == "success")
      session.actualizarUsuario();
    return response;
  };
export const actualizar = ( nombre, foto) => {
    return api.actualizar(session.usuarioLogueado().id, nombre, foto).then(onRequestSuccess);
}

export const eliminar = (servicioId) => {
    return api.eliminar(servicioId);
}

export const get = (id) => {
    return api.get(id).then(response => {
        if (response.statusType == "success") {
            return response.data;
        }
    })
}