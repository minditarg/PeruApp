import { fetchApi } from '../api';
import * as common from '../common';

const endPoints = {
    listado: '/proveedor/listado',
    crear: '/proveedor',
    actualizar: '/proveedor/',
    eliminar: '/proveedor/',
};

export const listado = () => fetchApi(endPoints.listado, {}, 'post');


export const crear = (nombre, email, descripcion, direccion, telefono, foto, usuarioId) => {

    // console.log(foto);
    // const formData = new FormData();
    // formData.append('nombre', nombre);
    // formData.append('email', email);
    // formData.append('descripcion', descripcion);
    // formData.append('direccion', direccion);
    // formData.append('telefono', telefono);
    // formData.append("foto", {
    //     name: foto.filename,
    //     type: foto.type,
    //     uri: foto.uri 
    //   });
    // formData.append('usuarioId', usuarioId);
    // console.log(formData);

    //let imgbase64=  foto != null ?  common.getImageBase64(foto.uri) : null;
    let imgbase64=  foto != null ?  foto.base64 : null;
    return fetchApi(endPoints.crear, { nombre: nombre, email: email, descripcion: descripcion, direccion: direccion, telefono: telefono, foto: imgbase64, usuarioId: usuarioId }, 'post');
}


export const actualizar = (id) =>
    fetchApi(endPoints.actualizar + id, { nombre: nombre, email: email, descripcion: descripcion, direccion: direccion, telefono: telefono, foto: foto }, 'put');


export const eliminar = (id) => fetchApi(endPoints.eliminar + id, {}, 'delete');