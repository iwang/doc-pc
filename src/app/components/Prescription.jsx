import React from 'react';
import DrugTable from './DrugTable.jsx';
import {findDOMNode} from 'react-dom';
import SearchDrugInput from './SearchDrugInput.jsx';
import PrescriptionPreview from './PrescriptionPreview.jsx';
import Model from '../models/Prescription';
import ConvertionUtil from '../services/ConvertionUtil';
import MyFavoritePrescriptions from './MyFavoritePrescriptions.jsx';

import {Grid, Row, Col, Input, Button, Thumbnail, Glyphicon} from 'react-bootstrap';

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

	componentDidMount() {
		Model.subjects.subscribe(state=>this.setState(state));
		this.state = Model.getState();
	}

	render() {
		console.log("render", this.state);
		if (!this.state) return (null);
		let sty = this.getStyles();
		
		let {name, phone, sex, age, diagnosis, symptom, comment, amount, decocted, drugs, phoneValid, nameValid, ageValid, amountValid} = this.state;
		let phoneWarningStyle = phoneValid ? "" : "error";
		let nameWarningStyle = nameValid ? "" : "error";
		let ageWarningStyle = ageValid ? "" : "error";
		let amountWarningStyle = amountValid ? "" : "error";
		//let decoctedValue = decocted ? "on" : "off";
		console.log("decoctedValue", decocted);
		return (
			<div>
				<Grid className="prescriptionForm">
					<Row>
						<Col sm={4}>
							<h3>Info</h3>
							<Row>
								<Col sm={2}>
									<label>Name:</label>
								</Col>
								<Col sm={5}>
									<Input ref="name" standalone type="text" placeholder="Enter text" 
									value={name} bsStyle={nameWarningStyle}
									onChange={this.nameInputChanged.bind(this)}/>
								</Col>
							</Row>
							<Row>
								<Col sm={2}>
									<label>phone:</label>
								</Col>

								<Col sm={5}>
									<Input ref="phone" standalone type="text" placeholder="Phone" 
									value={phone} bsStyle={phoneWarningStyle}
										onChange={this.phoneInputChanged.bind(this)}/>
									
								</Col>
							</Row>
							<Row>
								<Col sm={2}>
									<label>Sex:</label>
								</Col>
								<Col sm={5}>
									<Input type="select" ref="sex" standalone 
									value={sex} onChange={this.sexInputChanged.bind(this)}>
										<option value="1">male</option>
					      				<option value="2">femail</option>
									</Input>
								</Col>								
							</Row>
							<Row>
								<Col sm={2}>
									<label>age:</label>
								</Col>

								<Col sm={5}>
									<Input type="text" ref="age" standalone bsStyle={ageWarningStyle}
											placeholder="age" value={age} 
											onChange={this.ageInputChanged.bind(this)}/>
								</Col>
							</Row>
							<Row>
								<Col sm={2}>
									<label>Symptom:</label>
								</Col>
								<Col sm={10}>
									<Input type="textarea" ref="symptom" standalone style={sty.textarea} 
										placeholder="Enter Symptom" onChange={this.symptomInputChanged.bind(this)} 
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
								<Col sm={2}>
									<label>Diagnosis:</label>
								</Col>
								<Col sm={10}>
									<Input type="textarea" ref="diagnosis" standalone style={sty.textarea} 
									placeholder="Enter Diagnosis" onChange={this.diagnosisInputChanged.bind(this)}
									value={diagnosis}/>
								</Col>
							</Row>
							<Row>
								<Col sm={2}>
									<label>Comment:</label>
								</Col>
								<Col sm={10}>
									<Input type="textarea" ref="comment" standalone style={sty.textarea} 
									placeholder="Enter Comment" onChange={this.commentInputChanged.bind(this)}
									value={comment}/>
								</Col>
							</Row>
							<Row>
								<Col sm={2}>
									<label>Amount:</label>
								</Col>
								<Col sm={5}>
									<Input type="text" ref="amount" standalone bsStyle={amountWarningStyle}
											placeholder="amount" value={amount} 
											onChange={this.amountInputChanged.bind(this)}/>
								</Col>
								<Col sm={3}>
									<Input type="checkbox" ref="decocted" standalone 
											label="Decocted" value={decocted}
											placeholder="amount" 
											onChange={this.decoctedChanged.bind(this)}/>
								</Col>
							</Row>
							
							
						</Col>
						<Col sm={4}>
							<h3>Prescription</h3>
							<Row>
								<Col sm={12}>
									<SearchDrugInput addDrugCB={this._addDrug.bind(this)}/>
								</Col>

							</Row>
							<Row>
								<Col sm={12}>
									<DrugTable drugs={drugs} />
								</Col>
							</Row>
							
						</Col>
						<Col sm={4}>
							<h3>My Favorate</h3>
							<Row>
								<Col sm={12}>
									<MyFavoritePrescriptions addFavoritePrescription={this.addFavoritePrescription}/>
								</Col>
							</Row>
							<div className="actionBtns">
								<Button bsStyle="primary" bsSize="small" style={sty.toolbox} 
									onClick={this.showPreview.bind(this)}>Preview</Button>
								<Button bsStyle="primary" bsSize="small" style={sty.toolbox}>Save As</Button>
							</div>
						</Col>
					</Row>			
				</Grid>

				

				<PrescriptionPreview {...this.state} 
					onHide={this.closePreview.bind(this)} />

			</div>
		);
	}

	nameInputChanged() {
		Model.updateName(this.refs.name.getValue());
	}

	phoneInputChanged() {
		Model.updatePhone(this.refs.phone.getValue());
	}

	sexInputChanged() {
		Model.updateSex(this.refs.sex.getValue());
	}

	ageInputChanged() {
		Model.updateAge(this.refs.age.getValue());
	}

	symptomInputChanged() {
		Model.updateSymptom(this.refs.symptom.getValue());
	}

	diagnosisInputChanged() {
		Model.updateDiagnosis(this.refs.diagnosis.getValue());
	}

	commentInputChanged() {
		Model.updateComment(this.refs.comment.getValue());
	}

	amountInputChanged() {
		Model.updateAmount(this.refs.amount.getValue());
	}

	decoctedChanged(){
		Model.updateDecocted(this.refs.decocted.getChecked());
	}

	_addDrug(drug) {
		Model.addDrugs([drug]);
	}

	addFavoritePrescription(prescription) {
		let drugs = ConvertionUtil.getDrugsFromPrescription(prescription);
		Model.addDrugs(drugs);
	}

	closePreview() {
		this.setState({showPreview: false});
	}

	showPreview() {
		this.setState({showPreview: true});
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
