import React, { useEffect, Fragment, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import TallerContext from '../../context/taller/tallerContext';

const Taller = ({ match }) => {
	const tallerContext = useContext(TallerContext);
	const { taller, loading, getTaller } = tallerContext;

	useEffect(() => {
		getTaller(match.params.id);
		// eslint-disable-next-line
	}, []);

	const {
		id,
		nombre,
		descripcion,
		image_url,
		categoria,
		horarioDeAtencion,
		numeroDeTelefono,
		direccion,
		actividadesOfrecidas,
	} = taller;

	if (loading) return <Spinner />;
	return (
		<div>
			<Fragment>
				<div className='card grid-2'>
					<div className='all-center'>
						<img src={image_url} className='img' alt='' style={{ width: '70%' }} />
						<h1>{nombre}</h1>
					</div>
					<div>
						<h3>Descripción</h3>
						<p>{descripcion}</p>

						<h3>Horario de Atención</h3>
						<p>{horarioDeAtencion}</p>

						<h3>Número de teléfono</h3>
						<p>{numeroDeTelefono}</p>

						<h3>Direccion</h3>
						<p>{direccion}</p>

						<h3>Actividades Ofrecidas</h3>
						<p>{actividadesOfrecidas}</p>
					</div>
				</div>
				<div className='card text-center'>
					<div className='div badge badge-primary'>Categoría: {categoria}</div>
				</div>
			</Fragment>
			<Fragment>
				<Link to='/' className='btn btn-light all-center'>
					Volver
				</Link>{' '}
			</Fragment>
		</div>
	);
};

export default Taller;
