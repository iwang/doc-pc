import React from 'react';
import {Button} from 'react-bootstrap';

export default class DrugSearchRow extends React.Component {
	getStyles() {
		return {
			btn: {
				width: 150,
			},
		}
	}

	render() {
		let drug = this.props.drug;
		let sty = this.getStyles();
		return (
			<div>
				
				<Button bsSize="medium" style={sty.btn} block>{drug.title}</Button>
				
			</div>
		);
	}
}
