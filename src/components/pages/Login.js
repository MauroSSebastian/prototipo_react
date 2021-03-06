import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
	const authContext = useContext(AuthContext);
	const { login, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}
	});

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const { email, password } = user;

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		login();
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Login</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Dirección de mail</label>
					<input
						id='email'
						type='email'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Constraseña</label>
					<input
						id='password'
						type='password'
						name='password'
						value={password}
						onChange={onChange}
						required
					/>
				</div>
				<input type='submit' value='Login' className='btn btn-primary btn-block' />
			</form>
		</div>
	);
};

export default Login;
