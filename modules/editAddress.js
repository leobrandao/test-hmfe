var request = require('request');

module.exports = function (editedAdrress, id, token) {
	return new Promise(function (resolve, reject) {
		var options = {
			method: 'PUT',
			url: 'http://api-hck.hotmart.com/hack-dragonfly/rest/v1/address/' + id,
			json: true,
		    body: editedAdrress,
		 	headers: {
		    	'Authorization': 'Bearer ' + token,
		    	'Accept': 'application/json'
		  }
		};

		request( options, function (error, response, body) {
			if (error) {
				reject('Unable to update data.');
			} else {
				resolve(body);
			}
		});
	});
}