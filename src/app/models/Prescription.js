import Rx from 'rx';
import ConvertionUtil from '../services/ConvertionUtil';

export default class Prescription {
	getInitValue() {
		return {
			name: "",
			phone: "",
			gender: 1,
			age: "",
			symptom: "",
			diagnosis: "",
			amount: "",
			revistDuration: "",
			type: "1",
			pack:"膏体罐装",
		 	decoctType: "200ml",
		 	decoctComment: "",
			drugs: [],
			phoneValid: false,
			nameValid: false,
			amountValid: false,
			revistDurationValid: false,
			decocted: false,
			includeFee: false,
			images:[],
			showPreview: false,
		};


		// return {
		// 	name: "王志峰",
		// 	phone: "12344423333",
		// 	gender: 1,
		// 	age: "12",
		// 	symptom: "天汽模的第三方",
		// 	diagnosis: "阿大幅度减少",
		// 	decoctType: "200ml",
		//  	decoctComment: "",
		// 	amount: "11",
		// 	revistDuration: "5",
		// 	type: "1",
		// 	pack:"膏体罐装",
		// 	drugs: [],
		// 	phoneValid: true,
		// 	nameValid: true,
		// 	ageValid: true,
		// 	amountValid: true,
		// 	revistDurationValid: true,
		// 	decocted: false,
		// 	images:[],
		// 	showPreview: false,
		// 	phoneCheckResult: "",
		// 	checkingPhone: false,
		// 	lastCheckedPhone: null,
		// }
	}

	static _instance = null;

	static getInstance() {
		if (Prescription._instance === null) {
			Prescription._instance = new Prescription();
		}
		return Prescription._instance;
	}

	constructor() {
	    this.model = this.getInitValue();
	    this.subjects = new Rx.BehaviorSubject(this.model);
	}

	update(model) {
		this.model = model;
		this.subjects.onNext(this.model);
	}

	reset() {
		this.update(this.getInitValue());
	}

	updateName(val) {
		let valid = this._validName(val);
		console.log("model -> updateName", val, valid);
		this.model.name = val;
		this.model.nameValid = valid;
		this.subjects.onNext(this.model);
	}


	updatePhone(val) {
		val = val.trim();
		let validInput = this._validPhoneInput(val);
		console.log("model -> updatePhone", val, validInput);
		if (validInput) {
			this.model.phone = val;
			this.model.phoneValid = this._validPhone(val);
		}
		this.subjects.onNext(this.model);
	}

	updateAge(val) {
		val = val.trim();
		let valid = this._validAge(val);
		console.log("model -> updateAge", val, valid);
		if (valid) {
			this.model.age = val;
		}
		this.subjects.onNext(this.model);
	}

	updateAmount(val) {
		val = val.trim();
		let valid = this._validAmount(val);
		console.log("model -> updateAmount", val);
		if (valid) {
			this.model.amount = val;
			this.model.amountValid = val !== "";
		}
		this.subjects.onNext(this.model);
	}


	updateRevisitDuration(val) {
		val = val.trim();
		let valid = this._validRevistDuration(val);
		console.log("model -> updateRevisitDuration", val);
		if (valid) {
			this.model.revistDuration = val;
			this.model.revistDurationValid = val !== "";
		}
		this.subjects.onNext(this.model);
	}

	updateSymptom(val) {
		console.log("model -> updateSymptom", val);
		this.model.symptom = val;
		this.subjects.onNext(this.model);
	}

	updateDiagnosis(val) {
		console.log("model -> updateDiagnosis", val);
		this.model.diagnosis = val;
		this.subjects.onNext(this.model);
	}

	updateDecoctType(val) {
		console.log("model -> updateDecoctType", val);
		this.model.decoctType = val;
		this.subjects.onNext(this.model);
	}

	updateDecoctComment(val) {
		console.log("model -> updateDecoctComment", val);
		this.model.decoctComment = val;
		this.subjects.onNext(this.model);
	}

	updateGender(val) {
		console.log("model -> updateGender", val);
		this.model.gender = val;
		this.subjects.onNext(this.model);
	}

	updateDecocted(val) {
		console.log("model -> updateDecocted", val);
		this.model.decocted = val;
		this.subjects.onNext(this.model);
	}

	updateIncludeFee(val) {
		console.log("model -> updateIncludeFee", val);
		this.model.includeFee = val;
		this.subjects.onNext(this.model);
	}

	updateType(val) {
		console.log("model -> updateType", val);
		this.model.type = val;
		this.subjects.onNext(this.model);
	}

	updatePack(val) {
		console.log("model -> updatePack", val);
		this.model.pack = val;
		this.subjects.onNext(this.model);
	}

	_validAmount(val) {
		return /^(\d)+$/.test(val) || val === "";
	}

	_validRevistDuration(val) {
		return /^(\d)+$/.test(val) || val === ""
	}

	_validAge(val) {
		return  /^(\d){1,3}$/.test(val) || val === "";
	}

	_validPhone(val) {
		return /^1(\d){10}$/.test(val);
	}

	_validPhoneInput(val) {
		return /^(\d){1,11}$/.test(val) || val === "";
	}

	_validDrugWeigth(val) {
		return /^(\d)+(.)?(\d)*$/.test(val) || val === ""
	}

	_validName(val) {
		val = val.trim();
		return val !== null && val !== undefined && val !== "";
	}

	updateDrugWeight(drug, weight) {
		console.log("model -> drugWeightChanged");
		weight = weight.trim();
		let valid = this._validDrugWeigth(weight);
		if (valid) {
			drug.weight = weight;
			if (weight !== "") {
				drug.validWeight = weight;
			}
		} 

		this.subjects.onNext(this.model);
	}

	updateDrugComment(drug, comment) {
		console.log("model -> updateDrugWeight");
		drug.comment = comment;
		this.subjects.onNext(this.model);
	}

	validateDrugWeight(drug, weight) {
		console.log("model -> validateDrugWeight");
		weight = weight.trim();
		let valid = /^(\d)+$/.test(weight);
		if (!valid) {
			drug.weight = drug.validWeight;
			this.subjects.onNext(this.model);
		}

	}

	checkDuplicate(drug) {
		return this.model.drugs.some(d=>{
			return d.id === drug.id;
		});
	}

	addDrugs(drugs) {
		console.log("model -> addDrug", drugs);
		drugs.forEach(drug=>{
			if (this._isEmpty(drug.weight)) {
				drug.weight = 1;
			}
			if (drug.key === undefined) {
				drug.key = ConvertionUtil.getUUID(drug.id);
			}
			this.model.drugs.push(drug);
		})
		this.subjects.onNext(this.model);
	}

	deleteDrug(drug) {
		console.log("model -> deleteDrug");
		let drugs = this.model.drugs.filter(ndrug => ndrug !== drug);
		this.model.drugs = drugs;
		console.log(drugs);
		this.subjects.onNext(this.model);
	}

	_isEmpty(val) {
		return val === "" || val === null || val === undefined;
	}

}