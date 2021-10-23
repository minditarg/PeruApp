import { fetchApi } from '../api';

const endPoints = {
    listadoPorProveedor: '/trabajo/listadoPorProveedor/',
    listadoPorClienteSinCalificar: '/trabajo/listadoPorClienteSinCalificar/',
    listadoPorClienteCalificados: '/trabajo/listadoPorClienteCalificados/',
    get: '/trabajo/',
    crear: '/trabajo',
    eliminar: '/trabajo/',
    puntuarTrabajo:'/trabajo/puntuarTrabajo'
};


export const get = (id) => fetchApi(endPoints.get + id, {}, 'get');

export const listadoPorProveedor = (id) => fetchApi(endPoints.listadoPorProveedor + id, {}, 'get');


export const listadoPorClienteSinCalificar = (id) => fetchApi(endPoints.listadoPorClienteSinCalificar + id, {}, 'get');
export const listadoPorClienteCalificados = (id) => fetchApi(endPoints.listadoPorClienteCalificados + id, {}, 'get');


export const crear = (clienteId,servicioId,puntajeDelProveedor,descripcionDelProveedor) => {
    return fetchApi(endPoints.crear, {clienteId,servicioId,puntajeDelProveedor,descripcionDelProveedor}, 'post');
}

export const eliminar = (id) => fetchApi(endPoints.eliminar + id, {}, 'delete');


export const puntuarTrabajo = (trabajoId,puntajeDelCliente,descripcionDelCliente) => {
    return fetchApi(endPoints.puntuarTrabajo, {trabajoId,puntajeDelCliente,descripcionDelCliente}, 'post');
}
