import React from 'react';
import {$post, $get} from '../services/HttpService';
import {Button, Glyphicon, Label, OverlayTrigger, Popover, Row, Col} from 'react-bootstrap';
import PrescriptionOverview from './PrescriptionOverview';
import Prescription from '../models/Prescription';
import ConvertionUtil from '../services/ConvertionUtil';
import Alert from './Alert';

export default class MyFavoritePrescriptions extends React.Component {
	getInitState() {
		return {
	    	loaded: false,
	    	prescriptions: [],
	    	showDeleteAlert: false,
	    	deletePrescritpion: null,
	    	importedList: [],
		};
	}

	constructor(props) {
	    super(props);
	    this.state = this.getInitState();
	}

	loadData() {
		this.setState(this.getInitState());
		$post("prescript/getlist_personal", {}, 
		result => {
			this.setState({
				loaded: true, 
				prescriptions: result.data || [],
			})
		}, 
		fail => {
			console.log("loading prescript fail");
		});
	}

	componentDidMount() {
		if (this.props.location && this.props.location.query.from === "prescript") {
			this.setState({
				fromPrescript: true,
			})
		}
		this.loadData();
	}

	onDeleteClicked(prescription) {
		this.setState({
			deletePrescription: prescription,
		});
	}

	closeDeleteAlert() {
		this.setState({
			deletePrescription: null,
		});
	}

	deleteAlertYes(deletePrescription) {
		this.delete(deletePrescription.id);
		this.closeDeleteAlert();
	}

	delete(id) {
		$post("prescript/vdelete", 
			{entry_id: id}, 
		result => {
			this.loadData();
		});
	}

	onImportClicked(prescription) {
		let drugs = ConvertionUtil.getDrugsFromPrescription(prescription);
		Prescription.getInstance().addDrugs(drugs);
		this.state.importedList.push(prescription.id);
		this.setState({
			importedList: this.state.importedList,
		})
	}

	gotoPrescript() {
		location.href = "#/prescription";
	}

	render() {
		let {loaded, prescriptions, showDeleteAlert, deletePrescription, importedList, fromPrescript} = this.state;
		if (!loaded) {
			return  <span className="glyphicon glyphicon-refresh spinning big center-icon"></span>;
		} else {
			let prescriptionEl = prescriptions.map(prescription=>{
				let formattedDrugs = ConvertionUtil.jsonToDrugs(prescription.content);
				//let popover = <PrescriptionOverview data={prescritpion}>aa</PrescriptionOverview>;
				let popover = <Popover id="my-favorite-prescription-list" title={prescription.title}><PrescriptionOverview drugs={formattedDrugs} /></Popover>

				let imported = importedList.indexOf(prescription.id) !== -1;
				let importLink = imported ? 
				<span className="link disabled">已导入</span> : 
				<a onClick={evt=>this.onImportClicked(prescription)} className="link">导入</a>;

				return <Row key={prescription.id}>
					<Col md={5} className="grey-bg" style={{marginBottom: 8}}>
						<span className="title">{prescription.title}</span>
						
						<div className="pull-right title" >
							<OverlayTrigger trigger={['focus', 'hover']} placement="right" overlay={popover}>
					    		<a className="link">查看</a>
					    	</OverlayTrigger>
							{importLink}
							<a className="link" onClick={evt=>this.onDeleteClicked(prescription)}>删除</a>
						</div>
					</Col>
					
					</Row>;
			});

			let deleteAlertInfoUI = null;
			if (deletePrescription) {
				console.log("deletePrescription");
				let deleteAlertInfo = "确定删除常用方" + deletePrescription.title + "吗？";
				deleteAlertInfoUI = <Alert 
					no={()=>this.closeDeleteAlert()}
					yes={()=>this.deleteAlertYes(deletePrescription)} 
					title="删除药方" info={deleteAlertInfo} />
			}

			let btns = null;
			if (fromPrescript) {
				btns = <Row><Button bsStyle="primary" onClick={()=>this.gotoPrescript()}>返回</Button></Row>;
			}

			if (prescriptionEl.length === 0) {
				prescriptionEl = "您尚未添加常用方，请返回开方页面添加。";
			}
			return <div className="my-favor">
				{prescriptionEl}
				{deleteAlertInfoUI}
				{btns}
			</div>
		}
	}
}
