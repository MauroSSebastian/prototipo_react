import { LOGIN_SUCCESS, LOGOUT } from '../types';

export default (state, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				isAuthenticated: true,
			};

		case LOGOUT:
			return {
				...state,

				isAuthenticated: false,
			};

		default:
			return state;
	}
};
