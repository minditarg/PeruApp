import * as actionTypes from './actionTypes';

export const actualizar = trabajos =>  ({
	type: actionTypes.ACTUALIZAR,
	data: trabajos
});


export const actualizarCalificados = trabajos =>  ({
	type: actionTypes.ACTUALIZAR_CALIFICADOS,
	data: trabajos
});

export const actualizarSinCalificar = trabajos =>  ({
	type: actionTypes.ACTUALIZAR_SIN_CALIFICAR,
	data: trabajos
});
