import React from 'react';
import DrugRow from './DrugRow.jsx';
import {Table} from 'react-bootstrap';

export default class DrugTable extends React.Component {
	render() {
		let rows = [];
		this.props.drugs.forEach(d => {
			rows.push(<DrugRow key={d.key} drug={d} model={this.props.model}/>);
		});
		return (
			 <Table bordered condensed hover className="editDrugTable">
			    <thead>
			      <tr>
			        <th>编码</th>
			        <th>药材</th>
			        <th>数量</th>
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
