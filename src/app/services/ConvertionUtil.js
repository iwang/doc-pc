import m from 'moment';
import React from 'react';

export default class ConvertionUtil {
	static prescriptionTypeMap = {
	    "1": "线下开方",
	    "2": "转方",
	    "3": "膏方节",
	}

	static genderMap = {
	    "0": "女",
	    "1": "男",
	}

	static decoctMethod = {
		"200ml": "200ml/包，一天2次",
		"100ml": "100ml/包，一天3次",
		"other": "其他：自己填写", 
	}

	static getPackName(type, name) {
		return type !== "3" ? ConvertionUtil.prescriptionTypeMap[type] : "";
	}

	static getDecoctComment(type, comment) {
		return type !== "other" ? ConvertionUtil.decoctMethod[type] : comment;
	}

	static getOptions(options){
		//TODO, get options
	}

	static getDateStr(time) {
		return m(new Date(time*1000)).format("YYYY/MM/DD");
	}

	static getGenderName(value) {
		return ConvertionUtil.genderMap[value];
	}

	static getTypeName(value) {
		return ConvertionUtil.prescriptionTypeMap[value];
	}

	// [{ "i": "12", "t": "\u767d\u679c", "k": "3", "u": "\u514b", "b": "\u53e6\u5305" }, { "i": "156", "t": "\u5730\u9aa8\u76ae", "k": "16", "u": "\u514b", "b": "" }]
	static jsonToDrugs(raw) {
		return raw.map(drug=>{
			return {
				id: drug["i"],
				title: drug["t"],
				weight: drug["k"],
				comment: drug["b"],
				key: ConvertionUtil.getUUID(drug["i"]),
			}
		});
	}

	static drugsToJson(drugs) {
		return JSON.stringify(drugs.map(drug=>{
			return {
				k: drug.weight,
				i: drug.id,
				u: "克",
				b: drug.comment,
				t: drug.title,
			}
		}));
	}

	static getDrugsFromPrescription(raw) {
		return ConvertionUtil.jsonToDrugs(raw.content);
	}

	static getUUID(id) {
	  return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + "" + id;
	}
}
