
import * as api from './api';
import * as session from '../session';


export const crear = (email, password) => { 
    return api.crear(email, password,session.esAppTipoCliente()); 
}