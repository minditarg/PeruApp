import { fetchApi } from '../api';

const endPoints = {
    crear: '/registrar',
};


export const crear = (email, password) =>
    fetchApi(endPoints.crear, { email: email, password: password}, 'post');
