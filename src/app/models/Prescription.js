import Rx from 'rx';
import update from 'react/lib/update'

let state = {
	name: "ivan",
	phone: "122222",
	drugs: [],
}

let subjects = new Rx.Subject(state);


function updateName(val) {
	state.name = val;
	subjects.onNext(state);
}

function updateDrugWeight(drug, weight) {
	console.log("model -> drugWeightChanged");
	weight = weight.trim();
	let valid = /^(\d)+$/.test(weight) || weight === "";
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
	subjects, updateName, init, 
	addDrug, updateDrugWeight, deleteDrug, validateDrugWeight,
}