import * as actionTypes from './actionTypes';

export const initialState = {
	servicios: [],
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ACTUALIZAR_SERVICIOS:
			return {
				...state,
				servicios: action.data,
			};
		default:
			return state;
	}
};
