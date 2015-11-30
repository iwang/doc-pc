import React from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import StorageUtil from "../services/StorageUtil";

export default class Main extends React.Component {
	getInitState() {
		let index = this.getIndexFromPath(location.href);
		return {
	    	index: index,
		};
	}

	getIndexFromPath(url) {
		if (url.indexOf("#/patients") !== -1) {
			return 2;
		} else if (url.indexOf("#/favors") !== -1) {
			return 3; 
		} else {
			return 1;
		}
	}

	constructor(props) {
	    super(props);
	    this.state = this.getInitState();
	}

	nav(url) {
		location.href = url;
	}

	selected(index){
		this.setState({
			index: index,
		})
	}

	logout() {
		StorageUtil.cleanSession();
		location.href = "/";
		//TODO need logout api
	}


	render() {
		let {index} = this.state;
		return (
			<Nav bsStyle="pills" stacked activeKey={index} 
				onSelect={(index)=>this.selected(index)}>
			    <NavItem eventKey={1} 
			    	onClick={()=>{this.nav('#/prescription')}}>看病开方</NavItem>
			    <NavItem eventKey={2} 
			    	onClick={()=>{this.nav('#/patients')}}>历史查看</NavItem>
			    <NavItem eventKey={3} 
			    	onClick={()=>{this.nav('#/favors')}}>我的常用方</NavItem>
			    <NavItem eventKey={4} onSelect={this.logout}>注销</NavItem>
			</Nav>
		);
	}
}

