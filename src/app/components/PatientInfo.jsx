import React from 'react';
import {Table, Button} from 'react-bootstrap';
import ConvertionUtil from '../services/ConvertionUtil';

export default class PatientInfo extends React.Component {
	render() {
		let {pay_orderid, receiver_name, receiver_age, content, receiver_gender, time_create, time_re, result, describe, doc_advice, amount, is_decoction, money_total, status_pay, money_doctor, money_recipe} = this.props.patient;
		let gender_name = ConvertionUtil.getGenderName(receiver_gender);
		let createdStr = ConvertionUtil.getDateStr(time_create);
		let decoctedStr = is_decoction === "1" ? "代煎" : "";
		let statusPayName = status_pay==="0" ? "等待付款" : "已付款";
		let drugDetailsStr = ConvertionUtil.rawDragToStr(content);
		return (
			<Table bordered style={{width: 350}}>
				<tbody>
					<tr><td colSpan={3}>订单号：{pay_orderid}</td></tr>
					<tr>
						<td>
							名字：{receiver_name}
						</td>
					
						<td>
							性别：{gender_name}
						</td>
					
						<td>
							年龄：{receiver_age}岁
						</td>
					</tr>
					<tr><td colSpan={3}>就诊时间：{createdStr}</td></tr>
					<tr><td colSpan={3}>复诊：{time_re}天</td></tr>
					<tr><td colSpan={3}>病状：{describe}</td></tr>
					<tr><td colSpan={3}>照片：</td></tr>
					<tr><td colSpan={3}>诊断结果：{result}</td></tr>
					<tr>
						<td colSpan={3}><span className="inline-block top-align">用药建议：</span>
							<span className="inline-block top-align" dangerouslySetInnerHTML={{__html: drugDetailsStr}}></span>
						</td>
					</tr>
					<tr>
						<td>
							备注：{doc_advice}
						</td>
					
						<td>
							{amount}贴
						</td>
						<td>
							{decoctedStr}
						</td>
					</tr>
					<tr>
						
						<td>
							药费：{money_recipe}元
						</td>
						<td colSpan={2}> 
							诊金：{money_doctor}元
						</td>
					</tr>
					<tr>
						<td>
							总价：{money_total}元
						</td>
					
						<td>
							
						</td>
						<td>
							{statusPayName}
						</td>
					</tr>
					<tr >
						<td colSpan={3} style={{paddingTop:25, paddingBottom:25}}>
							<div style={{textAlign: "center"}}>
								<Button bsStyle="primary" style={{marginRight: 25}} onClick={()=>this.props.backBtnClicked()}>返回</Button>
								<Button bsStyle="primary" onClick={()=>this.props.gotoPrescriptBtnClicked(this.props.patient)}>复诊开方</Button>
							</div>
						</td>
					</tr>
				</tbody>
			</Table>
		);
	}
}
