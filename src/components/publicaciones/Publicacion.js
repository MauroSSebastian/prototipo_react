import React, { useEffect, Fragment, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import PublicacionContext from '../../context/publicacion/publicacionContext';

const Publicacion = ({ match }) => {
	const publicacionContext = useContext(PublicacionContext);
	const { publicacion, loading, getPublicacion } = publicacionContext;

	useEffect(() => {
		getPublicacion(match.params.id);
		// eslint-disable-next-line
	}, []);

	if (loading) return <Spinner />;
	return (
		<Fragment>
			<div className='card grid-2'>
				<div className='all-center'>
					<img
						src={publicacion.image_url}
						className='round-img'
						alt=''
						style={{ width: '50%' }}
					/>
					<h1>{publicacion.nombre}</h1>
				</div>
				<div>
					<h3>Id Publicación</h3>
					<p>{publicacion.id}</p>

					<h3>Descripción</h3>
					<p>{publicacion.descripcion}</p>

					<h3>Información de contacto</h3>
					<p>{publicacion.informacionContacto}</p>

					{publicacion.formaComercializacion && (
						<div>
							<h3>Forma de comercialización</h3>
							<p>{publicacion.formaComercializacion}</p>
						</div>
					)}
					{publicacion.precio && (
						<div>
							<h3>Precio</h3>
							<p>$ {publicacion.precio}</p>
						</div>
					)}
				</div>
			</div>
			<div className='card text-center'>
				<div className='div badge badge-primary'>
					Categoría: {publicacion.categoria}
				</div>
				<div className='div badge badge-success'>
					Tipo publicación: {publicacion.tipo}
				</div>
			</div>
			<Link to='/' className='btn btn-light all-center'>
				Volver
			</Link>{' '}
		</Fragment>
	);
};

export default Publicacion;
