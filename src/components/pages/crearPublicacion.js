import React, { useState, useContext } from 'react';
import CurrencyInput from 'react-currency-input-field';
import AlertContext from '../../context/alert/alertContext';
import CategoryDropdown from '../search/CategoryDropdown';
import { useHistory } from 'react-router-dom';
import { formatAmount } from '../../utils/helpers';
import {
	AccordionWithHeader,
	AccordionNode,
	AccordionHeader,
	AccordionPanel,
} from 'react-accordion-with-header';

const Register = props => {
	const alertContext = useContext(AlertContext);
	const history = useHistory();
	const [publicacion, setPublicacion] = useState({
		nombre: '',
		descripcion: '',
		precio: '',
		formaComercializacion: '',
		infoContacto: '',
	});

	const { nombre, descripcion, precio, formaComercializacion, infoContacto } =
		publicacion;

	const PRICE_SUGGESTION_LIMIT = 5;

	const [pagMuestra, setPagMuestra] = useState(false);
	const [pagVenta, setPagVenta] = useState(false);
	const [form, setform] = useState(true);
	const [hasCreated, setHasCreated] = useState(false);
	const [category, setCategory] = useState('');
	const [type, setType] = useState('');
	const [files, setFiles] = useState([]);
	const [similarItems, setSimilarItems] = useState([]);

	const onChange = e =>
		setPublicacion({ ...publicacion, [e.target.name]: e.target.value });

	const onChangePrice = (value, name) =>
		setPublicacion({ ...publicacion, [name]: value });

	const onSubmit = e => {
		e.preventDefault();
		setform(false);
		setHasCreated(true);
		alertContext.setAlert(
			'Publicación creada correctamente, pendiente de aprobación',
			'success'
		);
	};

	const onSelectCategory = selectedOption => {
		setCategory(selectedOption.value);
	};

	const handleTypeChange = event => {
		setType(event.target.value);
		if (event.target.value === 'muestra') {
			setPagMuestra(true);
			setPagVenta(false);
		}
		if (event.target.value === 'venta') {
			setPagVenta(true);
			setPagMuestra(false);
			onAcordionData();
		}
	};

	const onAcordionData = async () => {
		let res = await fetch(
			`https://api.mercadolibre.com/sites/MLA/search?q=${nombre}&limit=${PRICE_SUGGESTION_LIMIT}`,
			{ headers: { 'Content-Type': 'application/json' } }
		);
		let jsonData = await res.json();
		let items = jsonData.results;
		setSimilarItems(items);
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
					Nueva <span className='text-primary'>Publicación</span>
				</h1>
				{form && (
					<form onSubmit={onSubmit}>
						<div className='form-group'>
							<label htmlFor='nombre'>Nombre del artículo</label>
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
							<label htmlFor='infoContacto'>Información de contacto</label>
							<span style={{color:'red', fontWeight: 'bold'}}> * </span>
							<input
								id='infoContacto'
								type='text'
								name='infoContacto'
								value={infoContacto}
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
						<div className='form-group'>
							<label htmlFor='PublicacionRadioBtn'>Tipo de publicación</label>
							<span style={{color:'red', fontWeight: 'bold'}}> * </span>
							<div onChange={handleTypeChange}>
								<input
									type='radio'
									value='muestra'
									name='type'
									className='radio-button'
								/>{' '}
								Muestra
								<input
									type='radio'
									value='venta'
									name='type'
									className='radio-button'
								/>{' '}
								Venta
							</div>
						</div>
						{pagMuestra && (
							<div className='form-group'>
								<label htmlFor='formaComercializacion'>Forma de comercialización</label>
								<span style={{color:'red', fontWeight: 'bold'}}> * </span>
								<input
									id='formaComercializacion'
									type='text'
									name='formaComercializacion'
									value={formaComercializacion}
									onChange={onChange}
									required
								/>
							</div>
						)}
						{pagVenta && (
							<div className='form-group'>
								<label htmlFor='precio'>Precio del artículo</label>
								<span style={{color:'red', fontWeight: 'bold'}}> * </span>
								<CurrencyInput
									id='precio'
									name='precio'
									prefix='$'
									decimalsLimit={2}
									onValueChange={onChangePrice}
									required
								/>
							</div>
						)}
						{similarItems.length > 0 && pagVenta && (
							<div className='form-group'>
								<label htmlFor='precio'>Sugerencias de precios</label>
								<br />
								<br />
								<AccordionWithHeader>
									{similarItems.map((item, i) => {
										return (
											<AccordionNode key={i}>
												<AccordionHeader
													horizontalAlignment='centerSpaceBetween'
													verticalAlignment='center'
												>
													<div>{item.title}</div>
													<div>{formatAmount(item.price, 2)}</div>
												</AccordionHeader>
												<AccordionPanel>
													<div>
														<img src={item.thumbnail} alt={item.thumbnail_id} />
													</div>
												</AccordionPanel>
											</AccordionNode>
										);
									})}
								</AccordionWithHeader>
							</div>
						)}

						<div className='buttons'>
							<button className='btn btn-primary btn-block'>Crear</button>
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
								<b>Información de contacto:</b> {infoContacto}
							</li>
							<li>
								<b>Categoria:</b> {category}
							</li>
							<li>
								<b>Tipo de publicación:</b> {type}
							</li>
							{pagMuestra && (
								<li>
									<b>Forma de comercialización:</b> {formaComercializacion}
								</li>
							)}
							{pagVenta && (
								<li>
									<b>Precio del artículo:</b> {formatAmount(precio, 2)}
								</li>
							)}
							<br />
							{files.length>0 && files.map(file => (
								<li>
									<img src={file.url} alt={file.name} />
								</li>
							))}
						</ul>
						<br />
						<br />
						<button
							className='btn btn-primary btn-block m'
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

export default Register;
