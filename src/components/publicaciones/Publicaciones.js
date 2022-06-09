import React, { useContext } from 'react';
import PublicacionItem from './PublicacionItem';
import Spinner from '../layout/Spinner';
import Search from '../search/Search';
import Filter from '../search/Filter';
import PublicacionContext from '../../context/publicacion/publicacionContext';

const Publicaciones = () => {
	const publicacionContext = useContext(PublicacionContext);

	const { loading, publicaciones } = publicacionContext;

	if (loading) {
		return (
			<div>
				<Filter />
				<Spinner />;
			</div>
		);
	} else {
		return (
			<div>
				<Search />
				<Filter />
				{publicacionContext.publicaciones.length > 0 && (
					<h1 className='form-text all-center '>Publicaciones</h1>
				)}
				<div style={userStyle}>
					{publicaciones.map(publicacion => (
						<PublicacionItem key={publicacion.id} publicacion={publicacion} />
					))}
				</div>
			</div>
		);
	}
};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem',
};

export default Publicaciones;
