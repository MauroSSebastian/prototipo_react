import { SET_CATEGORIAS, SET_TIPO_PUBLICACION } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_CATEGORIAS:
			return {
				...state,
				categorias: action.payload,
			};
		case SET_TIPO_PUBLICACION:
			return {
				...state,
				tipo_publicacion: action.payload,
			};
		default:
			return state;
	}
};
