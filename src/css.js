//TODO : get maximum attempts from parent config
//TODO : check for css rules in try and catch or check only if on the same domain
//TODO : check config if object exists and not null

(function () {
    "use strict";
    var doc = document, head = doc.getElementsByTagName("head")[0];
    define(function () {
        var css;
        return css = {
            version:"0.1.0",
            maxAttempts:10,

//            _jsEscape: function (content) {
//                return content.replace(/(['\\])/g, '\\$1')
//                    .replace(/[\f]/g, "\\f")
//                    .replace(/[\b]/g, "\\b")
//                    .replace(/[\n]/g, "\\n")
//                    .replace(/[\t]/g, "\\t")
//                    .replace(/[\r]/g, "\\r")
//                    .replace(/[\u2028]/g, "\\u2028")
//                    .replace(/[\u2029]/g, "\\u2029");
//            },

            _getUniqueId:function () {
                return"cssPreloader_" + Math.round(Math.random() * 9999999999);
            },
            _createLink:function (url) {
                var link = doc.createElement("link");
                return link.rel = "stylesheet", link.type = "text/css", link.id = this._getUniqueId(), link.href = url, link
            },
            _isEventSupported:function (element, event) {
                var c = document.createElement(element);
                event = "on" + event;
                var isEventSupported = event in c;
                return isEventSupported || (c.setAttribute(event, "return;"), isEventSupported = typeof c[event] == "function"), c = null, isEventSupported
            },
            _loadNative:function (url, callback) {
                var link = this._createLink(url);
                link.onload = function () {
                    callback()
                };
                var that = this;
                link.onerror = function () {
                    that._onerror(callback);
                };

                head.appendChild(link);
            },

            _onerror:function (callback, exception) {
                if (Object.prototype.toString.call(callback.error) === '[object Function]') {
                    var err = {message:'Failed to load stylesheet', innerException:exception};
                    callback.error(err);


                }
            },

            _loadWhenNotSupported:function (url, callback) {

                var checkLoaded = function (stylesheetLink, callback, attemptsCount) {
                        try {
                            if (attemptsCount < this.maxAttempts) {
                                var stylesheets = document.styleSheets;
                                for (var i = 0; i < stylesheets.length; i++) {
                                    var g = stylesheets[i];
                                    var link = g.ownerNode ? g.ownerNode : g.owningElement;
                                    if (link && link.id === stylesheetLink.id) {
                                        //check if stylesheet has cssRules collection,because server can return some html in case of 404 ,making ownerNode to be created
                                        var cssRulesAllowed = true;
                                        var cssRules = null;
                                        //Check if access to rules is allowed,if generates Security exception - looks css from different domain and we can't reliably check rules
                                        try {

                                            //can be also null like in Google chrome or undefined like in IE8,7
                                            if (!g.cssRules) {
                                                if (g.rules) {
                                                    cssRules = g.rules;
                                                }
                                                else {
                                                    cssRulesAllowed = false;
                                                }
                                            }
                                            else{
                                                cssRules = g.cssRules;
                                            }

                                        }
                                        catch (e) {
                                            cssRulesAllowed = false;
                                        }

                                        if (cssRulesAllowed) {
                                            if (cssRules && cssRules.length && cssRules.length > 0) {
                                                callback();
                                                return;
                                            }
                                            else {
                                                this._onerror(callback);
                                                return;
                                            }


                                        }
                                        //Can't  check for 100% if css is loaded when no access to cssRules (stylesheet from different domain),
                                        //so make optimistic  assumption css is loaded  if has ownerNode with matching id
                                        else {
                                            callback();
                                        }


                                    }
                                }
                                var that = this;
                                setTimeout(function () {

                                    checkLoaded.call(that, stylesheetLink, callback, ++attemptsCount);
                                }, 100);
                            }
                            //not loaded with maximum  attempts
                            else {
                                this._onerror(callback);
                                return;

                            }
                        }
                        catch (e) {
                            this._onerror(callback, e);
                            return;
                        }

                    },


                    link = this._createLink(url);
                head.appendChild(link);
                var that = this, attemptsCount = 0;
                //TODO : calculate setTimeout according to wait interval
                setTimeout(function () {
                    checkLoaded.call(that, link, callback, attemptsCount);
                }, 100);


            },
            _loadStylesheet:function (url, callback) {
                if (this._isEventSupported("link", "load")) {
                    this._loadNative(url, callback);
                }
                else {
                    this._loadWhenNotSupported(url, callback);
                }
            },

            ///requireJS interface function  - called css! is called
            load:function (name, parentConf, load, config) {
                try {
                    var url = parentConf.toUrl(name.search(/\.(css|less|scss)$/i) === -1 ? name + ".css" : name);
                    this._loadStylesheet(url, load);
                }
                catch (e) {
                    load();
                }
            }


        }


    })
})();