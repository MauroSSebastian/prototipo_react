import React, { useContext, useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import PublicacionRadioBtn from './PublicacionRadioBtn';
import FilterContext from '../../context/filter/filterContext';

const Filter = () => {
	const filterContext = useContext(FilterContext);

	const handleVentaChange = () => {
		if (filterContext.tipo_publicacion === 'Venta') {
			filterContext.setFiltroTipoPublicacion('');
		} else {
			filterContext.setFiltroTipoPublicacion('Venta');
		}
	};

	const handleMuestraChange = () => {
		if (filterContext.tipo_publicacion === 'Muestra') {
			filterContext.setFiltroTipoPublicacion('');
		} else {
			filterContext.setFiltroTipoPublicacion('Muestra');
		}
	};

	return (
		<div className='grid-2 m'>
			<CategoryDropdown multOpt={true} isClearable={true} />
			<div className='grid-2'>
				<h2 className='lead all-center'>Tipo Publicación</h2>
				<div className='grid-2'>
					<PublicacionRadioBtn
						label='Venta'
						checked={filterContext.tipo_publicacion === 'Venta'}
						onClick={handleVentaChange}
					/>

					<PublicacionRadioBtn
						label='Muestra'
						checked={filterContext.tipo_publicacion === 'Muestra'}
						onClick={handleMuestraChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default Filter;
