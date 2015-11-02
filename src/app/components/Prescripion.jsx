import React from 'react';
import DrugTable from './DrugTable.jsx';
import {findDOMNode} from 'react-dom';
import SearchDrugInput from './SearchDrugInput.jsx';

import {Grid, Row, Col, Input, Button, Thumbnail, Overlay} from 'react-bootstrap';

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
		      	width: "90",
		      	float: "left",
		      },
		      
		};
		return sty;
	}
	

	constructor(props) {
	    super(props);
	    this.state = {images: [], 
			patentName: "james",
			drugs: [],
		};
		
	}

	render() {
		let sty = this.getStyles();
		let drugs = this.state.drugs;
		let leftDrugs = [];
		let rightDrugs = [];
		let index = 0;
		drugs.forEach(drug => {
			if (index % 2 === 0) {
				leftDrugs.push(drug);
			} else {
				rightDrugs.push(drug);
			}
			index++;
		});
		return (
			<div>
				<Grid>
					<Row>
						<Col sm={1}>
							<label>Name: </label>
						</Col>
						<Col sm={4}>
							<Input standalone type="text" placeholder="Enter text" />
						</Col>
						
						<Col sm={1}>
							<label>phone: </label>
						</Col>

						<Col sm={4}>
							<Input standalone type="text" placeholder="Phone" />
						</Col>
					</Row>
					<Row>
						<Col sm={1}>
							<label>Sex: </label>
						</Col>
						<Col sm={4}>
							<Input standalone type="text" placeholder="Sex" />
						</Col>
						
						<Col sm={1}>
							<label>age: </label>
						</Col>

						<Col sm={4}>
							<Input standalone type="text" placeholder="age" />
						</Col>
					</Row>
					<Row>
						<Col sm={1}>
							<label>Status: </label>
						</Col>
						<Col sm={9}>
							<Input standalone type="textarea" style={sty.textarea} placeholder="Enter texts" />
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
							<label>Result: </label>
						</Col>
						<Col sm={9}>
							<Input standalone type="textarea" style={sty.textarea} placeholder="Enter texts" />
						</Col>
					</Row>
					<Row>
						
						<Col sm={1}>
							<label style={sty.label}>Prescription: </label>
						</Col>
						
						<Col sm={9}>
							<SearchDrugInput addDrugCB={this._addDrug.bind(this)}/>
							<Button bsStyle="primary" bsSize="small" style={sty.toolbox}>Add</Button>

							<Button bsStyle="primary" bsSize="small" style={sty.toolbox}>Import</Button>
						
							<Button bsStyle="primary" bsSize="small" style={sty.toolbox}>Save As</Button>
						</Col>	
					</Row>					
				</Grid>
				<Row>
					<Col lg={5}>
						<DrugTable drugs={leftDrugs} />
					</Col>
					<Col lg={5}>
						<DrugTable drugs={rightDrugs} />
					</Col>
				</Row>

			</div>
		);
	}

	_addDrug(drug) {
		this.state.drugs.push(drug);
		this.setState({drugs: this.state.drugs});
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
