import {
	SEARCH_TALLERES,
	SET_LOADING,
	CLEAR_TALLERES,
	GET_TALLER,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_TALLER:
			return {
				...state,
				taller: action.payload,
				loading: false,
			};
		case CLEAR_TALLERES:
			return {
				...state,
				talleres: [],
				loading: false,
			};
		case SEARCH_TALLERES:
			return {
				...state,
				talleres: action.payload,
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
