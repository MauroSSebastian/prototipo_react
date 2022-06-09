import React from 'react';
import PropTypes from 'prop-types';

const TallerItem = ({
	taller: {
		nombre,
		categoria,
		direccion,
		horarioDeAtencion,
		numeroDeTelefono,
		id,
	},
}) => {
	return (
		<div id={id}>
			<h3 id={id}>{nombre}</h3>
			<p id={id}>{categoria}</p>
			<p id={id}>{direccion}</p>
			<p id={id}>{horarioDeAtencion}</p>
			<p id={id}>{numeroDeTelefono}</p>
		</div>
	);
};

TallerItem.propTypes = {
	taller: PropTypes.object.isRequired,
};

export default TallerItem;
