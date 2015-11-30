import React from 'react';
import DrugTable from './DrugTable';
import {findDOMNode} from 'react-dom';
import SearchDrugInput from './SearchDrugInput';
import PrescriptionPreview from './PrescriptionPreview';
import Alert from './Alert';
import Prescription from '../models/Prescription';
import ConvertionUtil from '../services/ConvertionUtil';
import MyFavoritePrescriptions from './MyFavoritePrescriptions';
import SaveToMyFavoritePopover from './SaveToMyFavoritePopover';
import PopoverPage from './PopoverPage';
import Patients from './Patients';
import LoadingIcon from './LoadingIcon';
import {$post} from '../services/HttpService';
import {Grid, Row, Col, Input, Button, Thumbnail, Glyphicon} from 'react-bootstrap';
import '../css/main.css';

export default class Prescripion extends React.Component {
	getStyles() {
		let sty = {
			imageInput: {
		        cursor: 'pointer',
		        position: 'absolute',
		        top: '0',
		        bottom: '0',
		        right: '0',
		        left: '0',
		        width: '100%',
		        opacity: '0',
		      },
		      image: {
		      	width: "150",
		      	height: "200",
		      	margin: "10",
		      },
		      
		      toolbox : {
		      	float: "right",
		      	marginLeft: "5",
		      },
		      label: {
		      
		      	float: "left",
		      },
		      
		};
		return sty;
	}

	constructor(props) {
	    super(props);
		this.model = Prescription.getInstance();
	}

	componentDidMount() {
		this.modelDisposal = this.model.subjects.subscribe(state=>this.setState(state));
	}

	componentWillUnmount() {
		this.modelDisposal.dispose();
	}

