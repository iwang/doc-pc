import React from 'react';
import {Modal, Button, Table} from 'react-bootstrap';
import ConvertionUtil from '../services/ConvertionUtil';
import PrescriptionOverview from './PrescriptionOverview';
import {$post} from '../services/HttpService';

export default class PrescriptionPreview extends React.Component {
	submit() {
		$post("acrecipeld/transfer", {
			patient_name: this.props.name,
			receiver_name: this.props.name,
			phone: this.props.phone,
			result: this.props.diagnosis,
			describe: this.props.symptom,
			doc_advice: this.props.comment,
			amount: this.props.amount,
			is_decoction: this.props.decocted,
			content: ConvertionUtil.drugsToJson(this.props.drugs),
			receiver_age: this.props.age, 
			receiver_gender: this.props.sex,
			time_re: 6,
		}, success=>{
			console.log(success);
		});
	}

	render() {
		let {name, phone, sex, age, diagnosis, decocted, symptom, comment, amount, drugs, showPreview} = this.props;
		let sexName = ConvertionUtil.getSexName(sex);
		let decoctedName = decocted ? "代煎" : "";
		return (
			<Modal className="prescription-preview" show={showPreview} onHide={this.props.onHide}>
				 <Modal.Header closeButton>
		            <Modal.Title>预览</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	<Table>
		          		<tbody>
		          		<tr>
		          			<td className="title" style={{width: "90px"}}>姓名:</td>
		          			<td style={{width: "150px"}}>{name}</td>
		          			<td className="title" style={{width: "100px"}}>手机:</td>
		          			<td>{phone}</td>
		          		</tr>
		          		<tr>
		          			<td className="title">性别:</td>
		          			<td>{sexName}</td>
		          			<td className="title">年龄:</td>
		          			<td>{age}</td>
		          		</tr>
		          		<tr>
		          			<td className="title">症状:</td>
		          			<td colSpan="3">
		          			{symptom}
		          			</td>
		          		</tr>
		          		<tr>
		          			<td className="title">诊断:</td>
		          			<td colSpan="3">
		          			{diagnosis}
		          			</td>
		          		</tr>
		          		<tr>
		          			<td className="title">医嘱:</td>
		          			<td colSpan="3">
		          			{comment}
		          			</td>
		          		</tr>
		          		</tbody>
		          	</Table>
		          <PrescriptionOverview drugs={drugs}/>
		          
		          	
		          </Modal.Body>
		          <Modal.Footer>
		          	<ul style={{float: "left"}}>
		          		<li><span className="title">药贴数:</span> {amount}</li>
		          		<li className="title" style={{textAlign: "left"}}>{decoctedName}</li>
		          	</ul>
		          	
		            <Button onClick={this.submit.bind(this)}>Submit</Button>
		          </Modal.Footer>
			</Modal>
		);
	}
}
