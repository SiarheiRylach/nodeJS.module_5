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
        const myReporter = {

            _suits: [],

            _current: {},

            jasmineStarted: function(suiteInfo) {

                // console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
            },

            suiteStarted: function(result) {
                // console.log('Suite started: ' + result.description + ' whose full description is: ' + result.fullName);
                if(this._current.name){
                    if(!this._current.result){
                       let parent = this._current;
                       this._current = {
                           name:result.description,
                           parent: parent,
                           specs:[],
                           childs: []
                       };
                       parent.childs.push(this._current);
                    }else{
                        let parent = this._current.parent;
                        this._current = {
                            name: result.description,
                            parent: parent,
                            specs: [],
                            childs: []
                        };
                        parent.childs.push(this._current);
                    }
                }else{
                  this._current = {
                      name:result.description,
                      parent: null,
                      specs:[],
                      childs:[]
                  };
                  this._suits = this._current;
                }

            },

            specStarted: function(result) {

            },

            specDone: function(result) {
                let isPassed  = result.status === 'passed';
                let stack = result.failedExpectations.reduce(function(res, current) {
                    return res + current.stack;
                }, "");
                let messages = result.failedExpectations.reduce(function(res, current) {
                    return res + current.message;
                }, "");

                this._current.specs.push({
                    name: result.description,
                    result: isPassed,
                    stack: stack,
                    messages: messages
                });

                //console.log('Spec: ' + result.description + ' was ' + result.status);
                /*for(var i = 0; i < result.failedExpectations.length; i++) {
                    console.log('Failure: ' + result.f+
                    ailedExpectations[i].message);
                    console.log(result.failedExpectations[i].stack);
                }
                console.log(result.passedExpectations.length);*/
            },

            suiteDone: function(result) {
                this._current.result = result.failedExpectations.length < 1;
                /* console.log('Suite: ' + result.description + ' was ' + result.status);
                 for(var i = 0; i < result.failedExpectations.length; i++) {
                     console.log('AfterAll ' + result.failedExpectations[i].message);
                     console.log(result.failedExpectations[i].stack);
                 }*/
            },

            jasmineDone: function() {
                console.log(this._suits);
            }
        };
        global.utils = require('utils_for_tests');
        global.EC = protractor.ExpectedConditions;
        global.elementHelper = require("helpers_protractor").elementHelper;
        global.defTimeoutExplicit = 5 * 1000;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

        jasmine.getEnv().addReporter(myReporter);



        browser.waitForAngularEnabled(false); //if your app is not angular
    },
    allScriptsTimeout: 200000,
    getPageTimeout: 100000
};