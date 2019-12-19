import { fetchApi } from "../api";

const endPoints = {
  listadoPorProveedor: "/servicios/listadoPorProveedor/",
  get: "/proveedor/",
  getPremium: "/proveedores/premium",
  crear: "/proveedor",
  actualizar: "/proveedor/",
  eliminar: "/proveedor/"
};
export const get = id => fetchApi(endPoints.get + id, {}, "get");

export const getPremium = id => fetchApi(endPoints.getPremium , {}, "get");

export const getServicios = id =>
  fetchApi(endPoints.listadoPorProveedor + id, {}, "get");

export const listado = () => fetchApi(endPoints.listado, {}, "post");

export const actualizar = (
  nombre,
  email,
  descripcion,
  direccion,
  localidadId,
  telefono,
  fotoNueva,
  proveedorId
) => {
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("email", email);
  formData.append("descripcion", descripcion);
  formData.append("direccion", direccion);
  formData.append("localidadId", localidadId);
  formData.append("telefono", telefono);

  if (fotoNueva != null) {
    let localUri = fotoNueva.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("foto", { uri: localUri, name: filename, type });
  }
  return fetchApi(endPoints.actualizar + proveedorId, formData, "put", true);
};

export const eliminar = id => fetchApi(endPoints.eliminar + id, {}, "delete");

export const crear = (
  nombre,
  email,
  descripcion,
  direccion,
  localidadId,
  telefono,
  foto,
  usuarioId
) => {
  const formData = new FormData();
  formData.append("nombre", nombre);
  formData.append("email", email);
  formData.append("descripcion", descripcion);
  formData.append("direccion", direccion);
  formData.append("localidadId", localidadId);
  formData.append("telefono", telefono);
  formData.append("usuarioId", usuarioId);

  if (foto != null) {
    let localUri = foto.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("foto", { uri: localUri, name: filename, type });
  }
  return fetchApi(endPoints.crear, formData, "post", true);
};
