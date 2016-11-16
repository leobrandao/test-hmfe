var request = require('request');

module.exports = function (id, token) {
	return new Promise(function (resolve, reject) {
		var options = {
			method: 'DELETE',
			url: 'http://api-hck.hotmart.com/hack-dragonfly/rest/v1/address/' + id,
		 	headers: {
		    	'Authorization': 'Bearer ' + token,
		    	'Accept': 'application/json'
		  }
		};

		request( options, function (error, response, body) {
			if (error) {
				reject('Unable to delete data.');
			} else {
				resolve(body);
			}
		});
	});
}