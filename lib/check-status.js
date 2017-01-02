
var Git = require('nodegit'),
	pathToRepo = require('path').resolve(process.cwd());

module.exports = function () {
	return Git.Repository.open(pathToRepo)
		.then(getStatus);
};

function getStatus(repository) {
	return repository.getStatus().then(processStatuses);
};

function processStatuses(statuses) {
	var results = []
	statuses.forEach(function (file) {
    	results.push(file.path() + ' ' + statusToText(file));
	});
  	return results;
}

function statusToText(status) {
	var words = [];
	if (status.isNew()) words.push('NEW');
	if (status.isModified()) words.push('MODIFIED');
	if (status.isTypechange()) words.push('TYPECHANGE');
	if (status.isRenamed()) words.push('RENAMED');
	if (status.isIgnored()) words.push('IGNORED');
	return words.join(' ');
};