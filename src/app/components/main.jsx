import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import LeftNav from './LeftNav';

export default class Main extends React.Component {
	render() {
		return (
			<Grid style={{marginTop: 50}}>
				<Row>
					<Col md={2}>
						<LeftNav />
					</Col>
					<Col  md={9}>
						{this.props.children} 
					</Col>
				</Row>
			</Grid>
		);
	}
}
