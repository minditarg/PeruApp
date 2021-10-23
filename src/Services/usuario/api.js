import { fetchApi } from '../api';

const endPoints = {
    crear: '/registrar',
    recuperarPassword: '/usuario/recuperarPassword',
    cambiarPassword: '/usuario/cambiarPassword',
    actualizarPassword: '/usuario/actualizarPassword/'
};


export const crear = (email, password, esCliente) =>
    fetchApi(endPoints.crear, { email: email, password: password, esCliente: esCliente }, 'post');


export const recuperarPassword = (email) =>
    fetchApi(endPoints.recuperarPassword, { email: email }, 'post');

export const cambiarPassword = (email, codigo, password, passwordConfirm) =>
    fetchApi(endPoints.cambiarPassword, {email, codigo, password, passwordConfirm }, 'post');

    export const actualizarPassword = (email, password, passwordConfirm) =>
    fetchApi(endPoints.actualizarPassword, {email, password, passwordConfirm }, 'post');