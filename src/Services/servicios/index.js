
import * as api from './api';
import * as session from '../session';
import store from '../../Store';

import * as actionCreators from '../session/actions';


export const listadoCategorias = () => {
    return api.listadoCategorias().then(response => {
        if (response.statusType == "success") {
            return response.data;
        }
    })
}
export const crear = (nombre, descripcion, fotos, subcategoriaId) => {
    return api.crear(nombre, descripcion, fotos, subcategoriaId, session.usuarioLogueado().Proveedor.id);
}
export const actualizar = (id, nombre, descripcion, fotos, subcategoriaId) => {
    return api.actualizar(id, nombre, descripcion, fotos, subcategoriaId, session.usuarioLogueado().Proveedor.id);
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