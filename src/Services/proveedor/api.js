import { fetchApi } from '../api';

const endPoints = {
    listado: '/proveedor/listado',
    crear: '/proveedor',
    actualizar: '/proveedor/',
    eliminar: '/proveedor/',
};

export const listado = () => fetchApi(endPoints.listado, {}, 'post');


export const crear = (nombre, email, descripcion, direccion, telefono, foto, usuarioId) =>
    fetchApi(endPoints.crear, { nombre: nombre, email: email, descripcion: descripcion, direccion: direccion, telefono: telefono, foto: foto, usuarioId: usuarioId }, 'post');


export const actualizar = (id) =>
    fetchApi(endPoints.actualizar + id, { nombre: nombre, email: email, descripcion: descripcion, direccion: direccion, telefono: telefono, foto: foto }, 'put');


export const eliminar = (id) => fetchApi(endPoints.eliminar + id, {}, 'delete');