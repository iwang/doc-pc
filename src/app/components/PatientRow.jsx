import React from 'react';
import {Row, Button, Col} from 'react-bootstrap';
import ConvertionUtil from '../services/ConvertionUtil';

export default class PatientRow extends React.Component {
	prescriptBtnClicked() {
		this.props.infoBtnClicked(this.props.patient);
	}

	render() {
		let {id, receiver_name, phone, result, receiver_age, receiver_gender, time_create, status_pay} = this.props.patient;
		let gender_name = ConvertionUtil.getGenderName(receiver_gender);
		let statusPayName = status_pay==="0" ? "等待付款" : "已付款";
		let createdStr = ConvertionUtil.getDateStr(time_create);
		return (
			<tr>
				<td>{receiver_name}</td>
				<td>{gender_name}</td>
				<td>{receiver_age}岁</td>
				<td>{phone}</td>
				<td>{createdStr}</td>
				<td>{result}</td>
				<td>{statusPayName}</td>
				<td><a onClick={()=>this.prescriptBtnClicked()}>详情</a></td>
			</tr>
		);
	}
}
