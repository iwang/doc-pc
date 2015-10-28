import React from 'react';
import Tab from 'material-ui/lib/tabs/tab';
import Tabs from 'material-ui/lib/tabs/tabs';
import { History } from 'react-router'


const Top = React.createClass({
	mixins: [History],
	render() {
		return (
			<Tabs>
		    	<Tab label="Add">

				</Tab>
		    	<Tab label="drug" route="/diagnose" onActive={this._handleTabActive} >
		      
		    	</Tab>
		    	<Tab label="history" route="/patients" onActive={this._handleTabActive} >
		      
		    	</Tab>
		  	</Tabs>
		);
	},
	_handleTabActive(tab){
		console.log(this.history);
		//console.log(this.props.history);
		//console.log(tab.props.route);
	    this.history.pushState(null, tab.props.route);
	  },
});



module.exports = Top;