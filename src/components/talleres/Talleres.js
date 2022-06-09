import React, { useContext, useState, useEffect } from 'react';
import TallerItem from './TallerItem';
import Spinner from '../layout/Spinner';
import TallerContext from '../../context/taller/tallerContext';
import { MapContainer, TileLayer, Marker, Popup, Map } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Link } from 'react-router-dom';

import {
	ProSidebar,
	Menu,
	MenuItem,
	SidebarHeader,
	SidebarContent,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Talleres = () => {
	const tallerContext = useContext(TallerContext);

	const { loading, leerTalleres, getTaller } = tallerContext;

	const [map, setMap] = useState(null);

	const [center, setCenter] = useState([
		leerTalleres()[0].ubicacion.lat,
		leerTalleres()[0].ubicacion.long,
	]);

	useEffect(() => {
		if (map) {
			map.flyTo(center, 18, {
				duration: 2,
			});
		}
	});

	const handleOnClick = e => {
		if (e.target.id) {
			getTaller(e.target.id).then(result => {
				setCenter([result.ubicacion.lat, result.ubicacion.long]);
			});
		}
	};

	const clearItemsSelected = () => {
		leerTalleres().map(
			taller => (document.getElementById(`menuItem${taller.id}`).className = '')
		);
	};

	const marcador = L.icon({
		iconUrl: icon,
		shadowUrl: iconShadow,
		iconSize: [25, 41],
		iconAnchor: [12, 41],
	});

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<div className='gridTalleres'>
				<div className='m sidebar'>
					<ProSidebar>
						<SidebarHeader className='text-center lead'>Talleres</SidebarHeader>
						<SidebarContent>
							<Menu id='talleresMenu'>
								{leerTalleres().map(taller => (
									<MenuItem key={taller.id} onClick={handleOnClick}>
										<div id={`menuItem${taller.id}`}>
											<TallerItem taller={taller} />
										</div>
									</MenuItem>
								))}
							</Menu>
						</SidebarContent>
					</ProSidebar>
				</div>
				<div className='m-1'>
					<MapContainer
						style={{ height: 800, width: '100%' }}
						center={center}
						zoom='14'
						scrollWheelZoom={true}
						whenCreated={setMap}
					>
						<TileLayer
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
						/>

						{leerTalleres().map(taller => (
							<Marker
								position={[taller.ubicacion.lat, taller.ubicacion.long]}
								icon={marcador}
								key={taller.id}
								eventHandlers={{
									click: e => {
										clearItemsSelected();
										document.getElementById(`menuItem${taller.id}`).className =
											'selected-item-bg';
									},
								}}
							>
								<Popup>
									<img
										src={taller.image_url}
										alt=''
										className='img'
										style={{ width: '60%' }}
									/>
									<h3>{taller.nombre}</h3>

									<Link to={`/taller/${taller.id}`} className='btn btn-sm my-1'>
										Ver Taller
									</Link>
								</Popup>
							</Marker>
						))}
					</MapContainer>
				</div>
			</div>
		);
	}
};

export default Talleres;
