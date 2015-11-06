export default class ConvertionUtil {
	static getSexName(value) {
		return value === 1 ? "男" : "女";  
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

	static getDrugsFromPrescription(raw) {
		return ConvertionUtil.jsonToDrugs(raw.content);
	}

	static getUUID(id) {
	  return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) + "" + id;
	}
}
