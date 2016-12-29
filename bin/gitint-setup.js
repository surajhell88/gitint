#!/usr/bin/env node
var auth = require('./auth');
if (auth.is_logged_in()) {
	console.log('You have already logged in as:', auth.username);
	process.exit();
}

var inquirer = require('inquirer'),
	crypt = require('../lib/crypt'),
	questions = [
		{
			type: 'input',
			name: 'username',
			message: 'What is your github username:'
		}, 
		{
			type: 'input',
			name: 'token',
			message: 'Give me your token:'
		}
	],
	store = require('../lib/store-file');

inquirer.prompt(questions).then(function (answers) {
	var enc_github_username = crypt.encrypt(answers.username),
		enc_github_token = crypt.encrypt(answers.token);
	store['git-username'] = enc_github_username;
	store['git-token'] = enc_github_token;
});