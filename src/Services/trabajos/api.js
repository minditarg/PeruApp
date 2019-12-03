import { fetchApi } from '../api';

const endPoints = {
    listadoPorProveedor: '/trabajo/listadoPorProveedor/',
    get: '/trabajo/',
    crear: '/trabajo',
    eliminar: '/trabajo/',
};


export const get = (id) => fetchApi(endPoints.get + id, {}, 'get');

export const listadoPorProveedor = (id) => fetchApi(endPoints.listadoPorProveedor + id, {}, 'get');

export const crear = (clienteId,servicioId,puntajeDelProveedor,descripcionDelProveedor) => {
    return fetchApi(endPoints.crear, {clienteId,servicioId,puntajeDelProveedor,descripcionDelProveedor}, 'post');
}

export const eliminar = (id) => fetchApi(endPoints.eliminar + id, {}, 'delete');