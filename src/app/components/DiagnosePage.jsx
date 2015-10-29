import React from 'react';

let { Styles, TextField, FlatButton, Snackbar} = require('material-ui');
let { Colors } = Styles;

const DiagnosePage = React.createClass({
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
		      floatingLabelStyle: {
		      	fontWeight: "bold",
		      	color: Colors.grey700,
		      },
		      hintStyle: {
		      	fontWeight: "normal",
		      	color: "red",
		      },
		      image: {
		      	width: "150",
		      	height: "200",
		      	marginRight: "10",
		      },
		};
		return sty;
	},
	getInitialState() {
		return {
			images: [], 
			patentName: "james",
		};
	},
	render() {
		console.log("rendersss"); 
		
		let sty = this.getStyles();
		return (
			<div>
				<div style={{float: "left", width: "400px"}}>
					<TextField  
						underlineStyle={{borderColor:Colors.green500}}
						floatingLabelText="Patient Name" 
						value={this.state.patentName} />

					<TextField style={{display:'block'}}
						floatingLabelText="Description"
						underlineStyle={{borderColor:Colors.green500}}
						rows={1} rowsMax={4} 
						multiLine={true}/>


					<FlatButton primary={true} label="Choose an Image">
					    <input type="file" ref="imageFiles"
					    	style={sty.imageInput} multiple
					    	onChange={this._handleFileSelect}></input>
					 </FlatButton>

					 <div>
					 	{this.state.images}
					 </div>
					 

					<TextField  style={{display:'block'}}
						floatingLabelText="Description" 
						underlineStyle={{borderColor:Colors.green500}}
						rowsMax = {4} hintText="10-15 words"
						multiLine={true}/>

					<Snackbar
			            ref="snackbar"
			            message="invalid image" />
		        </div>
		        <div style={{float: "left", "borderLeft": "2px solid #999999", height: "300px", width: "2px"}}>

					
			    </div>
		        <div style={{float: "left"}}>
		        	right
		        </div>
			</div>
		);
	},
	_handleFileSelect(evt) {
		let sty = this.getStyles();
		let f;
		let images = this.state.images;
		for (let i = 0; f = evt.target.files[i]; i++) {
			if (!f.type.match('image.*')) {
		        this.refs.snackbar.show();
		    } else {
		    	let reader = new FileReader();
		    	let _this = this;
                reader.onload = function (e) {
                	 images.push(
                    	<img style={sty.image} src={e.target.result} />
                    );
                	_this.setState({images: images});
                };

                reader.readAsDataURL(f);
		    }
		}
		
		
		this.refs.imageFiles.value = "";
		
	},

});

module.exports = DiagnosePage;