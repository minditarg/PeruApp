import * as actionTypes from './actionTypes';

export const actualizarLocalidades = localidades =>  ({
	type: actionTypes.ACTUALIZAR_LOCALIDADES,
	data: localidades
});

export const actualizarCategorias = categorias =>  ({
	type: actionTypes.ACTUALIZAR_CATEGORIAS,
	data: categorias
});
