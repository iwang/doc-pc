import React from 'react';
import PatientRow from './PatientRow.jsx';
import Table from 'material-ui/lib/table/table';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableBody from 'material-ui/lib/table/table-body';

const PatientTable = React.createClass({
	render() {
		let rows = [];
		let PATIENTS = [
  {id:1, name: 'Sporting Goods', sex: '9', age: '18', mobile: '15687939876', date:'2015/10/22', status:'paid', diagnoseResult:'fever'},
  {id:2,name: 'Sporting Goods', sex: '9', age: '18', mobile: '15687939876', date:'2015/10/22', status:'paid', diagnoseResult:'fever'},
  {id:3,name: 'Sporting Goods', sex: '9', age: '18', mobile: '15687939876', date:'2015/10/22', status:'paid', diagnoseResult:'fever'},
  {id:4,name: 'Sporting Goods', sex: '9', age: '18', mobile: '15687939876', date:'2015/10/22', status:'paid', diagnoseResult:'fever'},
];

		PATIENTS.forEach(patient => {
			rows.push(<PatientRow key={patient.id} patient={patient} />);
		});
		console.log(rows);
		return (
			<div>
			<Table selectable={true}>
			<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
				<TableRow>
			    	<TableHeaderColumn tooltip='The ID'>姓名</TableHeaderColumn>
			     	<TableHeaderColumn tooltip='The Name'>性别</TableHeaderColumn>
			     	<TableHeaderColumn tooltip='The Status'>年龄</TableHeaderColumn>
			     	<TableHeaderColumn tooltip='The Status'>手机</TableHeaderColumn>
			     	<TableHeaderColumn tooltip='The Status'>就诊日期</TableHeaderColumn>
			     	<TableHeaderColumn tooltip='The Status'>支付状态</TableHeaderColumn>
			     	<TableHeaderColumn tooltip='The Status'>诊断结果</TableHeaderColumn>
			     	<TableHeaderColumn tooltip='The Status'>操作</TableHeaderColumn>
			    </TableRow>
			</TableHeader>
			<TableBody showRowHover={true} selectable={true} deselectOnClickaway={true}>
				{rows}
			</TableBody>

			</Table>
			<div>{this.props.children || "Welcome to your Inbox"}</div>
			</div>
			
			
		)
	},
});

module.exports = PatientTable;
