import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class Alert extends React.Component {
	constructor(props) {
		console.log("alert");
	    super(props);
	    this.state = this.getInitState();
		
	}

	getInitState() {
		return {
			show: true,
		}
	}

	yes() {
		this.props.yes();
		this.close();
	}

	close() {
		if (this.props.no) {
			this.props.no();
		}

		this.setState({
			show: false,
		});
	}

	render() {
		console.log("render", this.state);
		let {title, info} = this.props;
		let {show} = this.state;
		return (
			<Modal show={show} onHide={()=>this.close()}>
	          <Modal.Header closeButton>
	            <Modal.Title>{title}</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
	            <h4>{info}</h4>
	          </Modal.Body>
	          <Modal.Footer>
	            <Button onClick={()=>this.yes()}>确认</Button>
	            <Button onClick={()=>this.close()}>取消</Button>
	          </Modal.Footer>
	        </Modal>
		);
	}
}