	render() {
		if (!this.state) return (null);
		const mdlabelCol = 2;
		const mdInputCol = 4;
		let sty = this.getStyles();
		let {name, phone, gender, age, diagnosis, symptom, decoctType, decoctComment, amount, decocted, type, pack, drugs, revistDuration, phoneValid, nameValid, amountValid, revistDurationValid, includeFee, showPreview, duplicateDrug, showPatientHistory, showPrescriptImport} = this.state;
		let phoneWarningStyle = phoneValid ? null : "error";
		let nameWarningStyle = nameValid ? null : "error";
		let amountWarningStyle = amountValid ? null : "error";
		let revisitwarningStyle = revistDurationValid ? null : "error";

		let previewValid = phoneValid&&nameValid&&amountValid&&drugs.length>0;
		let previewDiabled = previewValid ? "" : "disabled";
		let packUI = null;
		if (ConvertionUtil.isGaoFangType(type)) {
			packUI = <Col md={mdInputCol}>
							<Input type="select" standalone 
								value={pack} onChange={evt=>this.packChanged(evt.target.value)}>
								<option value="膏体罐装">膏体罐装</option>
			      				<option value="流浸膏小包装">流浸膏小包装</option>
			      				<option value="干切片小包装">干切片小包装</option>
							</Input>
						</Col>;							
					
		}

		let decoctTypeInput = null;
		if (decoctType === "other") {
			decoctTypeInput = 
				<Col  md={mdInputCol}>
					<Input type="text" standalone placeholder="煎服方式"
						onChange={evt=>this.decoctCommentChanged(evt.target.value)}
						value={decoctComment} />
						
				</Col>
			;
		}

		let leftDrugs = [];
		let rightDrugs = [];
		drugs.forEach((drug, index)=>{
			if (index % 2 === 0) {
				leftDrugs.push(drug);
			} else {
				rightDrugs.push(drug);
			}
		});

		let previewUI = null;
		if (showPreview) {
			previewUI = <PrescriptionPreview {...this.state} submitted={()=>this.submitted()}
				onHide={this.closePreview.bind(this)} />;
		}

		let duplicateAlertUI = null;
		if (duplicateDrug) {
			duplicateAlertUI = <Alert 
			title="药品重复" info="该药已添加，是否继续添加？" 
			yes={()=>this.duplicateAlertYes(duplicateDrug)} 
			no={()=>this.closeDuplicateAlert()}/>
		}

		let patientHistory = null;
		if (showPatientHistory) {
			let page = <Patients phone={phone} popover={true}
				close={()=>this.closePatientHistory()}/>
			patientHistory = <PopoverPage title="导入历史"
				page={page} no={()=>this.closePatientHistory()}/>
		}

		let prescriptImport = null;
		if (showPrescriptImport) {
			let page = <MyFavoritePrescriptions popover={true}
				close={()=>this.closePatientHistory()}/>
			
			prescriptImport = <PopoverPage title="导入常用方"
				page={page} no={()=>this.closePrescriptImport()}/>
		}

		return (
			<div className="prescriptionForm form">
					<Row>
						<Col md={mdlabelCol} className="no-padding">
							<label>患者姓名:</label>
						</Col>
						<Col md={mdInputCol}>
							<Input standalone type="text" placeholder="患者姓名" 
							value={name} bsStyle={nameWarningStyle}
							onChange={evt=>this.nameInputChanged(evt.target.value)}/>
						</Col>
						<Col md={mdlabelCol} className="no-padding">
							<label>患者电话:</label>
						</Col>
						<Col md={mdInputCol}>
							<Input standalone type="text" placeholder="手机号码" 
								value={phone} bsStyle={phoneWarningStyle}
								onChange={evt=>this.phoneInputChanged(evt.target.value)} />
						</Col>
					</Row>

					<Row>
						<Col md={mdlabelCol} className="no-padding">
							<label>性&ensp;&ensp;&ensp;&ensp;别:</label>
						</Col>
						<Col md={mdInputCol}>
							<Input type="select" standalone 
							value={gender} onChange={evt=>this.genderInputChanged(evt.target.value)}>
								<option value="1">男</option>
			      				<option value="0">女</option>
							</Input>
						</Col>
						<Col md={mdlabelCol} className="no-padding">
							<label>年&ensp;&ensp;&ensp;&ensp;龄:</label>
						</Col>

						<Col md={mdInputCol}>
							<Input type="text" standalone 
									placeholder="年龄" value={age} 
									onChange={evt=>this.ageInputChanged(evt.target.value)}/>
						</Col>
					</Row>
					<Row>
						<Col md={mdlabelCol} className="no-padding">
							<label>病症简述:</label>
						</Col>
						<Col md={12-mdlabelCol}>
							<Input type="textarea" standalone className="large"
								placeholder="病症简述" 
								onChange={evt=>this.symptomInputChanged(evt.target.value)} 
								value={symptom}/>
						</Col>
					</Row>
					<Row>
						<Col md={mdlabelCol} className="no-padding">
							<label>诊断结果:</label>
						</Col>
						<Col md={12-mdlabelCol}>
							<Input type="textarea" standalone
							placeholder="10-15字"
							onChange={evt=>this.diagnosisInputChanged(evt.target.value)}
							value={diagnosis}/>
						</Col>
					</Row>
					<Row>
						<Col md={mdlabelCol} className="no-padding">
							<label>用药建议:</label>
						</Col>
						<Col md={mdInputCol}>
							<SearchDrugInput addDrugCB={this.checkDuplicateDrug.bind(this)}/>
						</Col>
						<Col md={12-mdlabelCol-mdInputCol} className="no-padding-left">
							<Button bsStyle="default" className="prescripton-btn pull-right" 
							onClick={()=>this.importFavorBtnClicked()}>从常用方导入</Button>
							<Button bsStyle="default" className="prescripton-btn pull-right" 
								disabled={drugs.length === 0} onClick={()=>this.showSaveToMyFavorite()}>存为常用方</Button>
						</Col>
					</Row>
					<Row style={{minHeight: 150}}>
						<Col md={6}>
							<DrugTable drugs={leftDrugs} model={this.model}/>
						</Col>
						<Col md={6}>
							<DrugTable drugs={rightDrugs} model={this.model}/>
						</Col>
					</Row>
					<Row>
						<Col md={mdlabelCol} className="no-padding">
							<label>贴&ensp;&ensp;&ensp;&ensp;数:</label>
						</Col>
						<Col md={2}>
							<Input type="text" standalone bsStyle={amountWarningStyle}
									placeholder="药贴数" value={amount} addonAfter="贴" 
									onChange={evt=>this.amountInputChanged(evt.target.value)}/>
						</Col>
						
						<Col md={mdlabelCol} className="no-padding">
							<label>诊后随访:</label>
						</Col>
						<Col md={2}>
							<Input type="text" standalone bsStyle={revisitwarningStyle}
									placeholder="随访" value={revistDuration} addonAfter="天"
									onChange={evt=>this.revisitDurationChanged(evt.target.value)}/>
						</Col>
						
					</Row>
					<Row>
						<Col md={mdlabelCol} className="no-padding">
							<label>煎服方式:</label>
						</Col>
						<Col md={mdInputCol}>
							<Input type="select" standalone placeholder="煎服方式"
								onChange={evt=>this.decoctTypeChanged(evt.target.value)}
								value={decoctType}>
								<option value="200ml">200ml/包，一天2次</option>
				      			<option value="100ml">100ml/包，一天3次</option>
				      			<option value="other">其他：自己填写</option>
							</Input>
						</Col>
						{decoctTypeInput}
					</Row>
					<Row>
						<Col md={mdlabelCol} className="no-padding">
							<label>订单类型:</label>
						</Col>
						<Col md={mdInputCol}>
							<Input type="select" standalone 
							value={type} onChange={evt=>this.typeChanged(evt.target.value)}>
								<option value="1">用药建议</option>
			      				<option value="3">膏方建议</option>
							</Input>
						</Col>
						
						{packUI}	
						
					</Row>
					<Row>
						<Col mdOffset={2} md={2} className="no-padding">
							<Input type="checkbox" standalone 
								label="需要代煎" checked={decocted}
								onChange={evt=>this.decoctedChanged(evt.target.checked)}/>
						</Col>
						<Col md={3} className="no-padding">
							<Input type="checkbox" standalone 
								label="是否收诊金" checked={includeFee}
								onChange={evt=>this.includeFeeChanged(evt.target.checked)}/>
						</Col>
					</Row>
					<Row>
						<Col md={12} className="no-padding-left">
							<div className="hori-center" style={{marginTop:30}}>
								<Button bsStyle="primary" style={{marginRight:30}}
									disabled={!phoneValid}
									onClick={()=>this.historyBtnClicked()}>导入历史</Button>
								<Button bsStyle="primary"
									disabled={!previewValid} onClick={this.showPreview.bind(this)}>确定提交</Button>
							</div>
						</Col>
					</Row>
				{previewUI}
				{duplicateAlertUI}
				{patientHistory}
				{prescriptImport}
				<SaveToMyFavoritePopover drugs={this.state.drugs}
					favoriteSaved={()=>this.favoriteSaved()}
					onHide={()=>this.closeSaveToMyFavorite()} 
					showSaveToMyFavorite={this.state.showSaveToMyFavorite}/>
				
			</div>
		);
	}

