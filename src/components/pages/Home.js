import React, { Fragment, useState } from 'react';
import Publicaciones from '../publicaciones/Publicaciones';
import Talleres from '../talleres/Talleres';

const Home = () => {
	const [buscarPublicaciones, setBuscarPublicaciones] = useState(true);
	const [buscarTalleres, setBuscarTalleres] = useState(false);

	const handleOnclik = e => {
		if (e.target.id === 'btnPublicaciones') {
			setBuscarPublicaciones(true);
			setBuscarTalleres(false);
		} else {
			setBuscarPublicaciones(false);
			setBuscarTalleres(true);
		}
	};

	return (
		<div>
			<div className='grid-2'>
				<button
					id='btnPublicaciones'
					className='btn btn-light btn-block'
					onClick={handleOnclik}
				>
					Buscar Publicaciones
				</button>
				<button
					id='btnTalleres'
					className='btn btn-light btn-block'
					onClick={handleOnclik}
				>
					Buscar Talleres
				</button>
			</div>
			<Fragment>
				{buscarPublicaciones && <Publicaciones />}
				{buscarTalleres && <Talleres />}
			</Fragment>
		</div>
	);
};

export default Home;
