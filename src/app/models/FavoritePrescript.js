import Rx from 'rx';

export default class FavoritePrescript {
	constructor(model) {
	    this.model = model;
	    this.subjects = new Rx.BehaviorSubject(model);
	}

	updateTitle(val) {
		console.log("FavoritePrescript -> updateTitle", val);
		val = val.trim();
		let valid = this._validTitle(val);
		this.model.title = val;
		this.model.titleValid = valid;
		this.subjects.onNext(this.model);
	}

	_validTitle(val) {
		return val !== null && val !== undefined && val !== "";
	}
}
