import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const UbicacionEnMapa = ({ ubicacion, nombre, direccion }) => {
	const location = [ubicacion.lat, ubicacion.long];

	const marcador = L.icon({
		iconUrl: icon,
		shadowUrl: iconShadow,
		iconSize: [25, 41],
		iconAnchor: [12, 41],
	});

	return (
		<div className='p'>
			<MapContainer
				style={{ height: 800, width: '100%' }}
				center={location}
				zoom={14}
				scrollWheelZoom={false}
			>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<Marker position={location} icon={marcador}>
					<Popup>
						{nombre}
						<br />
						{direccion}
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default UbicacionEnMapa;
