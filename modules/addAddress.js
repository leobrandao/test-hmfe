var request = require('request');

module.exports = function (newAdrress, token) {
	return new Promise(function (resolve, reject) {
		var options = {
			method: 'POST',
			url: 'http://api-hck.hotmart.com/hack-dragonfly/rest/v1/address',
			json: true,
			body: newAdrress,
		 	headers: {
		    	'Authorization': 'Bearer ' + token,
		    	'Accept': 'application/json'
		  }
		};

		request( options, function (error, response, body) {
			if (error) {
				reject('Unable to save data.');
			} else {
				resolve(body);
			}
		});
	});
}