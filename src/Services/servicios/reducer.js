import * as actionTypes from './actionTypes';

export const initialState = {
	servicios: [],
	categorias:  [],
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ACTUALIZAR_SERVICIOS:
			return {
				...state,
				servicios: action.data,
			};
		case actionTypes.ACTUALIZAR_CATEGORIAS:
			return {
				...state,
				categorias: action.data,
			};
		default:
			return state;
	}
};
