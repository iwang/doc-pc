import React from 'react';

export default class LoadingIcon extends React.Component {
	render() {
		let {loading, sty} = this.props;

		return loading ? <span style={{...sty}} className="glyphicon glyphicon-refresh spinning"></span> : null;
	}
}
