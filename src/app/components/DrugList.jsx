import React from 'react';
import DrugSearchRow from './DrugSearchRow';

export default class DrugList extends React.Component {
	getStyle() {
		return {
	      	searchList: {
		      	position: "absolute",
		      	top: 30,
		      	zIndex: 1000,
		      	backgroundColor: "#FFFFFF",
	      	},
		}
	}


	rowClicked(drug) {
		this.props.selected(drug);
	}

	render() {

		let sty = this.getStyle();
		let rows = [];

		this.props.drugs.forEach(drug => {
			let props = {
				drug: drug,
				selected: this.props.drugs.indexOf(drug) === this.props.selectedIndex,
				rowClicked: this.rowClicked.bind(this),
			}
			let row = <DrugSearchRow {...props} />;
			
			rows.push(row);	
		}.bind(this));
		return (
			<div style={sty.searchList}>				
				{rows}				
			</div>
		);
	}
}
