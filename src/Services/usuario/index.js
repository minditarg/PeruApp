
import * as api from './api';
import * as session from '../session';


export const crear = (email, password) => { 
    return api.crear(email, password,session.esAppTipoCliente()); 
}

export const recuperarPassword = (email) =>
     api.recuperarPassword(endPoints.recuperarPassword, { email: email }, 'post');

export const cambiarPassword = (codigo, password, passwordConfirm) =>
    api.cambiarPassword(endPoints.recuperar, { codigo, password, passwordConfirm }, 'post');
