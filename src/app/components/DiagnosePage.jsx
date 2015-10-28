import React from 'react';

let { Styles, TextField, FlatButton } = require('material-ui');
let { Colors } = Styles;

const DiagnosePage = React.createClass({
	
	render() {
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
		};

		return (
			<div>

			<TextField  
				underlineStyle={{borderColor:Colors.green500}}
				floatingLabelText="Patient Name" />

			<TextField style={{display:'block'}}
				floatingLabelText="Description"
				underlineStyle={{borderColor:Colors.green500}}
				rows={1} rowsMax={4} 
				multiLine={true}/>


			<FlatButton primary={true} label="Choose an Image">
			    <input type="file" id="imageFiles" multiple
			    	style={sty.imageInput} onChange="{this._handleFileSelect}"></input>
			 </FlatButton>

			<TextField  style={{display:'block'}}
				floatingLabelText="Description" 
				underlineStyle={{borderColor:Colors.green500}}
				rowsMax = {4} hintText="10-15 words"
				multiLine={true}/>

			</div>
		);
	},
	handleFileSelect(evt) {
		console.log(evt);
	},

});

module.exports = DiagnosePage;