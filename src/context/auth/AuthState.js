import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import { LOGIN_SUCCESS, LOGOUT } from '../types';

const AuthState = props => {
	const initialState = {
		isAuthenticated: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Login User
	const login = async authData => {
		dispatch({
			type: LOGIN_SUCCESS,
		});
	};

	// Logout
	const logout = () => dispatch({ type: LOGOUT });

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: state.isAuthenticated,
				login,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
