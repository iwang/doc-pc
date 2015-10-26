import React from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import FlatButton from 'material-ui/lib/flat-button';
import { Router, Route, Link } from 'react-router';

const PatientRow = React.createClass({
	render() {
		return (
			<TableRow hoverable={true} selectable={true}>
		      <TableRowColumn>{this.props.patient.name}</TableRowColumn>
		      <TableRowColumn>{this.props.patient.sex}</TableRowColumn>
		      <TableRowColumn>{this.props.patient.age}</TableRowColumn>
		      <TableRowColumn>{this.props.patient.mobile}</TableRowColumn>
		      <TableRowColumn>{this.props.patient.date}</TableRowColumn>
		      <TableRowColumn>{this.props.patient.status}</TableRowColumn>
		      <TableRowColumn>{this.props.patient.diagnoseResult}</TableRowColumn>
		      <TableRowColumn><FlatButton linkButton={true} href="#/diagnose"  primary={true}>复诊开方</FlatButton></TableRowColumn>
		    </TableRow>
		);
	},
});

module.exports = PatientRow;