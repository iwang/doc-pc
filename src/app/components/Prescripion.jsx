import React from 'react';

import {Grid, Row, Col, Input, Button} from 'react-bootstrap';

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
		};
		return sty;
	}

	constructor(props) {
	    super(props);
	    this.state = {images: [], 
			patentName: "james",
		};
		
	}

	render() {
		let sty = this.getStyles();
		return (
			<div>
				<Grid>
					<Row>
						<Col sm={1}>
							<label>Name: </label>
						</Col>
						<Col sm={4}>
							<Input type="text" placeholder="Enter text" />
						</Col>
						
						<Col sm={1}>
							<label>phone: </label>
						</Col>

						<Col sm={4}>
							<Input type="text" placeholder="Phone" />
						</Col>
					</Row>
					<Row>
						<Col sm={1}>
							<label>Status: </label>
						</Col>
						<Col sm={9}>
							<Input type="textarea" style={sty.textarea} placeholder="Enter texts" />
						</Col>
					</Row>
					<Row>
						<Button bsSize="small">Upload
							<input type="file" ref="imageFiles"
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
							<Input type="textarea" style={sty.textarea} placeholder="Enter texts" />
						</Col>
					</Row>
				</Grid>
				
			</div>
		);
	}

	_handleFileSelect(evt) {
		console.log(evt);
		console.log(this);
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
                    	<Col sm={3}><img style={sty.image} src={e.target.result} /></Col>
                    );
                	_this.setState({images: images});
                };

                reader.readAsDataURL(f);
		    }
		}
		
		
		this.refs.imageFiles.value = "";
		
	}

}
