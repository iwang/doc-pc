import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

const Content = React.createClass({
	render() {
		return (
			<div>
			 {this.props.children}
			</div>
		);
	}
});

module.export = Content;