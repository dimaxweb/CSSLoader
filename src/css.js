(function () {
    "use strict";
    var doc = document, head = doc.getElementsByTagName("head")[0];
    define(function () {
        var css;
        return css = {
            version:"0.1.0",
            maxAttempts:10,
           _getUniqueId:function () {
                return"cssPreloader_" + Math.round(Math.random() * 9999999999)
        },
       _createLink:function (b) {
            var link = doc.createElement("link");
            return link.rel = "stylesheet", link.type = "text/css", link.id = this._getUniqueId(), link.href = b, link
        },
       _isEventSupported:function (element,event) {
            var c  = document.createElement(element);
            event = "on" + event;
            var isEventSupported = event in c;
            return isEventSupported || (c.setAttribute(event, "return;"), isEventSupported = typeof c[event] == "function"), c = null, isEventSupported
        },
       _loadNative:function (link, callback) {
            var d = this._createLink(link);
            d.onload = function () {
                callback()
            }, head.appendChild(d)
        },
        _loadStylesheet:function (a, c) {
            if (this._isEventSupported("link", "load"))this._loadNative(a, c); else {
                var checkLoaded = function (a, b, attemptsCount) {
                    if (attemptsCount < this.maxAttempts) {
                        var e = document.styleSheets;
                        for (var f = 0; f < e.length; f++) {
                            var g = e[f], h = g.ownerNode ? g.ownerNode : g.owningElement;
                            if (h && h.id === a.id) {
                                b();
                                return
                            }
                        }
                        var that = this;
                        setTimeout(function () {
                            checkLoaded.call(that, a, b, attemptsCount++)
                        }, 100)
                    }
                }, e = this._createLink(a);
                head.appendChild(e);
                var f = this, g = 0;
                setTimeout(function () {
                    checkLoaded.call(f, e, c, g)
                }, 100)
            }
    }, load:function (name, parentConf, load, config) {
            try {
                var e = parentConf.toUrl(name.search(/\.(css|less|scss)$/i) === -1 ? name + ".css" : name);
                this._loadStylesheet(e, load)
            } catch (e) {
                load()
            }
        }}, css
    })
})();