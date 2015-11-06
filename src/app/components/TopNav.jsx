import React from 'react';
import {Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export default class TopNav extends React.Component {
	render() {
		return (
			 <Navbar>
			    <NavBrand><a href="#">iGancao</a></NavBrand>
			    <Nav>
			      <NavItem eventKey={1} href="#/prescription">开方</NavItem>
			      <NavItem eventKey={2} href="#">历史查看</NavItem>
			      <NavDropdown eventKey={3} title="我的设置" id="basic-nav-dropdown">
			        <MenuItem eventKey="1">我的常用方</MenuItem>
			        <MenuItem eventKey="2">注销</MenuItem>
			       
			      </NavDropdown>
			    </Nav>
			  </Navbar>
		);
	}
}
