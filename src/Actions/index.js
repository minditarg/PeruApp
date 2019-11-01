import {
  LOGIN,
  CREATE_USER,
  UPDATE_USER,
  GET_SERVICIOS,
  UPDATE_SERVICIO,
  DELETE_SERVICIO,
  CREATE_SERVICIO,
  GET_TRABAJOS,
  UPDATE_TRABAJO,
  DELETE_TRABAJO,
  CREATE_TRABAJO,
  APP_CHOOSE_TYPE,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  LOAD_TOKEN_USER
} from "./actionsTypes";

export const AppType = tipo => ({
  type: APP_CHOOSE_TYPE,
  payload: tipo
});

export const Login = User => ({
  type: LOGIN,
  payload: User
});
export const CreateUser = User => ({
  type: CREATE_USER,
  payload: User
});
export const UpdateUser = User => ({
  type: UPDATE_USER,
  payload: User
});

export const GetServicios = UserId => ({
  type: GET_SERVICIOS,
  payload: UserId
});

export const UpdateServicio = ServicioId => ({
  type: UPDATE_SERVICIO,
  payload: ServicioId
});

export const DeleteServicio = ServicioId => ({
  type: DELETE_SERVICIO,
  payload: ServicioId
});

export const CreateServicio = Servicio => ({
  type: CREATE_SERVICIO,
  payload: Servicio
});

export const GetTrabajos = UserId => ({
  type: GET_TRABAJOS,
  payload: UserId
});

export const UpdateTrabajo = TrabajoId => ({
  type: UPDATE_TRABAJO,
  payload: TrabajoId
});

export const DeleteTrabajo = TrabajoId => ({
  type: DELETE_TRABAJO,
  payload: TrabajoId
});

export const CreateTrabajo = Trabajo => ({
  type: CREATE_TRABAJO,
  payload: Trabajo
});

export const fetchPendiente = () => ({
  type: FETCH_PRODUCTS_PENDING
});
export const fetchSucces = data => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: data
});
export const fetchError = err => ({
  type: FETCH_PRODUCTS_ERROR,
  payload: err
});
export const loadTokenUser = token => ({
  type: LOAD_TOKEN_USER,
  payload: token
});
