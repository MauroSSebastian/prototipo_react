import React, { useReducer, useContext, useState } from 'react';
import PublicacionContext from './publicacionContext';
import PublicacionReducer from './publicacionReducer';
import FilterContext from '../filter/filterContext';

import {
	SEARCH_PUBLICACIONES,
	SET_LOADING,
	CLEAR_PUBLICACIONES,
	GET_PUBLICACION,
} from '../types';

const PublicacionState = props => {
	const initialState = {
		publicaciones: [],
		publicacion: {},
		loading: false,
	};

	const filterContext = useContext(FilterContext);

	const [state, dispatch] = useReducer(PublicacionReducer, initialState);

	//Leer datos de publicaciones desde el repositorio
	const leerPublicaciones = () => {
		//Se buscan las publicaciones en el localStorage
		var data = JSON.parse(localStorage.getItem('publicaciones'));

		//Si no existen publicaciones, se obtienen del repositorio
		if (!data) {
			data = require('../../repositorios/publicaciones/publicacionesData.json');
		}

		return data;
	};

	// Search publicaciones
	const searchPublicaciones = async text => {
		setLoading();
		setTimeout(() => {
			const catList = filterContext.categorias.map(categoria => {
				return categoria.value;
			});

			const publicacionesData = leerPublicaciones();

			const res = publicacionesData.data.items.filter(item => {
				if (catList.length > 0 && filterContext.tipo_publicacion !== '') {
					return (
						item.nombre.toLowerCase().indexOf(text.toLowerCase()) !== -1 &&
						item.tipo === filterContext.tipo_publicacion &&
						catList.includes(item.categoria)
					);
				} else if (catList.length > 0 && filterContext.tipo_publicacion === '') {
					return (
						(item.nombre.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
							item.categoria.toLowerCase().indexOf(text.toLowerCase()) !== -1) &&
						catList.includes(item.categoria)
					);
				} else if (catList.length === 0 && filterContext.tipo_publicacion !== '') {
					return (
						(item.nombre.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
							item.categoria.toLowerCase().indexOf(text.toLowerCase()) !== -1) &&
						item.tipo === filterContext.tipo_publicacion
					);
				} else {
					return (
						item.nombre.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
						item.categoria.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
						item.tipo.toLowerCase().indexOf(text.toLowerCase()) !== -1
					);
				}
			});

			dispatch({
				type: SEARCH_PUBLICACIONES,
				payload: res,
			});
		}, 2000);
	};

	// Get Publicacion
	const getPublicacion = async id => {
		setLoading();

		const publicacionesData = leerPublicaciones();

		const res = publicacionesData.data.items.find(item => {
			return item.id == id;
		});

		dispatch({
			type: GET_PUBLICACION,
			payload: res,
		});
	};

	// Clear Publicaciones
	const clearPublicaciones = () => dispatch({ type: CLEAR_PUBLICACIONES });

	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<PublicacionContext.Provider
			value={{
				publicaciones: state.publicaciones,
				publicacion: state.publicacion,
				loading: state.loading,
				searchPublicaciones,
				clearPublicaciones,
				getPublicacion,
			}}
		>
			{props.children}
		</PublicacionContext.Provider>
	);
};
export default PublicacionState;
