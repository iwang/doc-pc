import React from 'react';
import {Input, Button, Glyphicon} from 'react-bootstrap';
import Model from '../models/Prescription';

export default class DrugRow extends React.Component {
	constructor(props) {
	    super(props);
		
	}

	getStyles() {
		return {
			weightInput: {
				width: 40,
				height: 25,
				padding: "0px 5px",
			},
			optionSelect: {
				height: 25,
				padding: "0px 5px",
			},
		}
	}

	weightChanged() {
		let weight = this.refs.weightInput.getValue();
		Model.updateDrugWeight(this.props.drug, weight);
	}

	weightInputBlur() {
		let weight = this.refs.weightInput.getValue();
		// allow input empty string, focusing out needs reset the previous valid value
		Model.validateDrugWeight(this.props.drug, weight);
	}

	render() {
		console.log("row render", this);
		let drug = this.props.drug;
		let sty = this.getStyles();
	
		return (

			<tr>
				<td>{drug.id}</td>
				<td>{drug.title}</td>
				<td><Input type="text" ref="weightInput" value={drug.weight}
				onBlur={this.weightInputBlur.bind(this)}
				style={sty.weightInput} standalone onChange={this.weightChanged.bind(this)}/></td>
				<td>
				<Input type="select" style={sty.optionSelect} standalone placeholder="select">
			      <option value="select">备注</option>
			      <option value="other">打粉</option>
			      <option value="other">另包</option>
			      <option value="other">先煎</option>
			      <option value="other">后下</option>
			    </Input>
			    </td>
				<td><Button bsSize="xsmall" onClick={evt=>Model.deleteDrug(drug)}><Glyphicon glyph="remove" /></Button></td>
			</tr>
		);
	}
}
