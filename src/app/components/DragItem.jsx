import React from 'react';
let { Styles, TextField, FlatButton, SelectField} = require('material-ui');

export const DragItem = React.createClass({
	getDragOptions() {
		return [
			{id: "1", name: "Option1"},
			{id: "2", name: "Option2"},
			{id: "3", name: "Option3"},
		]
	}
	render() {
		let options = getDragOptions();
		return (
			<div>
				drug <TextField hintText={"this.props.dragName"} /> g
				<SelectField
					  valueMember="id"
					  displayMember="name"
					  menuItems={options} />
				
			</div>
		);
	}
});
