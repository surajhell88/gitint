#!/usr/bin/env node
const program = require('commander');

program
	.version('0.0.1')
	.command('hello', 'welcome message')
	.command('setup', 'connect github')
	.command('reset', 'reset cli')
	.command('open', 'open lesson')
	.command('submit', 'submit lesson')
	.parse(process.argv);