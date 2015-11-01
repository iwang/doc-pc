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

	render() {
		let sty = this.getStyle();
		let rows = [];
		this.props.drugs.forEach(drug => {
			rows.push(
				<DrugSearchRow drug={drug}/>
			)
		});
		return (
			<div style={sty.searchList}>				
				{rows}				
			</div>
		);
	}
}
