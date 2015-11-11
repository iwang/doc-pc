import React from 'react';

export default class LoadingIcon extends React.Component {
	render() {
		let loading = this.props.loading;
		return loading ? <span className="glyphicon glyphicon-refresh spinning"></span> : null;
	}
}
