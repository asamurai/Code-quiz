import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Router from './Router.jsx';

const root = document.getElementById('root');

const render = (Router) => {
	ReactDOM.render(
		<AppContainer>
			<Router/>
		</AppContainer>,
		root
	);
};
render(Router);

if(module.hot){
	module.hot.accept('./Router.jsx', () => {
		render(root);
	});
}
