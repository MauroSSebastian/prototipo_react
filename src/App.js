import './App.css';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Publicacion from './components/publicaciones/Publicacion';
import Taller from './components/talleres/Taller';
import Home from './components/pages/Home';
import CrearPublicacion from './components/pages/crearPublicacion';
import InscribirTaller from './components/pages/inscribirTaller';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';

import PublicacionState from './context/publicacion/PublicacionState';
import TallerState from './context/taller/TallerState';
import AlertState from './context/alert/AlertState';
import Filter from './context/filter/FilterState';
import AuthState from './context/auth/AuthState';

const App = () => {
	return (
		<AuthState>
			<Filter>
				<TallerState>
					<PublicacionState>
						<AlertState>
							<Router>
								<div className='App'>
									<Navbar />
									<div className='container'>
										<Alert />
										<Switch>
											<Route exact path='/' component={Home} />
											<Route exact path='/crearPublicacion' component={CrearPublicacion} />
											<Route exact path='/inscribirTaller' component={InscribirTaller} />
											<Route exact path='/login' component={Login} />
											<Route exact path='/publicacion/:id' component={Publicacion} />
											<Route exact path='/taller/:id' component={Taller} />
											<Route component={NotFound} />
										</Switch>
									</div>
								</div>
							</Router>
						</AlertState>
					</PublicacionState>
				</TallerState>
			</Filter>
		</AuthState>
	);
};

export default App;
