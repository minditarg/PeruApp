import * as actionTypes from './actionTypes';

export const initialState = {
	trabajos: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) { 
		case actionTypes.ACTUALIZAR:
			return {
				...state,
				trabajos: action.data,
			};
		default:
			return state;
	}
};
