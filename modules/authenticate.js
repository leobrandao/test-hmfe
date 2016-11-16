var request = require('request');

module.exports = function (user, pass) {
	return new Promise(function (resolve, reject) {
		// user = encodeURIComponent(user);
		pass = encodeURIComponent(pass);
		var options = {
			method: 'POST',
			json: true,
			url: 'http://api-hck.hotmart.com/security/oauth/token?grant_type=password&username='+ user + '&password=' + pass,
		 	headers: {
				'Authorization': 'Basic  ZTZiZGVjY2ItNzM1OC00OTk3LWIzYzAtODk2NDBhZjEyZGRlOmQ5OWNmMTU0LTFjZGYtNDRiMi04MDJmLWU1YzhiYmU5NjY5OA==',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
		};

		request( options, function (error, response, body) {
			if (error) {
				reject('Unable to authenticate');
			} else {
				resolve(body);
			}
		});
	});
}
