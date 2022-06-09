import {
	SEARCH_PUBLICACIONES,
	SET_LOADING,
	CLEAR_PUBLICACIONES,
	GET_PUBLICACION,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_PUBLICACION:
			return {
				...state,
				publicacion: action.payload,
				loading: false,
			};
		case CLEAR_PUBLICACIONES:
			return {
				...state,
				publicaciones: [],
				loading: false,
			};
		case SEARCH_PUBLICACIONES:
			return {
				...state,
				publicaciones: action.payload,
				loading: false,
			};
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};
