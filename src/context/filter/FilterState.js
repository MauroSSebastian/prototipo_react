import React, { useReducer } from 'react';
import FilterContext from './filterContext';
import FilterReducer from './filterReducer';
import { SET_CATEGORIAS, SET_TIPO_PUBLICACION } from '../types';

const FilterState = props => {
	const initialState = {
		categorias: [],
		tipo_publicacion: '',
	};

	const [state, dispatch] = useReducer(FilterReducer, initialState);

	// Set categorias para filtrar
	const setFiltroCategorias = async categoria => {
		dispatch({
			type: SET_CATEGORIAS,
			payload: categoria,
		});
	};

	// Set tipo publicacion a filtrar
	const setFiltroTipoPublicacion = async publicacion => {
		dispatch({
			type: SET_TIPO_PUBLICACION,
			payload: publicacion,
		});
	};

	return (
		<FilterContext.Provider
			value={{
				categorias: state.categorias,
				tipo_publicacion: state.tipo_publicacion,
				setFiltroCategorias,
				setFiltroTipoPublicacion,
			}}
		>
			{props.children}
		</FilterContext.Provider>
	);
};
export default FilterState;
