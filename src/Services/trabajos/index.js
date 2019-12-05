
import * as api from './api';
import * as sessionService from '../session';
import store from "../../Store";
import * as actionCreators from "./actions";
import * as selectors from "./selectors";

export const listadoPorProveedor = () => {
    let idProveedor = sessionService.usuarioLogueado().Proveedor.id; 
    return api.listadoPorProveedor(idProveedor).then(response => {
        if (response.statusType == "success") {
            store.dispatch(actionCreators.actualizar(response.data));
        }
        return response;
    }).catch(exception => {
        console.log(exception);
        throw exception;
    });
}


export const getListadoPorProveedor = () => {
    return selectors.get();
}

export const crear = (clienteId,servicioId,puntajeDelProveedor,descripcionDelProveedor) => {
    return api.crear(clienteId,servicioId,puntajeDelProveedor,descripcionDelProveedor);
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