import React from 'react';
import {Input, Button, Label} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {$post, $get} from '../services/HttpService';
import {Router, Route, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';
import Main from './Main';
import Prescripion from './Prescription';
import Patients from './Patients';
import MyFavoritePrescriptions from './MyFavoritePrescriptions';
import StorageUtil from "../services/StorageUtil";
import '../css/bootstrap.min.css';
import '../css/login.css';

export default class Login extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	errorMsg: "",
	    	login: null,
	    	logining: false,
	    	claimed: true,
		};
		
	}

	componentDidMount() {
	   $get("doctor/check_session", {}, 
	    success => {
			if (success.data.id) {
				localStorage.setItem("did", success.data.id);
				this.gotoMain();
			} else {
				this.setState({login: false});
				StorageUtil.cleanSession();
			}
	    }, 
	    fail=>{
	        this.setState({login: false});
	        StorageUtil.cleanSession();
	    });

	    
	}

	gotoMain() {

	    ReactDOM.render(
	      <Router>
	        <Route path="/" component={Main}>
	          <IndexRoute component={Prescripion} />
	          <Route path="prescription" component={Prescripion} />
	          <Route path="patients" component={Patients} />
	          <Route path="favors" component={MyFavoritePrescriptions} />
	          <Route path="*" component={Prescripion}/>
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
				marginTop: 20,
				marginBottom: 100,
				border: "1px #CCCCCC solid",
				borderRadius: 10,
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
		let {login, logining, claimed} = this.state;
		if (login === false) {
			content = 
			<div className="login">
				<div className="header">
					<div className="header-main">
						<div className="logo"><a href="http://www.igancao.com/index.php " title="甘草医生"><img src="http://www.igancao.com/static/web/img/logo.png?v=v3" alt="甘草医生"/></a></div>
						<ul className="nav-left">
							<li>
								<a href="http://www.igancao.com/index.php/news"><img src="http://www.igancao.com/static/web/img/nav_threeb.png?v=v3"/></a>
								<a className="hover" href="http://www.igancao.com/index.php/news  "><img src="http://www.igancao.com/static/web/img/nav_three.png?v=v3 "/></a>
							</li>
							<li className="navon">
								<img src="http://www.igancao.com/static/web/img/nav_twob.png?v=v3"/>
								<a className="hover" href="http://www.igancao.com/index.php/doctor "><img src="http://www.igancao.com/static/web/img/nav_two.png?v=v3 "/></a>
							</li>
							<li>
								<a href="http://www.igancao.com/index.php"><img src="http://www.igancao.com/static/web/img/nav_oneb.png?v=v3 "/></a>
								<a className="hover" href="http://www.igancao.com/index.php " style={{display: 'inline'}}><img src="http://www.igancao.com/static/web/img/nav_one.png?v=v3 "/></a>
							</li>
						</ul>
					</div>
				</div>

				<div style={style.loginWindow}>
					<form onSubmit={this._onSubmit.bind(this)}>
						<Input type="text" style={style.input} 
							placeholder="手机号码" ref="phone"/>
						<Input type="password" style={style.input} 
							placeholder="密码" ref="pwd" />
						<div style={style.checkboxContainer}> 
							<Input type="checkbox" ref="claim" checked={claimed} onChange={(evt)=>this.claimChanged(evt.target.checked)} />	
							<div style={style.checkboxLabel}>我同意<a className="link">甘草用户使用协议</a></div>		 
						</div>
						<Label style={style.message} bsStyle="warning">{this.state.errorMsg}</Label>
						<div>
							<Button disabled={logining || !claimed} style={style.loginBtn} bsStyle="primary" bsSize="large"
								type="submit">登录</Button>
						</div>
						
					</form>
				</div>

				<div className="page-footer">
				    <div className="index-footer-main">
				        <div className="gotop">
				            <img src="http://www.igancao.com/static/web/img/gotop.png?v=v3 "/>
				        </div>
				       
				    </div>
				    <div className="index-footer-bottom">
				        <div className="bottom-nav">
				            <a href="http://www.igancao.com/index.php/contact "><img src="http://www.igancao.com/static/web/img/bottom-one.png?v=v3 "/></a>
				            <a href="http://www.igancao.com/index.php/about " style={{marginRight: 0}}><img src="http://www.igancao.com/static/web/img/bottom-two.png?v=v3 "/></a>
				        </div>
				        <div className="bottom-info">
				            <p>Copyright © 2015 igancao.com All Rights Reserved</p>
				            <p>浙ICP备15030501号</p>
				        </div>
				    </div>
				</div>
			</div>
		}
		return (
			<div>
				{content}
			</div>
			
		);
	}

	claimChanged(val) {
		this.setState({
			claimed: val,
		});
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
			this.setState({
				logining: true,
			});
			$post("doctor/login", 
		      {phone: phoneInput, pwd: pwdInput},
		      success=> {
		      	localStorage.setItem("token", success.data.token);
        		localStorage.setItem("did", success.data.id);
	        	this.gotoMain();
	        	},
	          fail=>{
	          	this.setState({
					logining: false,
				});
	      		this.setState({errorMsg: fail.msg});
	          }
		      	);
		}
	}
}
