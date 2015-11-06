import React from 'react';
import {Button} from 'react-bootstrap';

export default class DrugSearchRow extends React.Component {
	getStyles() {
		return {
			hoverColor: {
	      		backgroundColor: "#e0e0e0",
	      	},
		}
	}

	_onClicked() {
		console.log("_onClicked");
		this.props.rowClicked(this.props.drug);
	}

	
	render() {
		let drug = this.props.drug;
		let sty = this.getStyles();
		let additionStyle = this.props.selected ? sty. hoverColor : {};
		return (
			
			<Button bsSize="medium" onClick={this._onClicked.bind(this)} className="drugSearchItem"
				style={additionStyle} block>{drug.title}
			</Button>
		
		);
	}
}
