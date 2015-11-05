import $ from 'jquery';

export default class HttpService {
	static _ajax(apiUrl, type, data, success, fail) {
		const prefix = "http://localhost/gancao/appapi/index.php/";
		let absUrl = prefix + apiUrl;
		let token = localStorage.getItem("token");
		let did = localStorage.getItem("did");
		
		if (did && data["did"] === undefined) {
			data["did"] = did;
			console.log("did", did);
		}

		$.ajax({
			url: absUrl,
	  		data: data,
	  		type: type,
	  		headers: {
	  			Token: token,
	  		},
		})
		.done(function(result){
			console.log("success", apiUrl, result.msg);
			if (success) success(result);
		})
		.fail(function(result){
			console.log("error", apiUrl, data, result);
			if (fail) fail(result);
		})
		.always(function(result){
			console.log(type, apiUrl, token, result);
		});
	}

	static $post(apiUrl, data, success, fail) {
		
		HttpService._ajax(apiUrl, "POST", data, success, fail);
		
	}

	static $get(apiUrl, data, success, fail) {
		HttpService._ajax(apiUrl, "GET", data, success, fail);
	}
	
}