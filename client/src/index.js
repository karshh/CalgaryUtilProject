import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import TrailTables 	from './TrailTables';
import './style.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Navbar />, document.getElementById('navbar'));
registerServiceWorker();

ReactDOM.render(<div> 
					<TrailTables />
				</div>, document.getElementById('tableContainer'));
registerServiceWorker();
