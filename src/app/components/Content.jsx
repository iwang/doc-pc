import React from 'react';

const Content = React.createClass({
	render() {
		return (
			<div>
			 {this.props.children}
			</div>
		);
	}
});

module.export = Content;