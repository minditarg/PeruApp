import store from "../../Store";
import * as api from "./api";
import * as selectors from "./selectors";
import * as actionCreators from "./actions";
import { initialState } from "./reducer";
import apiConfig from "../api/config";
import { AsyncStorage } from 'react-native';


const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

let sessionTimeout = null;

const deleteTokenEnStore = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
  }
};
const saveTokenEnStore = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
  }
};
const getTokenEnStore = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
  }
};

const saveTipoSesionEnStore = async (tipo) => {
  try {
    await AsyncStorage.setItem('TipoSesion', tipo);
  } catch (error) {
  }
};
const getTipoSesionEnStore = async () => {
  try {
    return await AsyncStorage.getItem('TipoSesion');
  } catch (error) {
  }
};

const setSessionTimeout = duration => {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(
    refreshToken, // eslint-disable-line no-use-before-define
    (duration - SESSION_TIMEOUT_THRESHOLD) * 1000
  );
};

const clearSession = () => {
  //clearTimeout(sessionTimeout);
  store.dispatch(actionCreators.update(initialState));
  deleteTokenEnStore();
};


const onRequestSuccess = response => {
  // const tokens = response.tokens.reduce((prev, item) => ({
  // 	...prev,
  // 	[item.type]: item,
  // // }), {});
  if (response.statusType == "success") {
    store.dispatch(
      actionCreators.update({
        tokens: response.data.tokens,
        user: response.data.user
      })
    );
    saveTokenEnStore(response.data.tokens);
  }
  //setSessionTimeout(tokens.access.expiresIn);
  return response;
};

const onRequestFailed = exception => {
  clearSession();
  throw exception;
};

export const guardarToken = (token) => { 
  store.dispatch(
    actionCreators.update({
      tokens: token,
    })
  );
    saveTokenEnStore(token);
    return estaLogueado();
}


export const authenticate = (email, password) =>
  api
    .authenticate(email, password)
    .then(onRequestSuccess)
    .catch(onRequestFailed);

export const logout = () => {
  clearSession();
};


//TODO traer desde el servidor los datos de expireIn y demas del token.
export const estaLogueado = () => {
  const session = selectors.get();
  if ((session != null && session.user != null && session.user.id)) return true;
  else {
    return getTokenEnStore().then(response => {
      store.dispatch(
        actionCreators.update({
          tokens: response,
        })
      );
      if (response != null) {
        return api.actualizarUsuarioConToken()
          .then(response => {
            let token = selectors.get().tokens;
            if (response.statusType == "success") {
              store.dispatch(
                actionCreators.update({
                  user: response.data,
                  tokens: token,
                  tipo: response.data.esCliente ? "Cliente" : "Proveedor"
                })
              );
              return true;
            }
          });
      }
      return false;
    }).catch(exception => {
      throw exception;
    });
  }
};
export const usuarioLogueado = () => {
  let session = selectors.get();
  {
    return (session != null && session.user != null && session.user.id) ? session.user : null;
  }
};
export const avatar = () => {
  if (esUsuarioTipoEmpresa()) {
    return apiConfig.pathFiles + usuarioLogueado().Proveedor.foto;
  }
  if (esUsuarioTipoCliente()) {
    return apiConfig.pathFiles  + usuarioLogueado().avatar;
  } else {
    return require("../../../assets/noFoto.png");
  }
};

export const elegirTipoApp = tipo => {
  console.log("tipo de appp", tipo);
  saveTipoSesionEnStore(tipo);
  store.dispatch(actionCreators.update({ tipo: tipo }));
};
export const esAppTipoCliente = () => {
  return getTipoSesionEnStore().then(res=>{
    return selectors.get().tipo == "Cliente" | res == "Cliente";
  });
  
};

export const esUsuarioTipoCliente = () => {
  return usuarioLogueado() && usuarioLogueado().esCliente;
};
export const esUsuarioTipoEmpresa = () => {
  return usuarioLogueado() && usuarioLogueado().Proveedor != null ;
};

export const actualizarUsuario = () => {
  return api
    .actualizarUsuario(usuarioLogueado().id)
    .then(response => {
      let token = selectors.get().tokens;
      let tipo = selectors.get().tipo;
      if (response.statusType == "success") {
        store.dispatch(
          actionCreators.update({
            user: response.data,
            tokens: token,
            tipo: tipo
          })
        );
        return response;
      }
    })
    .catch(exception => {
      throw exception;
    });
};

export const actualizarProveedorEnStore = proveedor => {
  let token = selectors.get().tokens;
  let tipo = selectors.get().tipo;
  let usuario = selectors.get().user;
  usuario.Proveedor = proveedor;
  store.dispatch(
    actionCreators.update({ user: usuario, tokens: token, tipo: tipo })
  );
  return true;
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


// export const revoke = () => {
// 	const session = selectors.get();
// 	return api.revoke(Object.keys(session.tokens).map(tokenKey => ({
// 		type: session.tokens[tokenKey].type,
// 		value: session.tokens[tokenKey].value,
// 	})))
// 		.then(clearSession())
// 		.catch(() => { });
// };