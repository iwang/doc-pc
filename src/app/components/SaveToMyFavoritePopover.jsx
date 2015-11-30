import React from 'react';
import {Modal, Button, Row, Col, Grid, Input} from 'react-bootstrap';
import FavoritePrescript from '../models/FavoritePrescript';
import PrescriptionOverview from './PrescriptionOverview';
import ConvertionUtil from '../services/ConvertionUtil';
import {$post} from '../services/HttpService';
import Notifier from './Notifier';

export default class SaveToMyFavoritePopover extends React.Component {
	constructor(props) {
	    super(props);
	    this.visible = false;
	    this.state = this.getInitState();
		this.model = new FavoritePrescript(this.state);
	}

	getInitState() {
		return {
	    	title: "",
	    	submitting: false,
	    	valid: false,
	    	titleValid: false,
	    	errorMsg: "",
		};
	}

	componentDidMount() {
		this.modelDisposal = this.model.subjects.subscribe(state=>this.setState(state));
	}

	componentWillUnmount() {
		this.modelDisposal.dispose();

	}

	titleChanged(val) {
		this.model.updateTitle(val);
	}

	onShow() {
		this.setState(this.getInitState());
	}

	onHide(){
		this.props.onHide();
	}

	submit() {
		this.setState({
			submitting: true,
		})
		$post("prescript/create", {
			title: this.state.title,
			content: ConvertionUtil.drugsToJson(this.props.drugs),
		}, 
		success=>{
			this.setState({submitting: false});
			this.props.favoriteSaved();
		}, 
		fail=>{
			this.setState({
				submitting:false,
				valid:false,
				errorMsg: fail.msg,
			})
		});
	}

	render() {
		let {drugs, showSaveToMyFavorite} = this.props;
		//if (!showSaveToMyFavorite) return null;
		let {title, titleValid, submitting, errorMsg} = this.state;
		let submitLabel = submitting ? "保存中" : "保存";
		let titleWarningStyle = titleValid ? null : "error";
		let valid = titleValid;

		let errorFooter = null;
		if (errorMsg !== "") {
			errorFooter = <Row className="footer-row error">
				    	<Col sm={12}>
			          		{errorMsg}
			          	</Col>
		          	</Row>;
		}

		return (
			<Modal className="save-to-favorite-popover" show={showSaveToMyFavorite} onHide={()=>this.onHide()}>
				 <Modal.Header closeButton>
		            <Modal.Title>保存到常用药方</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
	          		<div className="field form-horizontal">
							<label>药方名称:</label>
							<Input className="medium" standalone type="text" placeholder="药方名称" 
							bsStyle={titleWarningStyle} value={title}
							onChange={evt=>this.titleChanged(evt.target.value)}/>
	          		</div>
	          		<h4 className="section-title">药方清单：</h4>	
		          	<PrescriptionOverview drugs={drugs}/>
		           </Modal.Body>
		          <Modal.Footer>
		          	{errorFooter}
		            <Button disabled={!valid || submitting} bsStyle="primary" className="submit" 
		            	onClick={!submitting ? ()=>this.submit() : null}>{submitLabel}</Button>
		          </Modal.Footer>
		          <Notifier onShow={()=>this.onShow()}/>
			</Modal>
		);
	}
}
