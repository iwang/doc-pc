import React from 'react';
import {Table, Column} from 'fixed-data-table';
import {$post} from '../services/HttpService';
import '../css/fixed-data-table.css';
import ConvertionUtil from '../services/ConvertionUtil';
import {Button, ButtonToolbar} from 'react-bootstrap';

export default class Patients extends React.Component {
	getInitState() {
		return {
	    	loaded: false,
	    	patients: [],
	    	page: 0,
		};
	}

	constructor(props) {
	    super(props);
	    this.state = this.getInitState();
	}

	loadData(page) {
		this.setState(this.getInitState());
		$post("acrecipel/getlist", 
		{
			page: page,
			limit: 10,
		}, 
		result => {
			this.setState({
				loaded: true, 
				patients: result.data || [],
				page: page,
			})
		}, 
		result => {
			console.log("loading prescript fail");
		});
	}

	componentDidMount() {
		this.loadData(0);
	}

	paging(page) {
		this.loadData(page);
	}

	render() {
		
		let {page, patients, loaded} = this.state;

		let loadingIcon = null;
		let buttons = null;
		if (!loaded) {
			loadingIcon = <span className="glyphicon glyphicon-refresh spinning big center-icon"></span>;
		} else {
			buttons = <ButtonToolbar style={{'margin-top': '20px'}}>
		      <Button disabled={page === 0} bsStyle="primary" onClick={()=>this.paging(page-1)}>上一页</Button>
		      <Button bsStyle="primary" onClick={()=>this.paging(page+1)}>下一页</Button>
		    </ButtonToolbar>;
		}

		let rows = patients.map(patient=>{
			let {describe, phone, content, receiver_name, receiver_phone, type_id, result, receiver_age, receiver_gender, amount, pack, time_revisit, money_total, is_decoction} = patient;
			console.log(is_decoction);
			return [
				receiver_name,
				phone,
				ConvertionUtil.getGenderName(receiver_gender),
				receiver_age,
				describe,
				result,
				money_total+"元",
				ConvertionUtil.getDateStr(time_revisit),
				amount+"贴",
				is_decoction==="0" ?  "" : "代煎",
				ConvertionUtil.getTypeName(type_id),

			]
		});

		return (
			<div style={{'margin-left': '40px'}}>
			{loadingIcon}
			<Table
		    rowHeight={50}
		    rowGetter={rowIndex=>rows[rowIndex]}
		    rowsCount={rows.length}
		    width={1200}
		    maxHeight={560}
		    headerHeight={50}>
		    <Column
		      label="姓名"
		      width={80}
		      dataKey={0}
		    />
		    <Column
		      label="手机"
		      width={100}
		      dataKey={1}
		    />
		    <Column
		      label="性别"
		      width={50}
		      dataKey={2}
		    />
		    <Column
		      label="年龄"
		      width={50}
		      dataKey={3}
		    />
		    <Column
		      label="症状"
		      width={200}
		      dataKey={4}
		      flexGrow={1}
		    />
		    <Column
		      label="诊断结果"
		      width={200}
		      dataKey={5}
		      flexGrow={1}
		    />
		    <Column
		      label="金额"
		      width={80}
		      dataKey={6}
		    />
		    <Column
		      label="复诊时间"
		      width={90}
		      dataKey={7}
		    />
		    <Column
		      label="药贴数"
		      width={80}
		      dataKey={8}
		    />
		     <Column
		      label="代煎"
		      width={60}
		      dataKey={9}
		    />
		    <Column
		      label="订单类型"
		      width={80}
		      dataKey={10}
		    />
		  </Table>
		  	{buttons}
		  </div>
		);
	}
}
