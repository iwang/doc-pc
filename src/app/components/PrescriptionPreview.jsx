import React from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';
import ConvertionUtil from '../services/ConvertionUtil';
import PrescriptionOverview from './PrescriptionOverview';
import {$post} from '../services/HttpService';
import Notifier from './Notifier';
import LoadingIcon from './LoadingIcon';

export default class PrescriptionPreview extends React.Component {
	submit() {

		let param = {
			receiver_name: this.props.name,
			phone: this.props.phone,
			result: this.props.diagnosis,
			describe: this.props.symptom,
			doc_advice: ConvertionUtil.getDecoctComment(this.props.decoctType, this.props.decoctComment),
			amount: this.props.amount,
			is_decoction: this.props.decocted ? "1" : "0",
			content: ConvertionUtil.drugsToJson(this.props.drugs),
			receiver_age: this.props.age, 
			receiver_gender: this.props.gender,
			time_re: this.props.revistDuration,
			type_id: this.props.type,
			pack: ConvertionUtil.getPackName(this.props.type, this.props.pack),
			registration_fee: this.props.includeFee ? "1" : "0",
		};

		this.setState({submitting: true});
		$post("acrecipel/transfer", param, success=>{
			this.setState({submitting: false});
			this.props.submitted();
		});
	}

	constructor(props) {
	    super(props);
	    this.state = this.getInitState();
		
	}

	getInitState() {
		return {
			loading:true,
			total: null,
			money_doctor: null,
			money_recipe: null,
			valid: false,
			submitting: false,
			errorMsg: "",
		};
	}
	//money_doctor: 0
    //money_recipe: 0.34
    //money_total: 0.34
	onShow() {
		$post("acrecipel/preview", {
			amount: this.props.amount,
			content: ConvertionUtil.drugsToJson(this.props.drugs),
			phone: this.props.phone,
			type_id: this.props.type,
			registration_fee: this.props.includeFee ? "1" : "0",
		}, success=>{
			this.setState({
				loading:false,
				valid: true,
				money_doctor: success.data.money_doctor,
				money_recipe: success.data.money_recipe,
				total: success.data.money_total,
			});
		}, fail=>{
			this.setState({
				loading:false,
				valid:false,
				errorMsg: fail.msg,
			})
		});

	}

	onHide() {
		this.setState(this.getInitState());
	}

	render() {
		let {name, phone, gender, age, diagnosis, decocted, symptom, decoctType, decoctComment, amount, type, drugs, revistDuration, showPreview, includeFee, pack} = this.props;
		let genderName = ConvertionUtil.getGenderName(gender);
		let typeName = ConvertionUtil.getTypeName(type);
		let decoctedName = decocted ? "代煎" : "";
		let {loading, total, valid, errorMsg, submitting, money_doctor, money_recipe} = this.state;
		decoctComment = ConvertionUtil.getDecoctComment(decoctType, decoctComment);

		let errorFooter = null;
		let feeFooter = null;
		if (errorMsg !== "") {
			errorFooter = <Row className="footer-row error">
				    	<Col sm={12}>
			          		{errorMsg}
			          	</Col>
		          	</Row>;
		} else {
			feeFooter = <Row className="footer-row">
			<Col sm={3}>
				<label>诊金:{money_doctor}元</label> 
			</Col>
			<Col sm={4}>
				<label>药费:{money_recipe}元</label> 
			</Col>
			<Col sm={4}>
				<label>总价:</label> <LoadingIcon loading={loading}/><span className="total"> {total}元</span>
			</Col>
			
			</Row>
		}

		let packUI = null;
		if (ConvertionUtil.isGaoFangType(type)) {
			packUI = <Col sm={6}>
							<label>包装方式:</label> {pack}
						</Col>
		}

		let submitLabel = submitting ? "提交中..." : "提交";

		return (
			<Modal className="prescription-preview" show={showPreview} onHide={this.props.onHide}>
				 <Modal.Header closeButton>
		            <Modal.Title>预览</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          <Notifier onShow={()=>this.onShow()} onHide={()=>this.onHide()}/>
		          <h4 className="section-title">患者信息：</h4>	
		          <Row>
						<Col sm={3}>
							<label>姓名:</label>  {name}
						</Col>
						<Col sm={2}>
							<label>性别:</label>  {genderName}
						</Col>
						<Col sm={2}>
							<label>年龄:</label>  {age}
						</Col>
						<Col sm={4}>
							<label>手机:</label>  {phone}
						</Col>
			    	</Row>
			    	<Row>
			    		<Col sm={2}>
							<label>症状:</label>
						</Col>
						<Col sm={9}>
							{symptom}
						</Col>
			    	</Row>
			    	<Row>
			    		<Col sm={2}>
							<label>诊断结果:</label>
						</Col>
						<Col sm={9}>
							{diagnosis}
						</Col>
			    	</Row>
		          
		          <h4 className="section-title">用药建议：</h4>	
		          <PrescriptionOverview drugs={drugs}/>
		          
		          	
		          </Modal.Body>
		          <Modal.Footer>

		          	<Row className="footer-row">
						<Col sm={3}>
							<label>贴数:</label> {amount}贴
						</Col>
						<Col sm={3}>
							<label>复诊:</label> {revistDuration}天
						</Col>
						<Col sm={4}>
							<label>订单类型:</label> {typeName}
						</Col>
						<Col sm={2}>
							<label>{decoctedName}</label>
						</Col>
						
			    	</Row>
			    	<Row className="footer-row">
			    		<Col sm={6}>
							<label>煎服方式:</label> {decoctComment}
						</Col>
						{packUI}
			    	</Row>
			    	{errorFooter}
			    	{feeFooter}
		            <Button disabled={!valid || submitting} bsStyle="primary" className="submit" 
		            	onClick={!submitting ? this.submit.bind(this) : null}>{submitLabel}</Button>
		          </Modal.Footer>
			</Modal>
		);
	}
}
