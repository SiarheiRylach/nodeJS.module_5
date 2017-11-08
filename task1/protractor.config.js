"use strict";

exports.config = {
    directConnect: true,
    // Base URL for application server
    baseUrl: 'https://protonmail.com/',
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--start-fullscreen', '--disable-infobars']
        },
        platform: "Windows 10",
        maxDuration: 10800
    },
    specs: [
        './specs/*[Ss]pec.js'
    ],
    onPrepare: function (){
        global.utils = require('utils_for_tests');
        global.EC = protractor.ExpectedConditions;
        global.defTimeoutExplicit = 5 * 1000;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

        browser.waitForAngularEnabled(false); //if your app is not angular
    },
    allScriptsTimeout: 200000,
    getPageTimeout: 100000
};