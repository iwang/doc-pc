import React from 'react';
import {Input, Button, Glyphicon} from 'react-bootstrap';

export default class DrugRow extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	weightInput: null,
		};
		
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

			},
		}
	}

	weightChanged() {
		let weight = this.refs.weightInput.getValue();
		let valid = /(\d)+/.test(weight);
		console.log(weight);
	}

	render() {
		let drug = this.props.drug;
		let sty = this.getStyles();
		return (

			<tr>
				<td>{drug.id}</td>
				<td>{drug.title}</td>
				<td><Input type="text" ref="weightInput" 
				style={sty.weightInput} standalone onChange={this.weightChanged.bind(this)}/></td>
				<td>
				<Input type="select" style={sty.optionSelect} standalone placeholder="select">
			      <option value="select">ab</option>
			      <option value="other">cd</option>
			    </Input>
			    </td>
				<td><Button bsSize="xsmall"><Glyphicon glyph="remove" /></Button></td>
			</tr>
		);
	}
}
