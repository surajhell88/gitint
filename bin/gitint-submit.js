#!/usr/bin/env node
var auth = require('./auth');
if (!auth.is_logged_in()) {
	console.log('You need to first log in before you use this command.');
	process.exit();
}

var waterfall = require('async/waterfall'),
	nodegit = require("nodegit"),
	pathToRepo = require('path').resolve(process.cwd()),
	checkStatus = require('../lib/check-status');

var repo, index, oid, remote;

waterfall([
    function(callback) {
    	checkStatus().then(function (list) {
    		if (list.length == 0) {
    			console.log('Nothing to commit');
    			process.exit();
    		}
    		callback();
    	});
    },
    function (callback) {
    	console.log('Pushing changes...');
    	nodegit.Repository.open(pathToRepo)
			.then(function(repoResult) {
			    repo = repoResult;
			    return repoResult.refreshIndex();
			})
			.then(function(indexResult) {
			    index  = indexResult;
			    return index.addAll();
			})
		    .then(function() {
			    return index.write();
			})
		    .then(function() {
			    return index.writeTree();
			})
			.then(function(oidResult) {
			    oid = oidResult;
			    return nodegit.Reference.nameToId(repo, "HEAD");
			})
			.then(function(head) {
			    return repo.getCommit(head);
			})
			.then(function(parent) {
			    var author = nodegit.Signature.now("gitint", "surajgjadhav1988+gitint@gmail.com"),
				    committer = nodegit.Signature.now("gitint", "surajgjadhav1988+gitint@gmail.com");
			    return repo.createCommit("HEAD", author, committer, "First Commit", oid, [parent]);
			})
			.then(function() {
			    return repo.getRemote("origin");
			})
			.then(function(remoteResult) {
				remote = remoteResult;
			  	return remote.push(
		            ["refs/heads/master:refs/heads/master"],
		            {
					    callbacks: {
					      	credentials: function(url, userName) {
					        	return nodegit.Cred.userpassPlaintextNew(auth.token, "x-oauth-basic");
					      	}
					    }
				  	}
	            );
			})
			.done(function() {
			    console.log('Changes Pushed!');
				callback();
			})
			.catch(function(reason) {
				console.log('Something went wrong, please try again later');
				console.log('Error Details: ', reason);
			    process.exit();
			})
    }
], function(err, results) {
	if (err) {
		console.log('Something went wrong, please try again later');
		console.log('Error Details: ', err);
		process.exit();
	}
    console.log('Success!');
});