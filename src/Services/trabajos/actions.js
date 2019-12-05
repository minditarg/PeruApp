import * as actionTypes from './actionTypes';

export const actualizar = trabajos =>  ({
	type: actionTypes.ACTUALIZAR,
	data: trabajos
});

export const loading = () => {
    return {type: actionTypes.FETCHING_DATA}
}
