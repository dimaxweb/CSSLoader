/*
 * RequireCSS
 * RequireJS CSS plugin
 *
 * Copyright (c) 2012 Dmitry Mogilko
 * Licensed under the MIT, GPL licenses.
 */


/*jslint forin: true */
/*global document: true, setTimeout: true, define: true */
//TODO :
//max attempts for checking link.owner
//check how plugin returns error to requirejs
//make timeout configurable
(function () {
    "use strict";
    var doc = document,
        head = doc.getElementsByTagName('head')[0];
    define(function () {
        var css;
        css = {
            version:'0.1.0',
            maxAttempts : 10,

            ////Internal plugin functions prefixed with underscore,DON'T CALL outside of plugin/////
            _getUniqueId:function () {
                return 'cssPreloader_' +  Math.round(Math.random() * 9999999999);
            },
            _createLink:function (url) {
                var link = doc.createElement('link');
                link.rel = "stylesheet";
                link.type = "text/css";
                link.id = this._getUniqueId();
                link.href = url;
                return link;
            },

            _isEventSupported:function (elemName, eventName) {
                var el = document.createElement(elemName);
                eventName = 'on' + eventName;
                var isSupported = (eventName in el);
                if (!isSupported) {
                    el.setAttribute(eventName, 'return;');
                    isSupported = typeof el[eventName] === 'function';
                }
                el = null;
                return isSupported;
            },

            _loadNative:function (url, onload) {
                var styleSheet = this._createLink(url);
                styleSheet.onload = function () {
                    onload();
                };
                head.appendChild(styleSheet);
            },

            _loadStylesheet:function (url, load) {
                //load stylesheet and use native onload to test identification
                if (this._isEventSupported('link', 'load')) {
                    this._loadNative(url, load);
                }

                else {
                    var checkLoaded = function (link, load,attemptNumber) {
                        if(attemptNumber < this.maxAttempts){
                            var stylesheets = document.styleSheets;
                            for (var i = 0; i < stylesheets.length; i++) {
                                var file = stylesheets[i];
                                var owner = file.ownerNode ? file.ownerNode : file.owningElement;
                                if (owner && owner.id === link.id) {
                                    load();
                                    return;
                                }
                            }

                            var that = this;
                            setTimeout(function () {
                                checkLoaded.call(that,link, load,attemptNumber++);
                            }, 100);
                        }

                    };

                    var link = this._createLink(url);
                    head.appendChild(link);
                    var that = this;
                    var attemptNumber = 0;
                    setTimeout(function () {
                        checkLoaded.call(that,link, load,attemptNumber);
                    }, 100);



                }
            },
            ////////////////////Internal functions region ////////////////////////////////////////////////

            load:function (name, req, load, config) {
                try {

                    //TODO : look on that may be remove (less,scss)
                    var url = req.toUrl( name.search(/\.(css|less|scss)$/i) === -1 ? name + '.css' : name );
                    this._loadStylesheet(url, load);

                }
                catch (e) {

                    load();
                }
            }
            ///private methods prefixed with underscore


        };

        return css;
    });
}());

