import React from 'react';
import {Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import StorageUtil from "../services/StorageUtil";
import {Router} from 'react-router';

export default class TopNav extends React.Component {
	getInitState() {
		return {
	    	index: 1,
		};
	}

	constructor(props) {
		console.log(Router);
	    super(props);
	    this.state = this.getInitState();
	}

	logout() {
		StorageUtil.cleanSession();
		location.href = "/";
		//TODO need logout api
	}

	selected(index){
		console.log(index);
		this.setState({
			index: index,
		})
	}

	nav(url) {
		location.href = url;
	}

	render() {
		let {index} = this.state;
		return (
			 <Navbar>
			    <NavBrand><a href="#">iGancao</a></NavBrand>
			    <Nav navbar={true} onSelect={(index)=>this.selected(index)}>
			      <NavItem active={index===1} eventKey={1} href="#/prescription" 
			      	onClick={()=>{this.nav('#/prescription')}}>开方</NavItem>
			      <NavItem active={index===2} eventKey={2} href="#/patients" 
			      	onClick={()=>{this.nav('#/patients')}}>历史查看</NavItem>
			      <NavDropdown eventKey={3} title="我的设置" id="basic-nav-dropdown">
			        <MenuItem eventKey="1" href="#/manage-favorites">我的常用方</MenuItem>
			        <MenuItem eventKey="2" onSelect={this.logout}>注销</MenuItem>
			       
			      </NavDropdown>
			    </Nav>
			  </Navbar>
		);
	}
}
