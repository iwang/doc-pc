import React from 'react';
import {Input} from 'react-bootstrap';
import {$post} from '../services/HttpService';
import DrugList from './DrugList';
import {keyMap} from '../services/Constants';

export default class SearchDrugInput extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	drugs: [],
	    	selectedIndex: null,
		};
		
	}

	getStyle() {
		return {
			drugInput: {
		      	width: "150",
		      	float: "left",
	      	},
		}
	}

	_handleSearchInputChange() {
		let keyword = this.refs.drugInput.getValue();
		const tmp = [
		{title: "james"}, {title: "jason"}, {title: "jakon"}, {title: "jaksone"}, 
		]

		if (keyword.trim() !== "") {
			// $post("medicine/search", {kw: keyword}, function(result){
			// 	this.setState({drugs:result.data});
			// }.bind(this));
			let result = tmp.filter(item => item.title.indexOf(keyword) !== -1);
			if (result.length > 0) {
				this.setState({drugs:result, selectedIndex: 0});
			} else {
				this._close();
			}
			
		} else {
			this._close();
		}

	}

	_onKeyDown(event) {
		let handler = this._getEventMap()[event.keyCode];
		
		if (handler) {
			handler();
		}
	}

	_onEnter(event) {
		if (this.state.selectedIndex >= 0 && this.state.selectedIndex < this.state.drugs.length) {
			let drug = this.state.drugs[this.state.selectedIndex];
			this.selected(drug);
		}
		
	}

	_getEventMap() {
		let keys = keyMap();
		let events = {};
	   

	    events[keys.DOM_VK_UP] = this.navUp.bind(this);
	    events[keys.DOM_VK_DOWN] = this.navDown.bind(this);
	    events[keys.DOM_VK_RETURN] = this._onEnter.bind(this);
	    //events[keys.DOM_VK_ESCAPE] = this._onEscape;
	    //events[keys.DOM_VK_TAB] = this._onTab;
	    return events;
	}

	_nav(delta) {
		let newIndex = this.state.selectedIndex === null ? (delta === 1 ? 0 : delta)
							: this.state.selectedIndex + delta;

		let length = this.state.drugs.length;
		if (newIndex < 0) {
			newIndex += length;
		} else if (newIndex >= length) {
			newIndex -= length;
		}
		
		this.setState({selectedIndex: newIndex});
	}

	navDown() {
		this._nav(1);
	}

	navUp() {
		this._nav(-1);
	}

	selected(drug) {
		this.props.addDrugCB(drug);
		this._close();
	}

	_close() {
		this.setState({selectedIndex: null, drugs: []});
	}

	render() {
		console.log("searchInput render");
		let sty = this.getStyle();

		return (
			<div>
				<Input standalone type="text" style={sty.drugInput} ref="drugInput"
					placeholder="输入药方" onChange={this._handleSearchInputChange.bind(this)} 
					onKeyDown={this._onKeyDown.bind(this)}/>
				<DrugList drugs={this.state.drugs} selected={this.selected.bind(this)}
					selectedIndex={this.state.selectedIndex}/>
				
			</div>
		);
	}
}
