import React from 'react';
import Tab from 'material-ui/lib/tabs/tab';
import Tabs from 'material-ui/lib/tabs/tabs';
import { History } from 'react-router'


const Top = React.createClass({
	mixins: [History],
	render() {
		return (
			<Tabs>
		    	<Tab label="添加患者">

				</Tab>
		    	<Tab label="我的药方" route="/diagnose" onActive={this._handleTabActive} >
		      
		    	</Tab>
		    	<Tab label="就诊历史" route="/patients" onActive={this._handleTabActive} >
		      
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