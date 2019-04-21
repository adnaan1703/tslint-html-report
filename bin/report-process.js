#!/usr/bin/env node

var fs = require('fs');
var validateConfig = require('../validate-config');
var generateReport = require('../generate-report');


var cwd = process.cwd();
var fallback = cwd + '/tslint-report-config.json'
var configPath = undefined;

if(process.argv.length > 2) {
    configPath = cwd + process.argv.length[2];
}

var finalPath = undefined;
if(configPath && fs.existsSync(configPath)) {
    finalPath = configPath;
} else if(fs.existsSync(fallback)) {
    finalPath = fallback;
}

if(!finalPath) {
    throw Error('No config available to generate report.');
}

var config = validateConfig(JSON.parse(fs.readFileSync(finalPath)));
generateReport(config, () => {
    console.log('Report generated');
});