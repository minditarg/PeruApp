
import * as api from './api';
import * as session from '../session';


export const listado = () => api.listado()
export const crear = (nombre,email,descripcion,direccion,telefono,foto) =>
     api.crear(nombre,email,descripcion,direccion,telefono,foto, 1);
//session.usuarioLogueado().id
// const formData = new FormData();
//     formData.append('photo', {
//       uri,
//       name: `photo.${fileType}`,
//       type: `image/${fileType}`,
//     });