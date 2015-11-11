import $ from 'jquery';

export default class HttpService {
	static _ajax(apiUrl, type, data, success, fail) {
		const prefix = "http://localhost/gancao/appapi/index.php/";
		let absUrl = prefix + apiUrl;
		let token = localStorage.getItem("token");
		let did = localStorage.getItem("did");
		if (did && data["did"] === undefined) {
			data["did"] = did;
		}
		
		console.log("posting", apiUrl, data);

		$.ajax({
			url: absUrl,
	  		data: data,
	  		type: type,
	  		headers: {
	  			Token: token,
	  		},
		})
		.done(function(result){
			console.log("Httpservice => success", apiUrl, result.msg);
			if (success && result.status === 1) {
				success(result);
			} else if (fail) {
				fail(result);
			}
		})
		.fail(function(result){
			console.log("Httpservice => fail", apiUrl, data, result);
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