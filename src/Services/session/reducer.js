import * as actionTypes from './actionTypes';

export const initialState = {
	tipo: "",
	tokens: String,
	user: {
		
	},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return {
				...action.session,
			};
		default:
			return state;
	}
};
