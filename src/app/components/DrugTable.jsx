import React from 'react';
import DrugRow from './DrugRow.jsx';
import {Table} from 'react-bootstrap';

export default class DrugTable extends React.Component {
	render() {
		let rows = [];
		this.props.drugs.forEach(d => {
			rows.push(<DrugRow key={d.key} drug={d} />);
		});
		return (
			 <Table striped bordered condensed hover>
			    <thead>
			      <tr>
			        <th>code</th>
			        <th>title</th>
			        <th>weight</th>
			        <th>comment</th>
			        <th>op</th>
			      </tr>
			    </thead>
			    <tbody>
			    	{rows}
			    </tbody>
			 </Table>
		);
	}
}
