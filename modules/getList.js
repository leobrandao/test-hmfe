var request = require('request');

module.exports = function (token) {
	return new Promise(function (resolve, reject) {
		var options = {
			url: 'http://api-hck.hotmart.com/hack-dragonfly/rest/v1/address',
			json: true,
		 	headers: {
		    	'Authorization': 'Bearer ' + token,
		    	'Accept': 'application/json'
		  }
		};

		request( options, function (error, response, body) {
			if (error) {
				reject('Unable to fetch data.');
			} else {
				resolve(body);
			}
		});
	});
}