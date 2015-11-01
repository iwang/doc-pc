import React from 'react';
import DrugRow from './DrugRow.jsx';
import {Table} from 'react-bootstrap';

export default class DrugTable extends React.Component {
	render() {
		let rows = [];
		this.props.drugs.forEach(d => {
			rows.push(<DrugRow drug={d} />);
		});
		return (
			 <Table striped bordered condensed hover>
			    <thead>
			      <tr>
			        <th>编号</th>
			        <th>药材</th>
			        <th>克数</th>
			        <th>备注</th>
			        <th>操作</th>
			      </tr>
			    </thead>
			    <tbody>
			    	{rows}
			    </tbody>
			 </Table>
		);
	}
}
