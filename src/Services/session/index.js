import store from '../../Store';
import * as api from './api';
import * as selectors from './selectors';
import * as actionCreators from './actions';
import { initialState } from './reducer';

const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

let sessionTimeout = null;

const setSessionTimeout = (duration) => {
	clearTimeout(sessionTimeout);
	sessionTimeout = setTimeout(
		refreshToken, // eslint-disable-line no-use-before-define
		(duration - SESSION_TIMEOUT_THRESHOLD) * 1000
	);
};

const clearSession = () => {
	clearTimeout(sessionTimeout);
	store.dispatch(actionCreators.update(initialState));
};

const onRequestSuccess = (response) => {
	// const tokens = response.tokens.reduce((prev, item) => ({
	// 	...prev,
	// 	[item.type]: item,
	// // }), {}); 
	if (response.statusType == "success") store.dispatch(actionCreators.update({ tokens: response.data.tokens, user: response.data.user }));
	//setSessionTimeout(tokens.access.expiresIn);
	return response;
};

const onRequestFailed = (exception) => {
	clearSession();
	throw exception;
};

// export const refreshToken = () => {
// 	const session = selectors.get();

// 	if (!session.tokens.refresh.value || !session.user.id) {
// 		return Promise.reject();
// 	}

// 	return api.refresh(session.tokens.refresh, session.user)
// 		.then(onRequestSuccess)
// 		.catch(onRequestFailed);
// };

export const authenticate = (email, password) =>
	api.authenticate(email, password)
		.then(onRequestSuccess)
		.catch(onRequestFailed);

// export const revoke = () => {
// 	const session = selectors.get();
// 	return api.revoke(Object.keys(session.tokens).map(tokenKey => ({
// 		type: session.tokens[tokenKey].type,
// 		value: session.tokens[tokenKey].value,
// 	})))
// 		.then(clearSession())
// 		.catch(() => { });
// };

//TODO traer desde el servidor los datos de expireIn y demas del token.
export const estaLogueado = () => {
	const session = selectors.get();
	return session.user != null && session.user.id > 0;
}
export const usuarioLogueado = () => {
	let session = selectors.get();
	return session.user != null && session.user.id > 0 ? session.user : null;
}
export const avatar = () => {
	if (usuarioLogueado().Proveedor != null) {
		return "data:image/png;base64," + usuarioLogueado().Proveedor.foto;
	}
	if (this.usuarioLogueado().Cliente != null) {
		return "data:image/png;base64," + usuarioLogueado().avatar;
	}
}


export const elegirTipoApp = (tipo) => {
	store.dispatch(actionCreators.update({ tipo: tipo }));
};
export const esAppTipoCliente = () => {
	return selectors.get().tipo == "Cliente";
};


export const esUsuarioTipoCliente = () => {
	return usuarioLogueado() && usuarioLogueado().Cliente != null;
};
export const esUsuarioTipoEmpresa = () => {
	return usuarioLogueado() && usuarioLogueado().Proveedor != null;
};

export const actualizarUsuario = () => {
	console.log("usuairop", usuarioLogueado());
	 return api.actualizarUsuario(usuarioLogueado().id)
		.then(response => {
			let token= selectors.get().tokens;
			let tipo= selectors.get().tipo;
			if (response.statusType == "success"){
				store.dispatch(actionCreators.update({ user: response.data, tokens: token, tipo:tipo }));
				return response;
			} 
		}
		).catch(exception => {
			throw exception;
		}
	);
}