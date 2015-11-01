import React from 'react';
import {Input} from 'react-bootstrap';
import {$post} from '../services/HttpService';
import DrugList from './DrugList';

export default class SearchDrugInput extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	drugs: [],
		};
		
	}

	getStyle() {
		return {
			drugInput: {
		      	width: "150",
	      	},
		}
	}

	_handleSearchInputChange() {
		let keyword = this.refs.drugInput.getValue();
		console.log(keyword);

		if (keyword.trim() !== "") {
			$post("medicine/search", {kw: keyword}, function(result){
				this.setState({drugs:result.data});
			}.bind(this));
		}
	}

	render() {
		let sty = this.getStyle();

		return (
			<div>
				<Input type="text" style={sty.drugInput} ref="drugInput"
					placeholder="输入药方" onChange={this._handleSearchInputChange.bind(this)} />
				<DrugList drugs={this.state.drugs} />
			</div>
		);
	}
}
