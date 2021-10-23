import {
  GET_SERVICIOS,
  UPDATE_SERVICIO,
  DELETE_SERVICIO,
  CREATE_SERVICIO
} from "../Actions/actionsTypes";
import Services from "../../Datos/Services";

const Servicios = (state = [], action) => {
  switch (action.type) {
    case GET_SERVICIOS:
      let Services = getMoviesFromApi();
      state = Services;

      return state;
    case DELETE_SERVICIO:
      return state.map(serv =>
        serv.id === action.id ? { ...serv, activo: "0" } : serv
      );

    case UPDATE_SERVICIO:
      return state.map(serv =>
        serv.id === action.id
          ? {
              ...serv,
              id: action.id,
              tipo: action.tipo,
              descripcion: action.descripcion,
              usuarioId: action.usuarioId,
              imgUrl:
                "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80",
              activo: "1"
            }
          : serv
      );
    case CREATE_SERVICIO:
      return [
        ...state,
        {
          id: action.id,
          tipo: action.tipo,
          descripcion: action.descripcion,
          usuarioId: action.usuarioId,
          imgUrl:
            "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80",
          activo: "1"
        }
      ];
    default:
      return state;
  }
};

export default Servicios;
