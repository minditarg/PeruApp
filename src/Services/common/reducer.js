import * as actionTypes from './actionTypes';

export const initialState = {
	localidades: [],
	categorias:  [],
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ACTUALIZAR_LOCALIDADES:
			return {
				...state,
				localidades: action.data,
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
