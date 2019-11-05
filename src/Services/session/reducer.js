import * as actionTypes from './actionTypes';

export const initialState = {
	tokens: String,
	user: {
		id: null,
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
