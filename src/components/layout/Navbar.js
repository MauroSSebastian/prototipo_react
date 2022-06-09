import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiTwotoneShop } from 'react-icons/ai';

import AuthContext from '../../context/auth/authContext';

const Navbar = ({ icon, title }) => {
	const authContext = useContext(AuthContext);

	const { isAuthenticated, logout } = authContext;

	return (
		<nav className='navbar bg-primary'>
			<Link to='/'>{icon}</Link>

			<h1>{title}</h1>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				{!isAuthenticated && (
					<li>
						<Link to='/login'>Log In</Link>
					</li>
				)}
				{isAuthenticated && (
					<li>
						<Link to='/crearPublicacion'>Crear Publicacion</Link>
					</li>
				)}
				{isAuthenticated && (
					<li>
						<Link to='/inscribirTaller'>Inscribir Taller</Link>
					</li>
				)}
				{isAuthenticated && (
					<li onClick={logout}>
						<Link to='/'>Log Out</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

Navbar.defaultProps = {
	title: ' Feria Virtual de Artesanos',
	icon: <AiTwotoneShop style={{ height: 40, width: 40 }} />,
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
};

export default Navbar;
