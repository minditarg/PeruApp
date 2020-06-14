
import * as api from './api';
import * as session from '../session';


export const crear = (email, password) => { 
  return session.esAppTipoCliente().then(res=>{
    return api.crear(email, password,res); 
  });
}

export const recuperarPassword = (email) =>
     api.recuperarPassword( email);

export const cambiarPassword = (email,codigo, password, passwordConfirm) =>
    api.cambiarPassword(email,codigo, password, passwordConfirm );
