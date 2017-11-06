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
        './step_definitions/*[Ss]pec.js'
    ],
    onPrepare: function (){
        global.EC = protractor.ExpectedConditions;
        global.defTimeoutExplicit = 5 * 1000;
        browser.waitForAngularEnabled(false); //if your app is not angular
        browser.driver.manage().window().maximize(); //full screen mode
    },
    allScriptsTimeout: 200000,
    getPageTimeout: 100000
};