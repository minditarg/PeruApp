import { fetchApi } from '../api';

const endPoints = {
    crear: '/registrar',
};


export const crear = (email, password, esCliente) =>
    fetchApi(endPoints.crear, { email: email, password: password, esCliente: esCliente}, 'post');
