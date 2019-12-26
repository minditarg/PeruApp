import { fetchApi } from '../api';

const endPoints = {
    crear: '/registrar',
    recuperarPassword: '/usuario/recuperarPassword',
    cambiarPassword: '/usuario/cambiarPassword'
};


export const crear = (email, password, esCliente) =>
    fetchApi(endPoints.crear, { email: email, password: password, esCliente: esCliente }, 'post');


export const recuperarPassword = (email) =>
    fetchApi(endPoints.recuperarPassword, { email: email }, 'post');

export const cambiarPassword = (codigo, password, passwordConfirm) =>
    fetchApi(endPoints.recuperar, { codigo, password, passwordConfirm }, 'post');