	nameInputChanged(val) {
		this.model.updateName(val);
	}

	phoneInputChanged(val) {
		this.model.updatePhone(val);
	}

	genderInputChanged(val) {
		this.model.updateGender(val);
	}

	ageInputChanged(val) {
		this.model.updateAge(val);
	}

	symptomInputChanged(val) {
		this.model.updateSymptom(val);
	}

	diagnosisInputChanged(val) {
		this.model.updateDiagnosis(val);
	}

	decoctTypeChanged(val) {
		this.model.updateDecoctType(val);
	}

	decoctCommentChanged(val) {
		this.model.updateDecoctComment(val);
	}

	amountInputChanged(val) {
		this.model.updateAmount(val);
	}

	decoctedChanged(val) {
		this.model.updateDecocted(val);
	}

	includeFeeChanged(val) {
		this.model.updateIncludeFee(val);
	}

	revisitDurationChanged(val) {
		this.model.updateRevisitDuration(val);
	}

	packChanged(val) {
		this.model.updatePack(val);
	}

	typeChanged(val) {
		this.model.updateType(val);
	}

	checkDuplicateDrug(drug) {
		console.log("duplicate: ", this.model.checkDuplicate(drug));
		if(this.model.checkDuplicate(drug)) {
			this.setState({
				duplicateDrug:drug,
			});
		} else {
			this.addDrug(drug);
		}
	}

	duplicateAlertYes(drug) {
		this.addDrug(drug);
		this.closeDuplicateAlert();
	}

	closeDuplicateAlert() {
		this.setState({
			duplicateDrug:null,
		});
	}

	addDrug(drug) {
		this.model.addDrugs([drug]);
	}
	
	closePreview() {
		this.setState({showPreview: false});
	}

	showPreview() {
		this.setState({showPreview: true});
	}

	showSaveToMyFavorite() {
		this.setState({showSaveToMyFavorite: true});
	}

	closeSaveToMyFavorite() {
		this.setState({showSaveToMyFavorite: false});
	}


	submitted() {
		this.closePreview();
		this.model.reset();
	}

	importFavorBtnClicked() {
		//location.href = "#/favors?from=prescript";
		this.setState({
			showPrescriptImport: true,
		});
	}

	closePrescriptImport() {
		this.setState({
			showPrescriptImport: false,
		});
	}

	favoriteSaved() {
		this.closeSaveToMyFavorite();
	}

	historyBtnClicked() {
		//location.href = "#/patients?phone=" + this.state.phone;
		this.setState({
			showPatientHistory: true,
		});
	}

	closePatientHistory() {
		this.setState({
			showPatientHistory: false,
		});
	}

	_handleFileSelect(evt) {
		let sty = this.getStyles();
		let f;
		let images = this.state.images;
		for (let i = 0; f = evt.target.files[i]; i++) {
			if (!f.type.match('image.*')) {
		        //this.refs.snackbar.show();
		        console.log("invalid images");
		    } else {
		    	let reader = new FileReader();
		    	let _this = this;
                reader.onload = function (e) {
                	 images.push(
                    	<Col sm={3}><Thumbnail  src={e.target.result} /></Col>
                    );
                	_this.setState({images: images});
                };

                reader.readAsDataURL(f);
		    }
		}
		
		
		this.refs.imageFiles.value = "";
		
	}

}
