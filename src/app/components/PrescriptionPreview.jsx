import React from 'react';
import {Modal, Button, Table} from 'react-bootstrap';
import ConvertionUtil from '../services/ConvertionUtil'

export default class PrescriptionPreview extends React.Component {
	

	render() {
		let {name, phone, sex, age, diagnosis, symptom, drugs, showPreview} = this.props;
		let sexName = ConvertionUtil.getSexName(sex);

		return (
			<Modal show={showPreview} onHide={this.props.onHide}>
				 <Modal.Header closeButton>
		            <Modal.Title>Preview</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	<Table>
		          		<tr>
		          			<td>Name:</td>
		          			<td>{name}</td>
		          			<td>Phone:</td>
		          			<td>{phone}</td>
		          		</tr>
		          		<tr>
		          			<td>Sex:</td>
		          			<td>{sexName}</td>
		          			<td>Age:</td>
		          			<td>{age}</td>
		          		</tr>
		          	</Table>
		          </Modal.Body>
		          <Modal.Footer>
		            <Button onClick={this.close}>Submit</Button>
		          </Modal.Footer>
			</Modal>
		);
	}
}
