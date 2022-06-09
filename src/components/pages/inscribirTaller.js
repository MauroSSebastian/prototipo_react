import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import UbicacionEnMapa from './../talleres/UbicacionEnMapa';
import CategoryDropdown from '../search/CategoryDropdown';
import { useHistory } from 'react-router-dom';

const InscribirTaller = props => {
	const alertContext = useContext(AlertContext);
	const history = useHistory();
	const [taller, setTaller] = useState({
		nombre: '',
		descripcion: '',
		actividades: '',
		direccion: '',
		horarios: '',
		telefono: '',
	});

	const { nombre, descripcion, actividades, direccion, horarios, telefono } =
		taller;

	const MAX_ADDRESS_NORMALIZED = 10;

	const [form, setform] = useState(true);
	const [hasCreated, setHasCreated] = useState(false);
	const [disableNomalized, setDisableNomalized] = useState(true);
	const [category, setCategory] = useState('');
	const [addressNormalized, setAddressNormalized] = useState([]);
	const [addressIncorrect, setAddressIncorrect] = useState(false);
	const [files, setFiles] = useState([]);
	const [addressSelect, setAddressSelect] = useState({
		altura: '',
		cod_calle: '',
		cod_calle_cruce: '',
		cod_partido: '',
		coordenadas: '',
		direccion: '',
		nombre_calle: '',
		nombre_calle_cruce: '',
		nombre_localidad: '',
		nombre_partido: '',
		tipo: '',
	});

	const onChange = e => {
		if (e.target.name === 'direccion') {
			setDisableNomalized(false);
		}
		setTaller({ ...taller, [e.target.name]: e.target.value });
	};

	const onNormalize = async event => {
		event.preventDefault();
		let res = await fetch(
			`http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccion}&maxOptions=${MAX_ADDRESS_NORMALIZED}&geocodificar=true`
		);
		let jsonData = await res.json();
		let resultAddress = jsonData.direccionesNormalizadas;
		if (resultAddress.length > 0  && resultAddress[0].tipo !== 'calle') {
			if (resultAddress.length === 1) {
				setAddressSelect(resultAddress[0]);
			} else {
				setAddressNormalized(resultAddress);
			}
		} else {
			setAddressIncorrect(true);
		}
	};

	const handleAddressNormalized = event => {
		const index = event.target.value;
		setAddressSelect(addressNormalized[index]);
		setAddressIncorrect(false);
	};

	const onSubmit = event => {
		event.preventDefault();
		setform(false);
		setHasCreated(true);
		alertContext.setAlert(
			'Taller inscripto correctamente, pendiente de aprobación',
			'success'
		);
	};

	const onSelectCategory = selectedOption => {
		setCategory(selectedOption.value);
	};

	const uploadFile = event => {
		const uploadFiles = event.target.files;
		const uploadFilesArr = Array.prototype.slice.call(uploadFiles);
		uploadFilesArr.map(file => {
			file.url = URL.createObjectURL(file);
		});
		setFiles([...files, ...uploadFilesArr]);
	};

	return (
		<div>
			<div className='form-container'>
				<h1>
					Nuevo <span className='text-primary'>Taller</span>
				</h1>
				{form && (
					<form onSubmit={onSubmit}>
						<div className='form-group'>
							<label htmlFor='nombre'>Nombre del taller</label> 
							<span style={{color:'red', fontWeight: 'bold'}}> * </span>
							<input
								id='nombre'
								type='text'
								name='nombre'
								value={nombre}
								onChange={onChange}
								required
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='descripcion'>Descripción</label>
							<span style={{color:'red', fontWeight: 'bold'}}> * </span>
							<input
								id='descripcion'
								type='text'
								name='descripcion'
								value={descripcion}
								onChange={onChange}
								required
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='categoria'>Categoría</label>
							<span style={{color:'red', fontWeight: 'bold'}}> * </span>
						</div>
						<div className='form-group'>
							<CategoryDropdown
								multOpt={false}
								onSelect={onSelectCategory}
								isClearable={false}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='actividades'>Actividades ofrecidas</label>
							<span style={{color:'red', fontWeight: 'bold'}}> * </span>
							<input
								id='actividades'
								type='text'
								name='actividades'
								value={actividades}
								onChange={onChange}
								required
							/>
						</div>
						<div className='form-group'>
							<div>
								<label htmlFor='direccion'>Dirección</label>
								<span style={{color:'red', fontWeight: 'bold'}}> * </span>
								{addressIncorrect && (
									<h5 style={{ color: 'red' }}>Verifique la dirección</h5>
								)}
								<input
									id='direccion'
									type='text'
									name='direccion'
									value={
										addressSelect.direccion === '' ? direccion : addressSelect.direccion
									}
									onChange={onChange}
									required
								/>
								<button
									className='btn btn-primary btn-sm'
									onClick={onNormalize}
									disabled={disableNomalized}
								>
									Normalizar dirección
								</button>
							</div>
							{addressNormalized.length > 0 && addressNormalized[0].tipo !== 'calle' && (
								<div className='form-group'>
									<label htmlFor='PublicacionRadioBtn'>
										Selecciona la dirección correcta
									</label>
									<div
										onChange={handleAddressNormalized}
										style={{ border: '0.15rem groove', borderRadius: '0.2rem' }}
									>
										{addressNormalized.map((item, i) => {
											if(item.tipo !== 'calle'){											
												return (
													<div>
														<div key={i}>
															<input
																type='radio'
																key={i}
																value={i}
																name='direccionNormalizada'
																className='radio-button'
															/>
															{item.direccion}
														</div>														
													</div>
													
												);
											}
										})										
										}										
									</div>
								</div>
							)}
						</div>
						<div className='form-group'>
							<label htmlFor='horarios'>Horarios</label>
							<span style={{color:'red', fontWeight: 'bold'}}> * </span>
							<input
								id='horarios'
								type='text'
								name='horarios'
								value={horarios}
								onChange={onChange}
								required
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='telefono'>Teléfono de contacto</label>
							<span style={{color:'red', fontWeight: 'bold'}}> * </span>
							<input
								id='telefono'
								type='text'
								name='telefono'
								value={telefono}
								onChange={onChange}
								required
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='fotos'>Fotos</label>
							<br />
							<input
								id='file'
								type='file'
								name='file'
								onChange={uploadFile}
								multiple
							/>
						</div>
						<div className='buttons'>							
							<button
								disabled={addressSelect.direccion === ''}
								className='btn btn-primary btn-block'
							>
								Crear
							</button>
							<button
								className='btn btn-primary btn-block'
								onClick={() => history.goBack()}
							>
								Cancelar
							</button>
						</div>
					</form>
				)}

				{hasCreated && (
					<div>
						<br />
						<ul>
							<li>
								<b>Nombre del artículo:</b> {nombre}
							</li>
							<li>
								<b>Descripción:</b> {descripcion}
							</li>
							<li>
								<b>Categoria:</b> {category}
							</li>
							<li>
								<b>Actividades ofrecidas:</b> {actividades}
							</li>
							<li>
								<b>Dirección:</b> {addressSelect.direccion}
							</li>
							<li>
								<b>Horarios:</b> {horarios}
							</li>
							<li>
								<b>Teléfono de contacto:</b> {telefono}
							</li>
							{files.length>0 && files.map((file, i) => (
								<li key={i}>
									<img src={file.url} alt={file.name} />
								</li>
							))}
							<br />
							<br />
							<UbicacionEnMapa
								ubicacion={{
									lat: addressSelect.coordenadas.y,
									long: addressSelect.coordenadas.x,
								}}
								nombre={nombre}
								direccion={addressSelect.direccion}
							/>
						</ul>
						<br />
						<br />
						<button
							className='btn btn-primary btn-block'
							onClick={() => history.goBack()}
						>
							Volver
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default InscribirTaller;
