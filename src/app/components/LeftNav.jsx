import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import { History } from 'react-router';

export const LeftNav = React.createClass({
	render() {
		return (
			<ButtonGroup vertical>
				<Button bsStyle="primary" bsSize="small"  href="#/prescription">Button1</Button>
				<Button bsStyle="primary" bsSize="small">Button2</Button>
				<Button bsStyle="primary" bsSize="small">Button3</Button>
			</ButtonGroup>
		);
	},
});

module.exports = LeftNav;
