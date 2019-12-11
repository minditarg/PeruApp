import * as actionTypes from './actionTypes';

export const actualizarServicios = servicios =>  ({
	type: actionTypes.ACTUALIZAR_SERVICIOS,
	data: servicios
});

export const actualizarCategorias = categorias =>  ({
	type: actionTypes.ACTUALIZAR_CATEGORIAS,
	data: categorias
});
