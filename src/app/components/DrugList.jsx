import React from 'react';
import DrugSearchRow from './DrugSearchRow';
import ConvertionUtil from '../services/ConvertionUtil'

export default class DrugList extends React.Component {

	rowClicked(drug) {
		this.props.rowClicked(drug);
	}

	render() {
		let rows = [];
		this.props.drugs.forEach(drug => {
			let props = {
				drug: drug,
				key: ConvertionUtil.getUUID(drug.id),
				selected: this.props.drugs.indexOf(drug) === this.props.selectedIndex,
				rowClicked: this.rowClicked.bind(this),
			}
			let row = <DrugSearchRow {...props} />;
			
			rows.push(row);	
		}.bind(this));
		
		if (rows.length > 0) {
			return (
				<ul className="drugSearchList">				
					{rows}				
				</ul>
			);
		} else {
			return null;
		}

		
	}
}
