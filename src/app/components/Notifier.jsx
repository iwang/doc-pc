import React from 'react';

export default class Notifier extends React.Component {
	componentDidMount() {
        this.props.onShow && this.props.onShow();
    }

    componentWillUnmount() {
    	this.props.onHide && this.props.onHide();
    }

    render() {
        return null;
    }
}
