import React from 'react';
import FirebaseProvider from './firebase/index'
import { Routes, Route } from 'react-router'
import { MuiThemeProvider } from '@material-ui/core/styles'

import theme from './theme'
import Layout from './components/ui/layout/Layout'

import Orders from './components/pages/Orders'
import Menu from './components/pages/Menu'
import NewPlate from './components/pages/NewPlate'
const App = () => {
	return (
		<FirebaseProvider>
			<MuiThemeProvider theme={theme}>
				<Layout>
					<Routes>
						<Route exact path="/" element={<Orders />} />
						<Route exact path="/menu" element={<Menu />} />
						<Route exact path="/new-plate" element={<NewPlate />} />
					</Routes>
				</Layout>
			</MuiThemeProvider>
		</FirebaseProvider>
	);
}
export default App;
