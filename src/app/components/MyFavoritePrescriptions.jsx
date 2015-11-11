import React from 'react';
import {$post, $get} from '../services/HttpService';
import {Button, Glyphicon, Label, OverlayTrigger, Popover} from 'react-bootstrap';
import PrescriptionOverview from './PrescriptionOverview';
import ConvertionUtil from '../services/ConvertionUtil';

export default class MyFavoritePrescriptions extends React.Component {
	getInitState() {
		return {
	    	loaded: false,
	    	prescriptions: [],
		};
	}

	constructor(props) {
	    super(props);
	    this.state = this.getInitState();
		
	}

	loadData() {
		this.setState(this.getInitState());
		$post("prescript/getlist_personal", {}, 
		result => {
			this.setState({
				loaded: true, 
				prescriptions: result.data || [],
			})
		}, 
		result => {
			let raw = [{ "id": "753", "title": "\u98ce\u683c", "pinyin": "fengge", "py": "fg", "timeline": "1446726760", "content": [{ "i": "12", "t": "\u767d\u679c", "k": "3", "u": "\u514b", "b": "\u53e6\u5305" }, { "i": "156", "t": "\u5730\u9aa8\u76ae", "k": "16", "u": "\u514b", "b": "" }] }];
			this.setState({
				loaded: true, 
				prescriptions: raw,
			})
			console.log("loading prescript fail");
		});
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		let {loaded, prescriptions} = this.state;
		if (!loaded) {
			return  <span className="glyphicon glyphicon-refresh spinning big"></span>;
		} else {
			let prescriptionEl = prescriptions.map(prescritpion=>{
				let formattedDrugs = ConvertionUtil.jsonToDrugs(prescritpion.content);
				//let popover = <PrescriptionOverview data={prescritpion}>aa</PrescriptionOverview>;
				let popover = <Popover id="my-favorite-prescription-list" title={prescritpion.title}><PrescriptionOverview drugs={formattedDrugs} /></Popover>
				return <li key={prescritpion.id}>
					<div className="title">{prescritpion.title}</div>
					<OverlayTrigger trigger={['focus', 'hover']} placement="right" overlay={popover}>
				    	<Button bsSize="xsmall"><Glyphicon glyph="info-sign" /></Button>
				    </OverlayTrigger>
					<Button className="action" bsSize="xsmall" onClick={evt=>this.props.addFavoritePrescription(prescritpion)}><Glyphicon glyph="plus" /></Button>
					</li>;
			});
			return <ul className="favor-prescription">{prescriptionEl}</ul>
		}
	}
}
