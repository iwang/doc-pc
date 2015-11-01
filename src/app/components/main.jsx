import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import LeftNav from './LeftNav';


export default class Main extends React.Component {
	render() {
		return (
			<Grid>
			<Row>
			<Col lg={2} md={1} sm={2}>
			            <LeftNav /> 
			          </Col>
			<Col lg={10} md={11} sm={10}> 
			            {this.props.children} 
			          </Col>
			</Row>
			</Grid>
		);
	}
}
