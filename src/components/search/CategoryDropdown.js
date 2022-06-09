import React, { Fragment, useState, useContext } from 'react';
import Select from 'react-select';
import FilterContext from '../../context/filter/filterContext';

const CategoryDropdown = props => {
	const filterContext = useContext(FilterContext);

	//Leer datos de categorias desde el repositorio
	const leerCategorias = () => {
		const data = require('../../repositorios/categorias/categoriasData.json');

		return data;
	};

	const categoriasData = leerCategorias();

	const opciones = categoriasData.data.items.map(categoria => {
		return {
			value: categoria.nombre,
			label: categoria.nombre,
		};
	});

	const [selectedOption, setOptions] = useState(null);

	const handleChange = selectedOption => {
		filterContext.setFiltroCategorias(selectedOption);
		if (props.onSelect) {
			props.onSelect(selectedOption);
		}
	};

	return (
		<Fragment>
			<Select
				className='basic-single'
				classNamePrefix='select'
				isDisabled={false}
				isLoading={false}
				isClearable={props.isClearable}
				isRtl={false}
				isSearchable={true}
				name='cateogria'
				options={opciones}
				isMulti={props.multOpt}
				placeholder='Categoría'
				onChange={handleChange}
			/>
		</Fragment>
	);
};

export default CategoryDropdown;
