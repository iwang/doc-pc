import React from 'react';

export default class DrugRow extends React.Component {
	
	render() {
		let drug = this.props.drug;
		return (
			<tr>
				<td>{drug.code}</td>
				<td>{drug.name}</td>
				<td>{drug.weight}</td>
				<td>{drug.addition}</td>
				<td>delete</td>
			</tr>
		);
	}
}
