import { fetchApi } from '../api';
import apiConfig from '../api/config';

const endPoints = {
	authenticate: '/login',
	// revoke: '/users/auth/revoke',
	// refresh: '/users/auth/refresh',
	actulizarUsuario: '/usuario/perfil/',
};

export const authenticate = (email, password) => fetchApi(endPoints.authenticate, { email: email, password: password}, 'post' );

export const actualizarUsuario =(idUsuario) => {
	return fetchApi(endPoints.actulizarUsuario + idUsuario, {  }, 'get');
}
// export const refresh = (token, user) => fetchApi(endPoints.refresh, { token, user }, 'post', {
// 	'Client-ID': apiConfig.clientId,
// 	Authorization: null,
// });

// export const revoke = tokens => fetchApi(endPoints.revoke, { tokens }, 'post');
