
import * as api from './api';
import * as session from '../session';
import store from '../../Store';

import * as selectors from "./selectors";
import * as actionCreators from './actions';


export const listadoCategorias = () => {
    return api.listadoCategorias().then(response => {
        if (response.statusType == "success") {
            store.dispatch(actionCreators.actualizarCategorias(response.data));
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
export const  buscar = (categoriaId, subcategoriaId, localidadId) => {
    return api.buscar(categoriaId, subcategoriaId, localidadId).then(response => {
        if (response.statusType == "success") {
            store.dispatch(actionCreators.actualizarServicios(response.data));
        }
    })
}
export const getStore= () => {
    return selectors.get();
}
