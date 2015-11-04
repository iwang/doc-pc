import Rx from 'rx';
import update from 'react/lib/update'

let state = {
	name: "",
	phone: "",
	sex: 1,
	age: "",
	symptom: "",
	diagnosis: "",
	drugs: [],
	phoneValid: false,
	nameValid: false,
	ageValid: false,
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

function updateSex(val) {
	console.log("model -> updateSex", val);
	state.sex = val;
	subjects.onNext(state);
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

function validateDrugWeight(drug, weight) {
	console.log("model -> validateDrugWeight");
	weight = weight.trim();
	let valid = /^(\d)+$/.test(weight);
	if (!valid) {
		drug.weight = drug.validWeight;
		subjects.onNext(state);
	}

}


function addDrug(drug) {
	console.log("model -> addDrug");
	drug.weight = 1;
	state.drugs.push(drug);
	subjects.onNext(state);
}

function deleteDrug(drug) {
	console.log("model -> deleteDrug");
	let drugs = state.drugs.filter(ndrug => ndrug !== drug);
	state.drugs = drugs;
	console.log(drugs);
	subjects.onNext(state);
}

function init() {
	subjects.onNext(state);
}

export default {
	subjects, updateName, updatePhone, init, 
	addDrug, updateDrugWeight, deleteDrug, validateDrugWeight, updateSex, updateAge, updateSymptom, updateDiagnosis,
}