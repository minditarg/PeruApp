import { fetchApi } from '../api';

const endPoints = {
    listadoCategorias: '/categorias',
    get: '/servicio/',
    crear: '/servicio',
    actualizar: '/servicio/',
    eliminar: '/servicio/',
};


export const get = (id) => fetchApi(endPoints.get + id, {}, 'get');

export const listadoCategorias = () => fetchApi(endPoints.listadoCategorias, {}, 'get');

export const crear = (nombre, descripcion, fotos, subcategoriaId, proveedorId) => {

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('subcategoriaId', subcategoriaId);
    formData.append('proveedorId', proveedorId);

    fotos.forEach(foto => {
        let localUri = foto.uri;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append('fotos', { uri: localUri, name: filename, type });
    });

    return fetchApi(endPoints.crear, formData, 'post', true);
}

export const actualizar = (id, nombre, descripcion, fotos, subcategoriaId, proveedorId) => {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('subcategoriaId', subcategoriaId);
    formData.append('proveedorId', proveedorId);

    fotos.forEach(foto => {
        let localUri = foto.uri;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append('fotos', { uri: localUri, name: filename, type });
    });
    return fetchApi(endPoints.actualizar + id, formData, 'post', true);
}


export const eliminar = (id) => fetchApi(endPoints.eliminar + id, {}, 'delete');