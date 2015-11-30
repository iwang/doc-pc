import React from 'react';
import ConvertionUtil from '../services/ConvertionUtil';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import PrescriptionOverview from './PrescriptionOverview';

export default class PatientNameRenderer extends React.Component {
	render() {
		let {name, data} = this.props;
		let formattedDrugs = ConvertionUtil.jsonToDrugs(data[13]);
		let popover = <Popover id="my-favorite-prescription-list" title={name}><PrescriptionOverview drugs={formattedDrugs} /></Popover>
		return (
			<OverlayTrigger trigger={['focus', 'hover']} placement="right" overlay={popover}>
		    	<a style={{paddingLeft: 8, cursor: 'pointer'}}>{name}</a>
		    </OverlayTrigger>
		);
	}
}
