import React, { useContext, useState } from 'react';
import PublicacionContext from '../../context/publicacion/publicacionContext';
import TallerContext from '../../context/taller/tallerContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
	const publicacionContext = useContext(PublicacionContext);
	const tallerContext = useContext(TallerContext);
	const alertContext = useContext(AlertContext);

	const [text, setText] = useState('');

	const onChange = e => setText(e.target.value);

	const onSubmit = e => {
		e.preventDefault();
		if (text === '') {
			alertContext.setAlert('Por favor ingrese un criterio de búsqueda', 'light');
		} else {
			publicacionContext.searchPublicaciones(text);
			tallerContext.searchTalleres(text);
			setText('');
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit} className='form'>
				<input
					type='text'
					name='text'
					placeholder='Buscar...'
					value={text}
					onChange={onChange}
				/>
				<input type='submit' value='Buscar' className='btn btn-dark btn-block' />
			</form>
			{(publicacionContext.publicaciones.length > 0 ||
				tallerContext.talleres.length > 0) && (
				<button
					className='btn btn-light btn-block'
					onClick={() => {
						tallerContext.clearTalleres();
						publicacionContext.clearPublicaciones();
					}}
				>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;
