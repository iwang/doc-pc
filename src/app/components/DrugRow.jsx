import React from 'react';
import {Input} from 'react-bootstrap';

export default class DrugRow extends React.Component {
	
	getStyles() {
		return {
			weightInput: {
				width: 40,
			},
		}
	}

	render() {
		let drug = this.props.drug;
		let sty = this.getStyles();
		return (
			<tr>
				<td>{drug.code}</td>
				<td>{drug.title}</td>
				<td><Input type="text" style={sty.weightInput} standalone /></td>
				<td>{drug.addition}</td>
				<td>delete</td>
			</tr>
		);
	}
}
