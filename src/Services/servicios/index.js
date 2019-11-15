
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
    let imagenes= fotos.map(function(img, i){ return  { foto: img.base64 }});
    return api.crear(nombre, descripcion, imagenes, subcategoriaId, session.usuarioLogueado().Proveedor.id);
}

export const eliminar = (servicioId) => {
    return api.eliminar(servicioId);
}