import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class PopoverPage extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = this.getInitState();
		
	}

	getInitState() {
		return {
			show: true,
		}
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
		let {title, page} = this.props;
		let {show} = this.state;
		return (
			<Modal show={show} onHide={()=>this.close()}>
	          <Modal.Header closeButton>
	            <Modal.Title>{title}</Modal.Title>
	          </Modal.Header>
	          <Modal.Body style={{minHeight: 200}}>
	            {page}
	          </Modal.Body>
	           <Modal.Footer>
	           		<Button bsStyle="primary"
		            	onClick={()=>this.close()}>关闭</Button>
	           </Modal.Footer>
	        </Modal>
		);
	}
}
