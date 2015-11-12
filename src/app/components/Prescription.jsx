import React from 'react';
import DrugTable from './DrugTable.jsx';
import {findDOMNode} from 'react-dom';
import SearchDrugInput from './SearchDrugInput.jsx';
import PrescriptionPreview from './PrescriptionPreview.jsx';
import Prescription from '../models/Prescription';
import ConvertionUtil from '../services/ConvertionUtil';
import MyFavoritePrescriptions from './MyFavoritePrescriptions';
import SaveToMyFavoritePopover from './SaveToMyFavoritePopover';
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
		      textarea: {
		      	height: "100",
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

	getInitState() {
		// return {
		// 	name: "",
		// 	phone: "",
		// 	gender: 1,
		// 	age: "",
		// 	symptom: "",
		// 	diagnosis: "",
		// 	amount: "",
		// 	revistDuration: "",
		// 	type: "1",
		// 	pack:"膏体罐装",
		//  	decoctType: "200ml",
		//  	decoctComment: "",
		// 	drugs: [],
		// 	phoneValid: false,
		// 	nameValid: false,
		// 	ageValid: false,
		// 	amountValid: false,
		// 	revistDurationValid: false,
		// 	decocted: false,
		// 	images:[],
		// 	showPreview: false,
		// };


		return {
			name: "王志峰",
			phone: "12344423333",
			gender: 1,
			age: "12",
			symptom: "天汽模的第三方",
			diagnosis: "阿大幅度减少",
			decoctType: "200ml",
		 	decoctComment: "",
			amount: "11",
			revistDuration: "5",
			type: "1",
			pack:"膏体罐装",
			drugs: [],
			phoneValid: true,
			nameValid: true,
			ageValid: true,
			amountValid: true,
			revistDurationValid: true,
			decocted: false,
			images:[],
			showPreview: false,
			phoneCheckResult: "",
			checkingPhone: false,
			lastCheckedPhone: null,
		}
	}


	constructor(props) {
	    super(props);
	    this.state = this.getInitState();
		this.model = new Prescription(this.state);
	}

	componentDidMount() {
		this.modelDisposal = this.model.subjects.subscribe(state=>this.setState(state));
	}

	componentWillUnmount() {
		console.log("dispose");
		this.modelDisposal.dispose();

	}

	render() {
		if (!this.state) return (null);
		let sty = this.getStyles();
		
decoctType
		let {name, phone, gender, age, diagnosis, symptom, decoctType, decoctComment, amount, decocted, type, pack, drugs, revistDuration, phoneValid, nameValid, ageValid, amountValid, revistDurationValid, checkingPhone, phoneCheckResult} = this.state;
		let phoneWarningStyle = phoneValid ? "" : "error";
		let nameWarningStyle = nameValid ? "" : "error";
		let ageWarningStyle = ageValid ? "" : "error";
		let amountWarningStyle = amountValid ? "" : "error";
		let revisitwarningStyle = revistDurationValid ? "" : "error";

		let previewValid = phoneValid&&nameValid&&ageValid&&amountValid&&drugs.length>0;
		let previewDiabled = previewValid ? "" : "disabled";
		
		let packUI = null;
		if (type === "3") {
			packUI = <Row>
						<Col sm={2}>
							<label>包装方式:</label>
						</Col>
						<Col sm={5}>
							<Input type="select" standalone 
								value={pack} onChange={evt=>this.packChanged(evt.target.value)}>
								<option value="膏体罐装">膏体罐装</option>
			      				<option value="流浸膏小包装">流浸膏小包装</option>
			      				<option value="干切片小包装">干切片小包装</option>
							</Input>
						</Col>								
					</Row>;
		}

		let decoctTypeInput = null;
		if (decoctType === "other") {
			decoctTypeInput = <Row>
				<Col smOffset={2} sm={8}>
					<Input type="text" standalone placeholder="煎服方式"
						onChange={evt=>this.decoctCommentChanged(evt.target.value)}
						value={decoctComment} />
						
				</Col>
			</Row>;
		}

		return (
			<div>
				<Grid className="prescriptionForm form">
					<Row>
						<Col sm={4} className="patientInfo">
							<h3>患者信息</h3>
							<Row>
								<Col sm={2} className="no-padding">
									<label>姓名:</label>
								</Col>
								<Col sm={5}>
									<Input standalone type="text" placeholder="患者姓名" 
									value={name} bsStyle={nameWarningStyle}
									onChange={evt=>this.nameInputChanged(evt.target.value)}/>
								</Col>
							</Row>
							<Row>
								<Col sm={2} className="no-padding">
									<label>手机:</label>
								</Col>

								<Col sm={5}>
									<Input standalone type="text" placeholder="手机号码" 
										value={phone} bsStyle={phoneWarningStyle}
										onChange={evt=>this.phoneInputChanged(evt.target.value)}
										onBlur={evt=>this.phoneInputBlur(evt.target.value)}/>
								</Col>
								<Col sm={4} className="no-padding">
									<div className="phone-check-result">{phoneCheckResult}</div>
									<LoadingIcon loading={checkingPhone} />
								</Col>
							</Row>
							<Row>
								<Col sm={2} className="no-padding">
									<label>性别:</label>
								</Col>
								<Col sm={5}>
									<Input type="select" standalone 
									value={gender} onChange={evt=>this.genderInputChanged(evt.target.value)}>
										<option value="1">男</option>
					      				<option value="0">女</option>
									</Input>
								</Col>								
							</Row>
							<Row>
								<Col sm={2} className="no-padding">
									<label>年龄:</label>
								</Col>

								<Col sm={5}>
									<Input type="text" standalone bsStyle={ageWarningStyle}
											placeholder="年龄" value={age} 
											onChange={evt=>this.ageInputChanged(evt.target.value)}/>
								</Col>
							</Row>
							<Row>
								<Col sm={2} className="no-padding">
									<label>症状:</label>
								</Col>
								<Col sm={8}>
									<Input type="textarea" standalone style={sty.textarea} 
										placeholder="患者症状" 
										onChange={evt=>this.symptomInputChanged(evt.target.value)} 
										value={symptom}/>
								</Col>
							</Row>
							<Row>
								<Button bsSize="small" style={{position: 'relative'}}>Upload
									<input standalone type="file" ref="imageFiles"
							    		style={sty.imageInput} multiple
							    		onChange={this._handleFileSelect.bind(this)}></input>
								</Button>
								
							</Row>
							<Row>
							 	{this.state.images}
							 </Row>
							<Row>
								<Col sm={2} className="no-padding">
									<label>诊断:</label>
								</Col>
								<Col sm={8}>
									<Input type="textarea" standalone style={sty.textarea} 
									placeholder="诊断结果"
									onChange={evt=>this.diagnosisInputChanged(evt.target.value)}
									value={diagnosis}/>
								</Col>
							</Row>
							<Row>
								<Col sm={2} className="no-padding">
									<label>煎服方式:</label>
								</Col>
								<Col sm={8}>
									<Input type="select" standalone placeholder="煎服方式"
										onChange={evt=>this.decoctTypeChanged(evt.target.value)}
										value={decoctType}>
										<option value="200ml">200ml/包，一天2次</option>
						      			<option value="100ml">100ml/包，一天3次</option>
						      			<option value="other">其他：自己填写</option>
									</Input>
								</Col>
							</Row>
							{decoctTypeInput}
							<Row>
								<Col sm={2} className="no-padding">
									<label>订单类型:</label>
								</Col>
								<Col sm={5}>
									<Input type="select" standalone 
									value={type} onChange={evt=>this.typeChanged(evt.target.value)}>
										<option value="1">线下开方</option>
					      				<option value="2">转方</option>
					      				<option value="3">膏方节</option>
									</Input>
								</Col>								
							</Row>
							{packUI}
							<Row>
								<Col sm={2} className="no-padding">
									<label>诊后随访:</label>
								</Col>
								<Col sm={5}>
									<Input type="text" standalone bsStyle={revisitwarningStyle}
											placeholder="诊后随访" value={revistDuration} addonAfter="天"
											onChange={evt=>this.revisitDurationChanged(evt.target.value)}/>
								</Col>
	
							</Row>
							<Row>
								<Col sm={2} className="no-padding">
									<label>贴数:</label>
								</Col>
								<Col sm={5}>
									<Input type="text" standalone bsStyle={amountWarningStyle}
											placeholder="药贴数" value={amount} addonAfter="贴" 
											onChange={evt=>this.amountInputChanged(evt.target.value)}/>
								</Col>
								<Col sm={4}>
									<Input type="checkbox" standalone 
										label="需要代煎" value={decocted}
										placeholder="amount" 
										onChange={evt=>this.decoctedChanged(evt.target.checked)}/>
								</Col>
							</Row>
							
							
						</Col>
						<Col sm={4}>
							<h3>药方</h3>
							<Row>
								<Col sm={12}>
									<SearchDrugInput addDrugCB={this._addDrug.bind(this)}/>
								</Col>

							</Row>
							<Row>
								<Col sm={12}>
									<DrugTable drugs={drugs} model={this.model}/>
								</Col>
							</Row>
							
						</Col>
						<Col sm={4}>
							<h3>常用药方</h3>
							<Row>
								<Col sm={12}>
									<MyFavoritePrescriptions ref="myFavoritePrescriptions" addFavoritePrescription={(content)=>this.addFavoritePrescription(content)}/>
								</Col>
							</Row>
							<div className="actionBtns">
								<Button bsStyle="primary" bsSize="small" style={sty.toolbox} 
									disabled={!previewValid} onClick={this.showPreview.bind(this)}>预览</Button>
								<Button bsStyle="primary" bsSize="small" style={sty.toolbox}
									disabled={drugs.length === 0} onClick={()=>this.showSaveToMyFavorite()}>保存药方</Button>
							</div>
						</Col>
					</Row>			
				</Grid>

				<PrescriptionPreview {...this.state} submitted={()=>this.submitted()}
					onHide={this.closePreview.bind(this)} />

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

	phoneInputBlur(val) {
		if (this.state.phoneValid && this.state.phone !== this.lastCheckPhone) {
			this.setState({
				checkingPhone: true,
				phoneCheckResult: "",
			});
			$post("user/check_phone_sms", {
				phone: val,
			}, success=>{
				this.setState({
					checkingPhone: false,
					phoneCheckResult: success.msg,
					lastCheckPhone: val,
				});
			});
		}
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

	revisitDurationChanged(val) {
		this.model.updateRevisitDuration(val);
	}

	packChanged(val) {
		this.model.updatePack(val);
	}

	typeChanged(val) {
		this.model.updateType(val);
	}

	_addDrug(drug) {
		this.model.addDrugs([drug]);
	}

	addFavoritePrescription(prescription) {
		let drugs = ConvertionUtil.getDrugsFromPrescription(prescription);
		this.model.addDrugs(drugs);
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
		this.setState(this.getInitState());
	}

	favoriteSaved() {
		this.closeSaveToMyFavorite();
		this.refs.myFavoritePrescriptions.loadData();
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
