import React from 'react';
import {Input} from 'react-bootstrap';
import {$post} from '../services/HttpService';
import DrugList from './DrugList';
import {keyMap} from '../services/Constants';
import {findDOMNode} from 'react-dom';

export default class SearchDrugInput extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	drugs: [],
	    	selectedIndex: null,
	    	keyword: "",
		};
		this._handleWindowClose.bind(this);
	}

	componentDidMount() {
        // The `focus` event does not bubble, so we must capture it instead.
        // This closes Typeahead's dropdown whenever something else gains focus.
        window.addEventListener('focus', this._handleWindowClose, true);
        // If we click anywhere outside of Typeahead, close the dropdown.
        window.addEventListener('click', this._handleWindowClose, false);
    }

    componentWillUnmount() {
        window.removeEventListener('focus', this._handleWindowClose, true);
        window.removeEventListener('click', this._handleWindowClose, false);
    }

	 _handleWindowClose = (event) => {
        let target = event.target;
        if (target !== window && !findDOMNode(this).contains(target)) {
            this._close();
        }
    }

	_handleSearchInputChange() {
		let keyword = this.refs.drugSearchInput.getValue();
		const tmp = [
			{title: "james", id: "11111", weight: ""}, 
			{title: "jason", id: "21111", weight: ""}, 
			{title: "jakon", id: "3", weight: ""}, 
			{title: "jaksone", id: "4", weight: ""}, 
		]

		if (keyword.trim() !== "") {
			$post("medicine/search", {kw: keyword}, function(result){
				if (result.data.length > 0) {
					this.setState({drugs:result.data, selectedIndex: 0});
				} else {
					this._close();
				}
				
			}.bind(this));
			// let result = tmp.filter(item => item.title.indexOf(keyword) !== -1);
			
			// if (result.length > 0) {
			// 	this.setState({drugs:result, selectedIndex: 0});
			// } else {
			// 	this._close();
			// }
			
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
		this.props.addDrugCB({
			id: drug.id,
			title: drug.title,
		});
		this._close();
		this.refs.drugSearchInput.refs.input.value = "";
	}

	_close() {
		this.setState({selectedIndex: null, drugs: []});
	}

	render() {
		return (
			<div>
				<Input type="text" className="drugSearchInput" ref="drugSearchInput" standalone
					onFocus={this._handleSearchInputChange.bind(this)}
					placeholder="输入药方" onChange={this._handleSearchInputChange.bind(this)} 
					onKeyDown={this._onKeyDown.bind(this)}/>
				<DrugList drugs={this.state.drugs} rowClicked={this.selected.bind(this)}
					selectedIndex={this.state.selectedIndex}/>
				
			</div>
		);
	}
}
