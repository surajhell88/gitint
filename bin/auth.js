var crypt = require('../lib/crypt'),
	store = require('../lib/store-file');

var username = store ? store['git-username'] : false;
	token = store ? store['git-token'] : false;

module.exports = {
	is_logged_in: function () {
		return !!username;
	},
	username: username && crypt.decrypt(username),
	token: token && crypt.decrypt(token),
};