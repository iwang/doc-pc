import React from 'react';
import {$post} from '../services/HttpService';
import ConvertionUtil from '../services/ConvertionUtil';
import {Table, ButtonToolbar, Button} from 'react-bootstrap';
import PatientRow from './PatientRow';
import Prescription from '../models/Prescription';
import PatientInfo from './PatientInfo';

export default class Patients extends React.Component {
	getInitState() {
		return {
	    	loaded: false,
	    	patients: [],
	    	page: 0,
	    	patientInfo: null,
	    	fromPrescript: false,
		};
	}

	constructor(props) {
	    super(props);
	    this.state = this.getInitState();
	}

	loadData(page) {
		this.setState(this.getInitState());
		$post("acrecipel/getlist", 
		{
			page: page,
			limit: 10,
		}, 
		result => {
			this.setState({
				loaded: true, 
				patients: result.data || [],
				page: page,
			})
		}, 
		result => {
			this.setState({
				loaded: true, 
				patients: [],
				page: page,
			})
		});
	}

	searchPatients(param) {
		this.setState(this.getInitState());
		$post("acrecipel/search", 
			param, 
			result => {
				this.setState({
					loaded: true, 
					patients: result.data || [],
					fromPrescript: !this.props.popover,
				})
			}, 
			fail => {
				this.setState({
					loaded: true, 
					patients: [],
					fromPrescript: !this.props.popover,
				})
			});
	}

	componentDidMount() {
		let phone = this.props.phone || 
			(this.props.location && this.props.location.query.phone);

		if (phone) {
			this.searchPatients( 
			{
				kw: phone,
			});
		} else {
			this.loadData(0);
		}
	}

	paging(page) {
		this.loadData(page);
	}

	gotoInfo(p) {
		this.setState({
			patientInfo: p,
		});
	}

	gotoPatients() {
		this.setState({
			patientInfo: null,
		});
	}

	gotoPrescript(p) {
		if (p) {
			let model = ConvertionUtil.convertPatientInfoToPrescript(p);
			Prescription.getInstance().update(model);
		}
		console.log(this.props);
		if (this.props.close) {
			this.props.close();
		} else {
			location.href = "#/prescription";
		}
	}

	render() {
		if (this.state.patientInfo !== null) {
			return <PatientInfo patient={this.state.patientInfo} 
			backBtnClicked={()=>this.gotoPatients()}
			gotoPrescriptBtnClicked={(patient)=>this.gotoPrescript(patient)}/>
		}

		let {page, patients, loaded, fromPrescript} = this.state;
		let showPagination = !(page === 0 && patients.length < 10);
		let loadingIcon = null;
		let buttons = null;

		if (!loaded) {
			loadingIcon = <span className="glyphicon glyphicon-refresh spinning big center-icon"></span>;
		} else if (!fromPrescript && showPagination) {
			buttons = <ButtonToolbar style={{marginTop: 20}}>
		      <Button disabled={page === 0} bsStyle="primary" onClick={()=>this.paging(page-1)}>上一页</Button>
		      <Button disabled={patients.length === 0} bsStyle="primary" onClick={()=>this.paging(page+1)}>下一页</Button>
		    </ButtonToolbar>;
		} else if (fromPrescript) {
			buttons = <ButtonToolbar style={{marginTop: 20}}>
		      <Button bsStyle="primary" onClick={()=>this.gotoPrescript()}>返回</Button>
		    </ButtonToolbar>;
		}

		let rows = patients.map(patient=>{
			return <PatientRow key={patient.id} patient={patient} 
				infoBtnClicked={(p)=>this.gotoInfo(p)}/>
		});

		if (rows.length === 0 && loaded) {
			rows = "无就诊记录";
		}

		return (
			<div>
				<Table bordered hover className="editDrugTable">
				    <thead>
				      <tr>
				        <th>姓名</th>
				        <th>性别</th>
				        <th>年龄</th>
				        <th>手机</th>
				        <th>就诊日期</th>
				        <th>诊断结果</th>
				        <th>支付状态</th>
				        <th></th>
				      </tr>
				    </thead>
				    <tbody>
				    	{rows}
				    </tbody>
				 </Table>
				 {loadingIcon}
				 {buttons}
			 </div>
		);
	}
}
