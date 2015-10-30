import React from 'react';

import LeftNav from './components/LeftNav.jsx';
import Prescripion from './components/Prescripion.jsx';
import { Router, Route } from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

(function () {

let React = require('react');
let ReactDOM = require('react-dom');


class App extends React.Component {
	render() {
		return (
			<Grid>
				<Row>
					<Col lg={2} md={1} sm={2}><LeftNav /> </Col>
					<Col lg={10} md={11} sm={10}> {this.props.children} </Col>
				</Row>
				
				
			</Grid>
		);
	}
}


ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="prescription" component={Prescripion} />
     
    </Route>
  </Router>,
  document.getElementById('app')
);

})();