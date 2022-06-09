import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PublicacionItem = ({
	publicacion: { nombre, image_url, id, categoria, tipo, precio },
}) => {
	return (
		<div className='card text-center'>
			<img src={image_url} alt='' className='round-img' style={{ width: '50%' }} />
			<h3>{nombre}</h3>
			<h4>Categoria</h4>
			<p>{categoria}</p>
			<h4>Tipo Publicación</h4>
			<p>{tipo}</p>
			{precio && <p>$ {precio}</p>}

			<div>
				<Link to={`/publicacion/${id}`} className='btn btn-dark btn-sm my-1'>
					Ver Publicación
				</Link>
			</div>
		</div>
	);
};

PublicacionItem.propTypes = {
	publicacion: PropTypes.object.isRequired,
};

export default PublicacionItem;
