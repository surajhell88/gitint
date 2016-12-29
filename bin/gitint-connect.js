#!/usr/bin/env node
const GitHubApi = require("github");
const fs = require('fs');
const github = new GitHubApi();

github.authenticate({
    type: "oauth",
    // key: "b9da60faea3beaf3127a",
    // secret: "462c84b08e533872357d3470407492617497ec96"
    token: '9b7c114cd47be88df78e82376185234011065395'
}, function(err, res) {
	console.log(err);
    console.log(JSON.stringify(res));
});

// github.repos.fork({
// 	owner: "select2",
// 	repo: "select2"
// }, function(err, res) {
// 	if (err) {
// 		console.log('Not Done!');
// 		fs.writeFile('resp.json', JSON.stringify({'res': err}, null, 4));
// 		return false;
// 	}
//     fs.writeFile('resp.json', JSON.stringify(res, null, 4));
//     console.log('Done!');
// });