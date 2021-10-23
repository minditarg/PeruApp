
import * as api from './api';
import store from '../../Store';
import * as selectors from "./selectors";
import * as actionCreators from './actions';


export const listadoCategorias = () => {
    return api.listadoCategorias().then(response => {
        if (response.statusType == "success") {
            store.dispatch(actionCreators.actualizarCategorias(response.data));
            return response.data;
        }
    })
}

export const listadoLocalidades = () => {
    return api.listadoLocalidades().then(response => {
        if (response.statusType == "success") {
            store.dispatch(actionCreators.actualizarLocalidades(response.data));
            return response.data;
        }
    })
}

export const getStore= () => {
    return selectors.get();
}
