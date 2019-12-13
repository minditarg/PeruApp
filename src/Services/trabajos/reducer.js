import * as actionTypes from './actionTypes';

export const initialState = {
	trabajos: [],
	trabajosSinCalificar: [],
	trabajosCalificados: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ACTUALIZAR:
			return {
				...state,
				trabajos: action.data,
			};
		case actionTypes.ACTUALIZAR_CALIFICADOS:
			return {
				...state,
				trabajosCalificados: action.data,
			};
		case actionTypes.ACTUALIZAR_SIN_CALIFICAR:
			return {
				...state,
				trabajosSinCalificar: action.data,
			};
		default:
			return state;
	}
};
