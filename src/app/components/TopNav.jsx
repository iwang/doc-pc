import React from 'react';
import {Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export default class TopNav extends React.Component {
	render() {
		return (
			 <Navbar>
			    <NavBrand><a href="#">iGancao</a></NavBrand>
			    <Nav>
			      <NavItem eventKey={1} href="#/prescription">Prescription</NavItem>
			      <NavItem eventKey={2} href="#">Patients</NavItem>
			      <NavDropdown eventKey={3} title="My Setting" id="basic-nav-dropdown">
			        <MenuItem eventKey="1">My Favorate Prescription</MenuItem>
			        <MenuItem eventKey="2">Logout</MenuItem>
			       
			      </NavDropdown>
			    </Nav>
			  </Navbar>
		);
	}
}
