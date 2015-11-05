import React from 'react';
import {$post, $get} from '../services/HttpService';
import {Button, Glyphicon, Label, OverlayTrigger, Popover} from 'react-bootstrap';

export default class MyFavoritePrescriptions extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	loaded: false,
	    	prescriptions: [],
		};
		
	}

	componentDidMount() {
		$post("prescript/getlist_personal", {}, result => {
			this.setState({
				loaded: true, 
				prescriptions: result.data,
			})
		});
	}

	render() {
		let {loaded, prescriptions} = this.state;
		if (!loaded) {
			return  <span className="glyphicon glyphicon-refresh spinning"></span>;
		} else {
			let prescriptionEl = prescriptions.map(prescritpion=>{
				return <ul key={prescritpion.id}>
				<Label>{prescritpion.title}</Label>
				<OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={<Popover id="prescriptionOverlay" title="Popover"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
			    	<Button bsSize="xsmall" onClick={evt=>console.log(prescritpion)}><Glyphicon glyph="info-sign" /></Button>
			    </OverlayTrigger>
				<Button bsSize="xsmall" onClick={evt=>console.log(prescritpion)}><Glyphicon glyph="plus" /></Button>
				</ul>
			});
			return <div>{prescriptionEl}</div>
		}
	}
}
