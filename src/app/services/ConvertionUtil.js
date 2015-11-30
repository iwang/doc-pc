import m from 'moment';
import React from 'react';

export default class ConvertionUtil {
	static prescriptionTypeMap = {
	    "1": "用药建议",
	    "3": "膏方节",
	}

	static isGaoFangType(value) {
		return value === "3";
	}

	static genderMap = {
	    "0": "女",
	    "1": "男",
	}

	static decoctTypes = {
		"200ml": "200ml/包，一天2次",
		"100ml": "100ml/包，一天3次",
		"other": "其他：自己填写", 
	}

	static getDecotTypeFromValue(value) {
		let decotedTypes = ConvertionUtil.decoctTypes;
		for (let key in decotedTypes) {
			if (decotedTypes[key] === value) {
				return key;
			}
		}
		return "other";
	}

	static getPackName(type, name) {
		return type === "3" ? name : "";
	}

	static getDecoctComment(type, comment) {
		return type !== "other" ? ConvertionUtil.decoctTypes[type] : comment;
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
				unit: drug["u"],
				key: ConvertionUtil.getUUID(drug["i"]),
			}
		});
	}

	static drugsToJson(drugs) {
		return JSON.stringify(drugs.map(drug=>{
			return {
				k: drug.weight,
				i: drug.id,
				u: drug.unit,
				b: drug.comment,
				t: drug.title,
			}
		}));
	}

	static rawDragToStr(raw) {
		let str = raw.reduce((pre, drug, index)=>{
			let cur = `${drug["t"]} ${drug["k"]}${drug["u"]} ${drug["b"] || ""}<br/>`;
			
			return pre + cur;
		}, "");
		return str;
	}

	static getDrugsFromPrescription(raw) {
		return ConvertionUtil.jsonToDrugs(raw.content);
	}

	static getUUID(id) {
	  return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + "" + id;
	}

	static convertPatientInfoToPrescript(patient) {
		return {
			name: patient.receiver_name,
			phone: patient.phone,
			gender: patient.receiver_gender,
			age: patient.receiver_age,
			symptom: patient.describe,
			diagnosis: patient.result,
			decoctType: ConvertionUtil.getDecotTypeFromValue(patient.doc_advice),
		 	decoctComment: patient.doc_advice,
			amount: patient.amount,
			revistDuration: patient.time_re,
			type: patient.type_id,
			pack:patient.pack,
			drugs: ConvertionUtil.jsonToDrugs(patient.content),
			phoneValid: true,
			nameValid: true,
			amountValid: true,
			revistDurationValid: true,
			includeFee: (patient.money_total+"") !== patient.money_recipe,
			decocted: patient.is_decoction !== "0",
			images:[],
			showPreview: false,
		}
	}
}
