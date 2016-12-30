#!/usr/bin/env node
var auth = require('./auth');
if (!auth.is_logged_in()) {
	console.log('You need to first log in before you use this command.');
	process.exit();
}

// Authenticate
// Fetch Current Lesson
// Fork
// Clone
// Installing Dependencies
// Open readme in Editor

var waterfall = require('async/waterfall'),
	GitHubApi = require("github"),
	github = new GitHubApi(),
	NodeGit = require("nodegit"),
	cloneOptions = {}
    path = require("path"),
    fs = require('fs');

process.chdir('/home/suraj/Development');

waterfall([
    function(callback) {
    	console.log('Authenticating user...');
        github.authenticate({
		    type: "oauth",
		    token: auth.token
		});
		callback();
    },
    function(callback) {
    	console.log('Getting current lesson...');
        setTimeout(function() {
        	callback(null, {
        		owner: 'sangamangreg',
        		repo: 'calculator-1'
        	});
        }, 1500);
    },
    function(res, callback) {
    	console.log('Forking lesson...');
        github.repos.fork(res, function (err, res) {
        	console.log('Successfully Forked!');
        	// console.log(JSON.stringify(res, null, 4));
        	if (err) {
        		callback(err);
        		return false;
        	}
        	callback(null, res);
        });
    },
    function (res, callback) {
        var exec = require('child_process').exec;
        exec('rm -rf ' + path.join(process.cwd(), res.name), function (err, stdout, stderr) {
            if (err) throw err;
            callback(null, res);
        });
    },
    function(res, callback) {
    	console.log('Cloning forked lesson...');
    	var localPath = path.join(process.cwd(), res.name);
    	cloneOptions.fetchOpts = {
			callbacks: {
				certificateCheck: function() { return 1; },
				credentials: function() {
					return NodeGit.Cred.userpassPlaintextNew(auth.token, "x-oauth-basic");
				}
			}
		};
		var cloneRepository = NodeGit.Clone(res.clone_url, localPath, cloneOptions)
			.done(function(repo) {
				if (repo instanceof NodeGit.Repository) {
					console.info("We cloned the repo!");
				}
				else {
					console.error("Something broke :(");
				}
			});
    }
], function(err, results) {
	console.log(err, results);
	if (err) {
		console.log('Something went wrong, please try again later');
		process.exit();
	}
    // results is now equal to: {one: 1, two: 2}
    // open readme here
    console.log('success!');
});