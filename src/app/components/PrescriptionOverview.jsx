import React from 'react';
import {Popover} from 'react-bootstrap';

export default class PrescriptionOverview extends React.Component {
	render() {
		let drugEls = this.props.drugs.map((drug, index)=>{
			let strippedClassName = index % 2 === 1 ? "stripped" : "";

			return <li key={drug.key} className={strippedClassName}>
				<span className="drug-title">{drug.title}</span>
				<span className="drug-weight">{drug.weight}克</span>
				<span className="drug-comment">{drug.comment}</span>
			</li>
		});
		return (
			<ul className="drug-row">
			{drugEls}
			</ul>
		);
	}
}
