import Rx from 'rx';
import update from 'react/lib/update'
import ConvertionUtil from '../services/ConvertionUtil';

let state = {
	name: "",
	phone: "",
	sex: 1,
	age: "",
	symptom: "",
	diagnosis: "",
	amount: "",
	drugs: [],
	phoneValid: false,
	nameValid: false,
	ageValid: false,
	amountValid: false,
	decocted: false,
	images:[],
	showPreview: false,
}

let subjects = new Rx.BehaviorSubject(state);


function updateName(val) {
	let valid = _validName(val);
	console.log("model -> updateName", val, valid);
	state.name = val;
	state.nameValid = valid;
	subjects.onNext(state);
}


function updatePhone(val) {
	val = val.trim();
	let valid = _validPhone(val);
	console.log("model -> updatePhone", val, valid);
	state.phone = val;
	state.phoneValid = valid;
	subjects.onNext(state);
}

function updateAge(val) {
	val = val.trim();
	// no need to sync ageValid with valid because invalid input will be rejected except empty string
	let valid = _validAge(val);
	console.log("model -> updateAge", val, valid);
	if (valid) {
		state.age = val;
		state.ageValid = val !== "";
	}
	subjects.onNext(state);
}

function updateAmount(val) {
	val = val.trim();
	let valid = _validAmount(val);
	// no need to sync ageValid with valid because invalid input will be rejected except empty string
	if (valid) {
		state.amount = val;
		state.amountValid = val !== "";
	}
	subjects.onNext(state);
}

function updateSymptom(val) {
	console.log("model -> updateSymptom", val);
	state.symptom = val;
	subjects.onNext(state);
}

function updateDiagnosis(val) {
	console.log("model -> updateDiagnosis", val);
	state.diagnosis = val;
	subjects.onNext(state);
}

function updateComment(val) {
	console.log("model -> updateComment", val);
	state.comment = val;
	subjects.onNext(state);
}

function updateSex(val) {
	console.log("model -> updateSex", val);
	state.sex = val;
	subjects.onNext(state);
}

function updateDecocted(val) {
	console.log("model -> updateDecocted", val);
	state.decocted = val;
	subjects.onNext(state);
}

function _validAmount(val) {
	return /^(\d)+$/.test(val) || val === ""
}

function _validAge(val) {
	return  /^(\d){1,3}$/.test(val) || val === "";
}

function _validPhone(val) {
	return /^1(\d){10}$/.test(val);
}

function _validDrugWeigth(val) {
	return /^(\d)+$/.test(val) || val === ""
}

function _validName(val) {
	val = val.trim();
	return val !== null && val !== undefined && val !== "";
}

function updateDrugWeight(drug, weight) {
	console.log("model -> drugWeightChanged");
	weight = weight.trim();
	let valid = _validDrugWeigth(weight);
	if (valid) {
		drug.weight = weight;
		if (weight !== "") {
			drug.validWeight = weight;
		}
	} 

	subjects.onNext(state);
}

function updateDrugComment(drug, comment) {
	console.log("model -> updateDrugWeight");
	drug.comment = comment;
	subjects.onNext(state);
}

function validateDrugWeight(drug, weight) {
	console.log("model -> validateDrugWeight");
	weight = weight.trim();
	let valid = /^(\d)+$/.test(weight);
	if (!valid) {
		drug.weight = drug.validWeight;
		subjects.onNext(state);
	}

}

function addDrugs(drugs) {
	console.log("model -> addDrug", drugs);
	drugs.forEach(drug=>{
		if (drug.weight === "") {
			drug.weight = 1;
		}
		if (drug.key === undefined) {
			drug.key = ConvertionUtil.getUUID(drug.id);
		}
		state.drugs.push(drug);
	})
	subjects.onNext(state);
}

function deleteDrug(drug) {
	console.log("model -> deleteDrug");
	let drugs = state.drugs.filter(ndrug => ndrug !== drug);
	state.drugs = drugs;
	console.log(drugs);
	subjects.onNext(state);
}

function getState() {
	return state;
}

export default {
	subjects, updateName, updatePhone, getState, updateAmount, updateDecocted, updateComment, updateDrugComment,
	addDrugs, updateDrugWeight, deleteDrug, validateDrugWeight, updateSex, updateAge, updateSymptom, updateDiagnosis,
}