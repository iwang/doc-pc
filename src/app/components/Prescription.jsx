import React from 'react';
import DrugTable from './DrugTable.jsx';
import {findDOMNode} from 'react-dom';
import SearchDrugInput from './SearchDrugInput.jsx';
import PrescriptionPreview from './PrescriptionPreview.jsx';
import Model from '../models/Prescription';

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

	componentWillMount() {
		console.log("model init");
		Model.subjects.subscribe(state => this.setState(state));
		Model.init();
	}

	render() {
		console.log("render", this.state);
		
		let sty = this.getStyles();
		let leftDrugs = [];
		let rightDrugs = [];
		let index = 0;

		let {name, phone, sex, age, diagnosis, symptom, drugs, phoneValid, nameValid, ageValid} = this.state;
		
		drugs.forEach(drug => {
			if (index % 2 === 0) {
				leftDrugs.push(drug);
			} else {
				rightDrugs.push(drug);
			}
			index++;
		});

		let phoneWarningStyle = phoneValid ? "" : "error";
		let nameWarningStyle = nameValid ? "" : "error";
		let ageWarningStyle = ageValid ? "" : "error";
		return (
			<div>
				<Grid className="prescritionForm">
					<Row>
						<Col sm={1}>
							<label>Name:</label>
						</Col>
						<Col sm={2}>
							<Input ref="name" standalone type="text" placeholder="Enter text" 
							value={name} bsStyle={nameWarningStyle}
							onChange={this.nameInputChanged.bind(this)}/>
						</Col>
						
						<Col sm={1}>
							<label>phone:</label>
						</Col>

						<Col sm={2}>
							<Input ref="phone" standalone type="text" placeholder="Phone" 
							value={phone} bsStyle={phoneWarningStyle}
								onChange={this.phoneInputChanged.bind(this)}/>
							
						</Col>
					</Row>
					<Row>
						<Col sm={1}>
							<label>Sex:</label>
						</Col>
						<Col sm={2}>
							<Input type="select" ref="sex" standalone 
							value={sex} onChange={this.sexInputChanged.bind(this)}>
								<option value="1">male</option>
			      				<option value="2">femail</option>
							</Input>
						</Col>
						
						<Col sm={1}>
							<label>age:</label>
						</Col>

						<Col sm={2}>
							<Input type="text" ref="age" standalone bsStyle={ageWarningStyle}
									placeholder="age" value={age} 
									onChange={this.ageInputChanged.bind(this)}/>
						</Col>
					</Row>
					<Row>
						<Col sm={1}>
							<label>Symptom:</label>
						</Col>
						<Col sm={5}>
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
						<Col sm={1}>
							<label>Diagnosis:</label>
						</Col>
						<Col sm={5}>
							<Input type="textarea" ref="diagnosis" standalone style={sty.textarea} 
							placeholder="Enter Diagnosis" onChange={this.diagnosisInputChanged.bind(this)}
							value={diagnosis}/>
						</Col>
					</Row>
					<Row>
						
						<Col sm={1}>
							<label style={sty.label}>Prescription: </label>
						</Col>
						
						<Col sm={5} className="btns">
							<SearchDrugInput addDrugCB={this._addDrug.bind(this)}/>
							<Button bsStyle="primary" bsSize="small" style={sty.toolbox} 
								onClick={this.showPreview.bind(this)}>Preview</Button>
							<Button bsStyle="primary" bsSize="small" style={sty.toolbox}>Import</Button>
							<Button bsStyle="primary" bsSize="small" style={sty.toolbox}>Save As</Button>
						</Col>	
					</Row>					
				</Grid>
				<Row className="prescritionDrugs">
					<Col sm={4}>
						<DrugTable drugs={leftDrugs} />
					</Col>
					<Col sm={4}>
						<DrugTable drugs={rightDrugs} />
					</Col>
				</Row>

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

	_addDrug(drug) {
		Model.addDrug(drug);
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
