import { fetchApi } from '../api';

const endPoints = {
    listado: '/cliente/listado',
    get: '/cliente/',
    crear: '/cliente',
    eliminar: '/cliente/',
    actualizar: '/cliente/',
};


export const get = (id) => fetchApi(endPoints.get + id, {}, 'get');

export const listado = () => fetchApi(endPoints.listado, {}, 'get');

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

export const eliminar = (id) => fetchApi(endPoints.eliminar + id, {}, 'delete');


export const actualizar = (
    idUsuario,
    nombre,
    fotoNueva,
  ) => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    if (fotoNueva != null) {
      let localUri = fotoNueva.uri;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append("foto", { uri: localUri, name: filename, type });
    }
    return fetchApi(endPoints.actualizar + idUsuario, formData, "put", true);
  };