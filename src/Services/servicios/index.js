
import * as api from './api';
import * as session from '../session';
import store from '../../Store';

import * as actionCreators from '../session/actions';


const onRequestSuccess = (response) => {
    if (response.statusType == "success") store.dispatch(actionCreators.update({  user: response.data.user }));
	return response;

};

const onRequestFailed = (exception) => {

};


export const listadoCategorias = () => {
    return api.listadoCategorias().then(response => {
        if (response.statusType == "success") {
            return response.data;
        }
    })
}
export const crear = (nombre, descripcion, foto, subcategoriaId) => {
    let imgbase64 = foto != null ? foto.base64 : null;
     api.crear(nombre, descripcion, imgbase64, subcategoriaId, session.usuarioLogueado().Proveedor.id).then(onRequestSuccess).catch(onRequestFailed);
}

export const eliminar = (servicioId) => {
    return api.eliminar(servicioId);
}