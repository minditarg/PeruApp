import { fetchApi } from '../api';

const endPoints = {
    listadoCategorias: '/categorias',
    listadoLocalidades: '/localidades',
};

export const listadoCategorias = () => fetchApi(endPoints.listadoCategorias, {}, 'get');

export const listadoLocalidades = () => fetchApi(endPoints.listadoLocalidades, {}, 'get');