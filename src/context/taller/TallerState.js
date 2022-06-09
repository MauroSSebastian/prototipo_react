import React, { useReducer, useContext } from 'react';
import TallerContext from './tallerContext';
import TallerReducer from './tallerReducer';
import FilterContext from '../filter/filterContext';
import {
	SET_LOADING,
	SEARCH_TALLERES,
	GET_TALLER,
	CLEAR_TALLERES,
} from '../types';

const TallerState = props => {
	const initialState = {
		talleres: [],
		taller: {},
		loading: false,
	};

	const filterContext = useContext(FilterContext);

	const [state, dispatch] = useReducer(TallerReducer, initialState);

	//Leer datos de talleres desde el repositorio
	const leerTalleres = () => {
		//Se buscan los talleres en el localStorage
		var dataTalleres = JSON.parse(localStorage.getItem('talleres'));

		//Si no existen talleres, se obtienen del repositorio
		if (!dataTalleres) {
			dataTalleres = require('../../repositorios/talleres/talleresData.json');
		}

		return dataTalleres.data.items;
	};

	// Search Talleres
	const searchTalleres = async text => {
		setLoading();
		setTimeout(() => {
			const catList = filterContext.categorias.map(categoria => {
				return categoria.value;
			});

			const talleresData = leerTalleres();

			const res = talleresData.filter(item => {
				if (catList.length > 0) {
					return (
						item.nombre.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
						item.descripcion.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
						catList.includes(item.categoria)
					);
				} else {
					return (
						item.nombre.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
						item.categoria.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
						item.descripcion.toLowerCase().indexOf(text.toLowerCase()) !== -1
					);
				}
			});

			dispatch({
				type: SEARCH_TALLERES,
				payload: res,
			});
		}, 2000);
	};

	// Get Taller
	const getTaller = async id => {
		setLoading();

		const talleresData = leerTalleres();

		const res = talleresData.find(item => {
			return item.id == id;
		});

		dispatch({
			type: GET_TALLER,
			payload: res,
		});

		return res;
	};

	// Clear Talleres
	const clearTalleres = () => dispatch({ type: CLEAR_TALLERES });

	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<TallerContext.Provider
			value={{
				talleres: state.talleres,
				taller: state.taller,
				loading: state.loading,
				searchTalleres,
				clearTalleres,
				getTaller,
				leerTalleres,
			}}
		>
			{props.children}
		</TallerContext.Provider>
	);
};
export default TallerState;
