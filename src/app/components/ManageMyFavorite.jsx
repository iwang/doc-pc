import React from 'react';

export default class ManageMyFavorite extends React.Component {
	

	componentDidMount() {
		this.modelDisposal = this.model.subjects.subscribe(state=>this.setState(state));
	}

	render() {
		return (
			<div>ManageMyFavorite</div>
		);
	}
}
