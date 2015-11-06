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
				marginTop: 0,
			},
			optionSelect: {
				height: 25,
				padding: "0px 5px",
				marginTop: 0,
			},
		}
	}

	weightChanged() {
		let weight = this.refs.weightInput.getValue();
		Model.updateDrugWeight(this.props.drug, weight);
	}

	commentChanged() {
		let comment = this.refs.comment.getValue();
		Model.updateDrugComment(this.props.drug, comment);
	}

	weightInputBlur() {
		let weight = this.refs.weightInput.getValue();
		// allow input empty string, focusing out needs reset the previous valid value
		Model.validateDrugWeight(this.props.drug, weight);
	}

	render() {
		let drug = this.props.drug;
		let sty = this.getStyles();
	
		return (

			<tr className="drug-row">
				<td className="drug-id">{drug.id}</td>
				<td>{drug.title}</td>
				<td className="drug-weight"><Input ref="weightInput" type="text" value={drug.weight}
				onBlur={this.weightInputBlur.bind(this)}
				style={sty.weightInput} standalone onChange={this.weightChanged.bind(this)}/></td>
				<td className="drug-comment">
					<Input ref="comment" value={drug.comment} type="select" style={sty.optionSelect} standalone placeholder="select"
						onChange={this.commentChanged.bind(this)}>
				      <option value="">备注</option>
				      <option value="打粉">打粉</option>
				      <option value="另包">另包</option>
				      <option value="先煎">先煎</option>
				      <option value="后下">后下</option>
				    </Input>
			    </td>
				<td className="drug-op">
					<Button bsSize="xsmall" onClick={evt=>Model.deleteDrug(drug)}><Glyphicon glyph="remove" /></Button>
				</td>
			</tr>
		);
	}
}
