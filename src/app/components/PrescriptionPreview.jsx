import React from 'react';
import {Modal, Button, Table} from 'react-bootstrap';
import ConvertionUtil from '../services/ConvertionUtil';
import PrescriptionOverview from './PrescriptionOverview';

export default class PrescriptionPreview extends React.Component {
	

	render() {
		let {name, phone, sex, age, diagnosis, decocted, symptom, comment, amount, drugs, showPreview} = this.props;
		let sexName = ConvertionUtil.getSexName(sex);
		let decoctedName = decocted ? "代煎" : "";
		return (
			<Modal className="prescription-preview" show={showPreview} onHide={this.props.onHide}>
				 <Modal.Header closeButton>
		            <Modal.Title>Preview</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	<Table>
		          		<tbody>
		          		<tr>
		          			<td className="title" style={{width: "90px"}}>Name:</td>
		          			<td style={{width: "150px"}}>{name}</td>
		          			<td className="title" style={{width: "100px"}}>Phone:</td>
		          			<td>{phone}</td>
		          		</tr>
		          		<tr>
		          			<td className="title">Sex:</td>
		          			<td>{sexName}</td>
		          			<td className="title">Age:</td>
		          			<td>{age}</td>
		          		</tr>
		          		<tr>
		          			<td className="title">Symptom:</td>
		          			<td colSpan="3">
		          			{symptom}
		          			</td>
		          		</tr>
		          		<tr>
		          			<td className="title">Diagnosis:</td>
		          			<td colSpan="3">
		          			{diagnosis}
		          			</td>
		          		</tr>
		          		<tr>
		          			<td className="title">Comment:</td>
		          			<td colSpan="3">
		          			{comment}
		          			</td>
		          		</tr>
		          		</tbody>
		          	</Table>
		          	<div style={{float: "left", width: "30%"}}>
		          		<PrescriptionOverview drugs={drugs}/>
		          	</div>
		          	<div style={{float: "left", width: "30%"}}>
		          		<PrescriptionOverview drugs={drugs}/>
		          	</div>
		          	<div style={{float: "left", width: "30%"}}>
		          		<PrescriptionOverview drugs={drugs}/>
		          	</div>
		          </Modal.Body>
		          <Modal.Footer>
		          	<ul style={{float: "left"}}>
		          		<li><span className="title">Amount:</span> {amount}</li>
		          		<li className="title" style={{textAlign: "left"}}>{decoctedName}</li>
		          	</ul>
		          	
		            <Button onClick={this.close}>Submit</Button>
		          </Modal.Footer>
			</Modal>
		);
	}
}
