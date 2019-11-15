import { fetchApi } from '../api';

const endPoints = {
    listadoCategorias: '/categorias',
    crear: '/servicio',
    actualizar: '/servicio/',
    eliminar: '/servicio/',
};

export const listadoCategorias = () => fetchApi(endPoints.listadoCategorias, {}, 'get');

export const crear = (nombre, descripcion, foto, subcategoriaId, proveedorId) => {
    return fetchApi(endPoints.crear, { nombre: nombre, descripcion: descripcion, foto: foto, subcategoriaId: subcategoriaId, proveedorId: proveedorId }, 'post');
}


export const eliminar = (id) => fetchApi(endPoints.eliminar + id, {}, 'delete');