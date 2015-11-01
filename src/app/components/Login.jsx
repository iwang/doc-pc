import React from 'react';
import {Input, Button, Label} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {$post, $get} from '../services/HttpService';
import {Router, Route } from 'react-router';
import ReactDOM from 'react-dom';
import Main from './Main';
import Prescripion from './Prescripion';

export default class Login extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	errorMsg: "",
	    	login: null,
		};
		
	}

	componentDidMount() {
	    console.log("componentDidMount");
	    $get("doctor/check_session", {}, function(doctor) {
	        if (doctor.status === 1) {
	          console.log("session exists", doctor);
	          localStorage.setItem("doctor", doctor);
	          this.gotoMain();
	        } else {
	          console.log("session expired");
	          this.setState({login: false});
	          localStorage.removeItem("doctor");
	          localStorage.removeItem("token");
	        }
	    }.bind(this));
	    
	}

	gotoMain() {

	    ReactDOM.render(
	      <Router>
	        <Route path="/" component={Main}>
	          <Route path="prescription" component={Prescripion} />
	        </Route>
	      </Router>,
	      document.getElementById('app')
	    );
	}

	getStyle() {
		let inputWidth = 300;
		let margin = 60;
		let btnWidth = 20;
		let padding = 5;
		return {
			loginWindow: {
				width: inputWidth + margin * 2,
				margin: "auto",
				border: "1px #666666 solid",
				paddingTop: margin/2,
				paddingBottom: margin/2,
			},
			input: {
				width: inputWidth,
				marginLeft: margin,
			},
			checkboxContainer: {
				display: "inline-block",
				marginLeft: margin+19,
				marginTop: -20,
				marginBottom: 10,
			},
			checkboxLabel: {
				marginTop: -5,		 
			},
			loginBtn: {
				width: inputWidth/2,
				marginLeft: (inputWidth+margin*2-inputWidth/2)/2,
				marginTop: 15,
			},
			message: {
				marginTop: 5,
				marginLeft: margin,
			},
		}
		
	}

	render() {
		let style = this.getStyle();
		let content = null;
		if (this.state.login === false) {
			content = 
			<div style={style.loginWindow}>
				<form onSubmit={this._onSubmit.bind(this)}>
					<Input type="text" style={style.input} defaultValue="15618389655" 
						placeholder="手机号码" ref="phone"/>
					<Input type="password" style={style.input} defaultValue="abc123_" 
						placeholder="密码" ref="pwd"/>
					<div style={style.checkboxContainer}> 
						<Input type="checkbox" ref="claim" defaultChecked />	
						<div style={style.checkboxLabel}>我同意<a className="link">甘草用户使用协议</a></div>		 
					</div>
					<Label style={style.message} bsStyle="warning">{this.state.errorMsg}</Label>
					<div>
						<Button style={style.loginBtn} bsStyle="primary" bsSize="large"
							type="submit">登录</Button>
					</div>
					
				</form>
			</div>
		}
		return (
			<div>
				{content}
			</div>
			
		);
	}

	_onSubmit(e) {
		e.preventDefault();
		let valid = true;
		
		let phoneInput = this.refs.phone.getValue();
		if (phoneInput.trim() === "") {
			console.log("empty phone");
			valid = false;
		}

		let pwdInput = this.refs.pwd.getValue();
		if (pwdInput.trim() === "") {
			console.log("empty password");
			valid = false;
		}

		if (!this.refs.claim.getChecked()) {
			console.log("not selected");
			valid = false;
		}

		if (valid) {
			$post("doctor/login", 
		      {phone: phoneInput, pwd: pwdInput},
		      function(result) {
		      	if (result.status === 1) {
		        		localStorage.setItem("token", result.data.token);
		        		localStorage.setItem("doctor", result.data);
			        	this.gotoMain();
		      	} else {
		      		console.log(result.msg);
		      		this.setState({errorMsg: result.msg});
		      	}
		        
		      }.bind(this));
		}
	}
}