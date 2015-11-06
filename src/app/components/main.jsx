import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import LeftNav from './LeftNav';
import TopNav from './TopNav';

export default class Main extends React.Component {
	render() {
		return (
			<div>
				<TopNav />
				 {this.props.children} 
			</div>
			
		);
	}
}
