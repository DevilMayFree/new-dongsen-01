var PopIn5Conf = PopIn5Conf || {
    status: 0
}
  , mdAdPosition = 0;
0 === PopIn5Conf.status && (PopIn5Conf.status = 1,
PopIn5Conf.load = function(e, t) {
    "undefined" != typeof _popIn5_config && void 0 !== _popIn5_config[e] && t(_popIn5_config[e])
}
),
void 0 === window.PopIn5 && (window.PopIn5 = {},
void 0 !== window.performance && "function" == typeof window.performance.getEntries && (PopIn5.__PERFORMANCE_DISCOVERY_INIT__ = window.performance.now()),
PopIn5.ajaxCache = [],
PopIn5.load = function(e) {
    var t = {
        func: e,
        self: this,
        loaded: !1
    }
      , n = function() {
        t.loaded || (t.loaded = !0,
        t.func())
    };
    if (!PopIn5.$F.isIE6 && !PopIn5.$F.isIE7)
        if (PopIn5.$F.isIE8 || PopIn5.$F.isIE9) {
            var o = "readyState"in document ? document.readyState : null;
            o && ("complete" === o || "loaded" === o ? n() : void 0 !== document.attachEvent ? document.attachEvent("onreadystatechange", function() {
                "complete" === document.readyState && n()
            }) : void 0 !== document.addEventListener && document.addEventListener(document, "readystatechange", function() {
                "complete" === document.readyState && n()
            }))
        } else
            setTimeout(n, 1)
}
,
PopIn5.Loader = {
    loaded: !1,
    toLoad: [],
    start: function() {
        this.timeStart = (new Date).getTime();
        var e = function(e) {
            PopIn5.Loader.exec()
        };
        void 0 !== document.addEventListener && document.addEventListener("DOMContentLoaded", e, !1);
        var t = "readyState"in document ? document.readyState : null;
        "complete" !== t && "interactive" !== t && "loaded" !== t || setTimeout(e, 1)
    },
    exec: function() {
        if (!this.loaded) {
            this.timeLoad = (new Date).getTime(),
            this.loadScroll = document.body.scrollTop || document.documentElement.scrollTop,
            this.loaded = !0;
            for (var e = 0, t = this.toLoad.length; e < t; e++)
                this.toLoad[e]();
            this.toLoad = []
        }
    },
    load: function(e) {
        if (this.loaded)
            return e();
        this.toLoad.push(e)
    }
},
PopIn5.Loader.start(),
PopIn5.Class = function(e, t, n) {
    if (void 0 === PopIn5[e] && (PopIn5[e] = {}),
    void 0 === PopIn5[e][t]) {
        var o = PopIn5[e];
        o[t] = function() {
            this.init && this.init.apply(this, arguments)
        }
        ,
        o[t].prototype = n,
        o[t].prototype._package = e,
        o[t].prototype._className = t
    }
}
,
PopIn5.ClassLoad = function(e, t, n) {
    if (void 0 === PopIn5[e] || void 0 === PopIn5[e][t]) {
        PopIn5.Class(e, t, n);
        var o = function() {
            new PopIn5[e][t]
        };
        setTimeout(function() {
            PopIn5.load(o)
        }, 1)
    }
}
,
PopIn5.StaticClass = function(e, t, n) {
    (void 0 === PopIn5[e] || "" !== t && void 0 === PopIn5[e][t]) && (void 0 === PopIn5[e] && (PopIn5[e] = {}),
    "" !== t ? PopIn5[e][t] = n : PopIn5[e] = n,
    n.init && n.init())
}
,
PopIn5.ErrorSafeStaticClass = function(e, t, n) {
    for (var o in n)
        !function(e) {
            var t = n[e];
            "function" == typeof t && (n[e] = function() {
                try {
                    return t.apply(this, arguments)
                } catch (e) {}
            }
            )
        }(o);
    PopIn5.StaticClass(e, t, n)
}
,
PopIn5.Module = function(e, t) {
    void 0 !== PopIn5[e] && void 0 !== PopIn5[e].Main || (PopIn5.Class(e, "Main", t),
    setTimeout(function() {
        PopIn5Conf.load(e, function(t) {
            var n = function() {
                for (; "function" == typeof t; )
                    t = t();
                if (PopIn5.$F.notEmpty(t)) {
                    var n = new PopIn5[e].Main;
                    n._config = new PopIn5[e].Config(t),
                    n.initModule(),
                    PopIn5[e]._instance = n
                }
            };
            PopIn5.$F.notEmpty(t.load) && "fast" == t.load ? n() : PopIn5.load(n)
        })
    }, 1))
}
),
PopIn5.StaticClass("$", "Config", {
    init: function() {
        this.setDefaults()
    },
    afterInit: function() {
        var e = this;
        PopIn5Conf.load("*", function(t) {
            "function" == typeof t && (t = t()),
            e.overrideAll(e, t),
            e.afterConfig()
        }),
        PopIn5.Loader.load(function() {
            var e = PopIn5.$.Config;
            if (PopIn5.$F.notEmpty(e.articleSelector)) {
                var t = PopIn5.$F.selector(e.articleSelector);
                e.isArticle = PopIn5.$F.notEmpty(t)
            }
            PopIn5.$F.notEmpty(e.articleFilter.url) && (e.isArticle = PopIn5.$F.testOne(e.articleFilter.url, e.target));
            for (var n in e.eventHandlers)
                PopIn5.$.Global.event.addEventListener(n, e.eventHandlers[n]);
            e.onLoad()
        }, 0)
    },
    overrideAll: function(e, t) {
        for (var n in t)
            t.hasOwnProperty(n) && ("object" != typeof e[n] || "object" != typeof t[n] || PopIn5.$F.isArray(e[n]) ? e[n] = t[n] : this.overrideAll(e[n], t[n]))
    },
    setDefaults: function() {
        this.pid = "0",
        this.partnerDomain = location.host,
        this.includeFilter = {},
        this.urlReplace = [],
        this.displayUrlReplace = [],
        this.target = location.href,
        this.country = !1,
        this.contextFactory = !1,
        this.contextSelector = "body",
        this.isArticle = !0,
        this.articleSelector = "",
        this.articleFilter = {},
        this.readArticle = !1,
        this.eventHandlers = {},
        this.onLoad = function() {}
    },
    afterConfig: function() {
        this.target = PopIn5.$F.replaceAll(this.target, this.urlReplace)
    }
}),
PopIn5.StaticClass("$", "Context", {
    init: function() {
        var e = this;
        this.contexts = [],
        setTimeout(function() {
            PopIn5.$F.notEmpty(PopIn5.$.Config.contextFactory) ? setInterval(function() {
                var e = PopIn5.$.Config.contextFactory();
                PopIn5.$F.notEmpty(e) && PopIn5.$.Global.event.fireEvent("newContext", [e])
            }, 500) : "body" == PopIn5.$.Config.contextSelector ? e.createContext(document.body) : setInterval(function() {
                for (var t = document.querySelectorAll(PopIn5.$.Config.contextSelector), n = 0; n < t.length; n++) {
                    var o = t[n]
                      , i = e.getContext(o);
                    !1 === i && (i = e.createContext(o),
                    PopIn5.$.Global.event.fireEvent("newContext", [i]))
                }
            }, 500)
        }, 1)
    },
    findContext: function(e) {
        var t = this.getContext(e);
        return !1 === t ? this.findContext(e.parentNode) : t
    },
    getContext: function(e) {
        for (var t = 0; t < this.contexts.length; t++) {
            var n = this.contexts[t];
            if (n.key === e)
                return n
        }
        return !1
    },
    createContext: function(e) {
        var t = {
            idx: this.contexts.length,
            configs: {},
            key: e,
            segmentData: {},
            target: PopIn5.$.Config.target
        };
        return this.contexts.push(t),
        t
    }
}),
PopIn5.StaticClass("Cookie", "", {
    init: function() {},
    setCookie: function(e, t, n) {
        var o = "";
        if ((n = n || {}).expires && ("number" == typeof n.expires || n.expires.toUTCString)) {
            var i;
            "number" == typeof n.expires ? (i = new Date).setTime(i.getTime() + 24 * n.expires * 60 * 60 * 1e3) : i = n.expires,
            o = "; expires=" + i.toUTCString()
        }
        var a = n.path ? "; path=" + n.path : "; path=/"
          , r = n.domain ? "; domain=" + n.domain : ""
          , s = n.secure ? "; secure" : "";
        t = n.noencode ? t : encodeURIComponent(t),
        document.cookie = [e, "=", t, o, a, r, s].join("")
    },
    getCookie: function(e) {
        if (!navigator.cookieEnabled || "" === document.cookie)
            return null;
        e = e.replace(/\W/g, "\\$&");
        var t = new RegExp("(?:^|;)\\s?" + e + "=([^;]*)","i")
          , n = document.cookie.match(t);
        return n && decodeURIComponent(n[1])
    },
    removeCookie: function(e) {
        this.setCookie(e, "", {
            expires: -1
        })
    }
}),
PopIn5.StaticClass("$F", "", {
    init: function() {
        this.inViewData = [],
        this.nua = navigator.userAgent,
        this.detectBrowser(this.nua.toLowerCase()),
        this.tracking_id = this.getTrackingId(),
        this.cssExclude = /z-?index|font-?weight|opacity|zoom|line-?height/,
        this.boxModel = !1,
        this.validDocType = !this.isIE || document.getElementById && "CSS1Compat" == document.compatMode;
        for (var e in PopIn5.$) {
            var t = PopIn5.$[e];
            "function" == typeof t.afterInit && t.afterInit()
        }
    },
    detectBrowser: function(e) {
        this.browser = "firefox",
        this.browserType = "unknown";
        for (var t = [["Firefox", "firefox"], ["Firefox3", "firefox", "3.0."], ["IE", "msie"], ["IE6", "msie 6"], ["IE7", "msie 7"], ["IE8", "msie 8"], ["IE9", "msie 9"], ["IE10", "msie 10"], ["iPhone", "iphone"], ["iPad", "ipad"], ["iPod", "ipod"], ["Safari", "safari"], ["Chrome", "chrome"], ["Android", "android"], ["Windows", "windows"], ["Mac", "mac"], ["OperaMobile", "opera mini", "opera mobi"], ["UCBrowser", "ucbrowser"]], n = 0, o = t.length; n < o; n++) {
            for (var i = t[n], a = !1, r = 1, s = i.length; r < s; r++)
                -1 !== e.indexOf(i[r]) && (a = !0);
            this["is" + i[0]] = a,
            !0 === a && (this.browserType = i[0])
        }
    },
    isMobileDevice: function() {
        return this.isiPhone || this.isiPod || this.isAndroid && -1 !== this.nua.toLowerCase().indexOf("mobile") || this.isUCBrowser || this.isOperaMobile
    },
    isTabletDevice: function() {
        return this.isAndroid && -1 === this.nua.toLowerCase().indexOf("mobile") || this.isiPad
    },
    getPlatform: function() {
        var e = "other";
        return this.isiPhone || this.isiPod || this.isiPad ? e = "ios" : this.isAndroid ? e = "android" : this.isWindows ? e = "win" : this.isMac && (e = "mac"),
        e
    },
    getPageScrollTop: function() {
        return document.body ? document.body.scrollTop || document.documentElement.scrollTop : 0
    },
    getWindowWidth: function() {
        var e = window
          , t = e.document;
        return e.innerWidth || t.documentElement.clientWidth || t.body.clientWidth || t.scrollWidth
    },
    getWindowHeight: function() {
        var e = window
          , t = e.document;
        return e.innerHeight || t.documentElement.clientHeight || t.body.clientHeight || t.body.scrollHeight
    },
    isEmpty: function(e) {
        return !this.notEmpty(e)
    },
    notEmpty: function(e) {
        return void 0 !== e && "" != e && 0 != e && 0 != e && null != e
    },
    firstNotEmpty: function() {
        for (var e = 0, t = arguments.length; e < t; e++)
            if (this.notEmpty(arguments[e] || e === arguments.length - 1))
                return arguments[e]
    },
    testOne: function(e, t) {
        for (var n = e.length; n-- > 0; )
            if (new RegExp(e[n]).test(t))
                return !0;
        return !1
    },
    replaceAll: function(e, t) {
        for (var n = e, o = 0, i = t.length; o < i; o++) {
            var a = t[o];
            for (var r in a)
                n = n.replace(new RegExp(r), a[r])
        }
        return n
    },
    parseUrl: function(e) {
        var t = {};
        return e.indexOf("?") > 0 && (qString = e.substring(e.indexOf("?")),
        e = e.substring(0, e.indexOf("?")),
        qString.replace(new RegExp("([^?=&]+)(=([^&]*))?","g"), function(e, n, o, i) {
            t[n] = i
        })),
        {
            url: e,
            qString: t
        }
    },
    getTrackingId: function() {
        return this.parseUrl(location.href).qString.uy3ubftvh0u6o8
    },
    parseUri: function(e) {
        var t = /^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/
          , n = e.match(t);
        return n ? {
            scheme: n[1],
            host: n[2],
            path: n[3],
            query: n[4],
            fragment: n[5]
        } : null
    },
    digest: function(e) {
        for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!$".split(""), n = 0, o = "", i = 0, a = e.length; i < a; i++)
            n = (n << 5) - n + e.charCodeAt(i),
            n |= 0;
        for (var r = 0; r < 6; r++)
            o += t[63 & n],
            n >>>= 6;
        return o
    },
    getInnerText: function(e) {
        var t = e.innerText || e.textContent || e.data;
        return PopIn5.$F.notEmpty(t) ? t : ""
    },
    ajax_counter: 0,
    ajax: function() {
        var e;
        if (2 === arguments.length)
            e = {
                url: arguments[0],
                success: arguments[1]
            };
        else {
            if (1 !== arguments.length || "object" != typeof arguments[0])
                throw "Invalid Arguments";
            e = arguments[0]
        }
        var t = function() {}
          , n = "pop" + (new Date).getTime().toString(16) + "_"
          , o = e.callbackname ? e.callbackname : n + this.ajax_counter++
          , i = document.getElementsByTagName("head")[0];
        window[o] = function(n) {
            window[o] = void 0;
            try {
                delete window[o]
            } catch (e) {}
            "callback"in e && window[e.callback](n),
            "success"in e && e.success(n);
            try {
                setTimeout(t, 10)
            } catch (e) {}
        }
        ;
        var a = document.createElement("script");
        a.charset = "utf-8";
        var r = e.url;
        if (r += (r.indexOf("?") >= 0 ? "&" : "?") + (e.callbackParameterName ? e.callbackParameterName : "callback") + "=" + encodeURIComponent(o),
        e.iframeLoad) {
            var s = [];
            return s.push('<body onload="'),
            s.push("var js = document.createElement('script');"),
            s.push("js.src = '" + r + "';"),
            s.push("var d = document;d.getElementsByTagName('head')[0].appendChild(js);\">"),
            s.push("<script type='text/javascript'>"),
            s.push("window['" + o + "'] = function(data) {"),
            s.push("parent['" + o + "'](data);"),
            s.push("};"),
            s.push("<\/script>"),
            s.push("</body>"),
            PopIn5.$F.iframeLoader(s.join(""), {
                width: 1,
                height: 1,
                css: {
                    display: "none"
                }
            }),
            void (t = function() {
                PopIn5.$F.remove(iframe)
            }
            )
        }
        a.src = r,
        e.charset && (a.charset = e.charset),
        i.appendChild(a),
        t = function() {
            PopIn5.$F.remove(a)
        }
    },
    isArray: function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    },
    join: function(e, t) {
        var n;
        if (PopIn5.$F.isEmpty(e) && (e = {}),
        PopIn5.$F.isEmpty(t) && (t = {}),
        "object" == typeof e && "object" == typeof t) {
            if ("number" == typeof e.length && "number" == typeof t.length) {
                n = [];
                for (var o = 0, i = e.length; o < i; o++)
                    n.push(e[o]);
                for (var a = 0, r = t.length; a < r; a++)
                    n.push(t[a]);
                return n
            }
            n = {};
            for (var s in e)
                n[s] = e[s];
            for (var d in t)
                n[d] = t[d];
            return n
        }
    },
    pass: function(e, t, n) {
        PopIn5.$F.isEmpty(n) && (n = []);
        var o = e;
        return function() {
            return o.apply(t, n)
        }
    },
    bind: function(e, t, n, o) {
        var i = function() {
            return !0
        };
        "mouseenter" != t || this.isIE || (t = "mouseover",
        i = function(t) {
            for (var n = t.relatedTarget || t.fromElement, o = !0; o && n; )
                n == e && (o = !1),
                n = n.parentNode;
            return o
        }
        ),
        "mouseleave" != t || this.isIE || (t = "mouseout",
        i = function(t) {
            for (var n = t.relatedTarget || t.toElement, o = !0; o && n; )
                n == e && (o = !1),
                n = n.parentNode;
            return o
        }
        );
        var a = function(t) {
            if (t = t || window.event,
            i.apply(this, [t])) {
                var a = n.apply(e, [t, o]);
                PopIn5.$F.isIE || !1 !== a ? PopIn5.$F.isIE && !1 === a && (t.returnValue = !1,
                t.cancelBubble = !0) : (t.preventDefault(),
                t.stopPropagation())
            }
        };
        return e.addEventListener ? e.addEventListener(t, a, !1) : e.attachEvent && e.attachEvent("on" + t, a),
        e
    },
    insertAdjacentElement: function(e, t, n) {
        switch (t = t.toLowerCase()) {
        case "beforebegin":
            e.parentNode.insertBefore(n, e);
            break;
        case "afterend":
            e.parentNode.insertBefore(n, e.nextSibling);
            break;
        case "afterbegin":
            e.insertBefore(n, e.firstChild);
            break;
        case "beforeend":
            e.appendChild(n)
        }
    },
    selector: function() {
        if (1 === arguments.length)
            return document.querySelector(arguments[0]);
        if (2 === arguments.length)
            try {
                return arguments[0].querySelectorAll(arguments[1])
            } catch (e) {
                return []
            }
    },
    oneSelector: function(e, t) {
        return e.querySelectorAll(t)[0]
    },
    makeListener: function(e) {
        e._listeners = {},
        e.addEventListener = function(e, t) {
            this._listeners[e] || (this._listeners[e] = []),
            this._listeners[e].push(t)
        }
        ,
        e.fireEvent = function(e, t) {
            if (this._listeners[e])
                for (var n = 0, o = this._listeners[e].length; n < o; n++)
                    this._listeners[e][n].apply(this, t)
        }
    },
    hasClass: function(e, t) {
        return new RegExp("(\\s|^)" + t + "(\\s|$)").test(e.className)
    },
    addClass: function(e, t) {
        this.hasClass(e, t) || (e.className += (e.className ? " " : "") + t)
    },
    removeClass: function(e, t) {
        this.hasClass(e, t) && (e.className = e.className.replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ").replace(/^\s+|\s+$/g, ""))
    },
    aspectBefore: function(e, t, n) {
        var o = e[t];
        e[t] = function() {
            return n.apply(this, arguments),
            o.apply(this, arguments)
        }
    },
    aspectAfter: function(e, t, n) {
        var o = e[t];
        e[t] = function() {
            var e = o.apply(this, arguments);
            return n.apply(this, arguments),
            e
        }
    },
    appendCSS: function(e) {
        var t = document.createElement("style");
        t.type = "text/css",
        t.rel = "stylesheet",
        t.charSet = "UTF-8",
        document.getElementsByTagName("head")[0].appendChild(t),
        t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e))
    },
    iframeLoader: function(e, t) {
        var n = PopIn5.$F.notEmpty(t.parentNode) ? t.parentNode : document.body
          , o = PopIn5.$F.ce(n, "iframe");
        for (var i in t)
            "parentNode" !== i && ("css" === i ? PopIn5.$F.css(o, t[i]) : t.hasOwnProperty(i) && o.setAttribute(i, t[i]));
        if (PopIn5.$F.notEmpty(e)) {
            var a = o.contentWindow ? o.contentWindow : o.contentDocument ? o.contentDocument.document ? o.contentDocument.document : o.contentDocument : null;
            return a ? (a.document.open(),
            a.document.write(e),
            a.document.close(),
            a) : null
        }
        return null
    },
    cio: function(e, t) {
        e = e || "about:self";
        var n = void 0 !== (t = t || {}).pnode && void 0 !== t.pnode.nodeValue ? t.pnode : document.body
          , o = PopIn5.$F.ce(n, "iframe");
        o.src = e,
        o.setAttribute("scrolling", "no"),
        o.setAttribute("frameBorder", "0"),
        o.setAttribute("allowTransparency", "true"),
        function(e) {
            e.display = "block",
            e.width = "0px",
            e.height = "0px",
            e.margin = "0px",
            e.padding = "0px",
            e.overflow = "none"
        }(o.style);
        var i = {
            element: o,
            document: o.contentDocument || o.contentWindow.document,
            window: o.contentWindow ? o.contentWindow : o.contentDocument.document ? o.contentDocument.document : o.contentDocument,
            write: function(e) {
                i.document.open(),
                i.document.write(e),
                i.document.close()
            }
        };
        return i
    },
    getMessage: function(e, t) {
        var n = PopIn5.$F.iframeLoader("", {
            src: e,
            width: 1,
            height: 1,
            name: "popIniframe",
            css: {
                display: "none"
            }
        });
        PopIn5.$F.bind(window, "message", function(e) {
            n === e.source && t(e.data)
        })
    },
    inView: function(e) {
        var t = {
            element: !1,
            offset: 0,
            complete: function() {},
            showArea: 0
        };
        this.inViewData.push(PopIn5.$F.join(t, e));
        var n = this;
        1 == this.inViewData.length && (this.inViewInterval = setInterval(function() {
            n.inViewHandleScroll()
        }, 100))
    },
    inViewHandleScroll: function() {
        for (var e = PopIn5.$F.getPageScrollTop(), t = PopIn5.$F.getWindowHeight(), n = [], o = 0; o < this.inViewData.length; o++) {
            var i = this.inViewData[o]
              , a = i.element
              , r = PopIn5.$F.position(a).top
              , s = PopIn5.$F.size(a);
            if (void 0 === a.__popInRealHeight__ && 0 === s.height && "" === a.style.height) {
                var d = a.style.overflow;
                "" !== d && "visible" !== d || (a.style.overflow = "hidden",
                a.__popInRealHeight__ = a.offsetHeight,
                a.style.overflow = d)
            }
            var c = s.height > 0 ? s.height : a.__popInRealHeight__ || 0;
            if (s.width * c > 0 && e + t + i.offset > r + i.showArea * c)
                try {
                    i.complete()
                } catch (e) {}
            else
                n.push(i)
        }
        this.inViewData = n,
        0 === n.length && clearInterval(this.inViewInterval)
    },
    isSupportStorage: function() {
        try {
            return !!window.localStorage.getItem && !!window.sessionStorage.getItem
        } catch (e) {
            return !1
        }
    },
    lsGet: function(e) {
        try {
            return window.localStorage.getItem(e)
        } catch (e) {
            return !1
        }
    },
    lsRemove: function(e) {
        try {
            window.localStorage.removeItem(e)
        } catch (e) {
            return !1
        }
    },
    lsSet: function(e, t) {
        try {
            return window.localStorage.setItem(e, t)
        } catch (e) {
            return !1
        }
    },
    ssGet: function(e) {
        try {
            return window.sessionStorage.getItem(e)
        } catch (e) {
            return !1
        }
    },
    ssRemove: function(e) {
        try {
            window.sessionStorage.removeItem(e)
        } catch (e) {
            return !1
        }
    },
    ssSet: function(e, t) {
        try {
            window.sessionStorage.setItem(e, t)
        } catch (e) {
            return !1
        }
    },
    toCamelCase: function(e) {
        var t = e.split("-");
        if (1 == t.length)
            return t[0];
        for (var n = 0 === e.indexOf("-") ? t[0].charAt(0).toUpperCase() + t[0].substring(1) : t[0], o = 1, i = t.length; o < i; o++) {
            var a = t[o];
            n += a.charAt(0).toUpperCase() + a.substring(1)
        }
        return n
    },
    cssGet: function(e, t) {
        var n = PopIn5.$F.toCamelCase(t)
          , o = e.style[n];
        return o || (document.defaultView ? o = document.defaultView.getComputedStyle(e, "").getPropertyValue(t) : e.currentStyle ? o = e.currentStyle[n] : e.style.getPropertyValue && (o = e.style.getPropertyValue(t))),
        o || "opacity" != t ? o : 1
    },
    CSS_NEED_PREFIX: {
        transition: !0,
        "transition-timing-function": !0,
        "transition-duration": !0,
        "transition-property": !0,
        transform: !0,
        "transform-origin": !0,
        "backface-visibility": !0
    },
    cssSet: function(e, t, n) {
        if ("number" != typeof n || this.cssExclude.test(t) || (n += "px"),
        t in this.CSS_NEED_PREFIX && 0 !== t.indexOf("-") && -1 != (t = (this.isIE ? "-ms-" : this.isFirefox ? "-moz-" : window.opera ? "-o-" : "-webkit-") + t).indexOf("transition") && -1 != n.indexOf("transform") && (n = t.substring(0, t.indexOf("transition")) + n),
        this.isIE) {
            t.indexOf("-") > 0 && (t = t.replace(/\-(\w)/g, function(e, t) {
                return t.toUpperCase()
            }));
            try {
                e.style[t] = n
            } catch (e) {}
        } else
            e.style.setProperty(t, n, null)
    },
    css: function() {
        var e = arguments[0];
        if ("string" == typeof arguments[1] && 2 === arguments.length)
            return this.cssGet(e, arguments[1]);
        if ("string" == typeof arguments[1] && 3 === arguments.length)
            return this.cssSet(e, arguments[1], arguments[2]),
            e;
        if ("object" == typeof arguments[1]) {
            var t = arguments[1];
            for (var n in t)
                this.cssSet(e, n, t[n]);
            return e
        }
    },
    size: function(e) {
        return {
            width: e.offsetWidth,
            height: e.offsetHeight
        }
    },
    position: function(e) {
        if (e.getBoundingClientRect) {
            var t = e.getBoundingClientRect()
              , n = document.documentElement
              , o = document.body;
            return {
                left: Math.round(t.left + (o.scrollLeft || n.scrollLeft) - n.clientLeft),
                top: Math.round(t.top + (o.scrollTop || n.scrollTop) - n.clientTop)
            }
        }
        for (var i = 0, a = 0; void 0 !== e; e = e.offsetParent)
            a += e.offsetLeft,
            i += e.offsetTop;
        return {
            top: i,
            left: a
        }
    },
    ce: function(e, t, n) {
        var o = e.appendChild(document.createElement(t));
        return PopIn5.$F.notEmpty(n) && o.appendChild(document.createTextNode(n)),
        o
    },
    remove: function(e) {
        return e.parentNode && e.parentNode.removeChild(e),
        e
    },
    getParameterMap: function() {
        if (PopIn5.$F.notEmpty(this.parameterMap))
            return this.parameterMap;
        if (void 0 === window._pop)
            return {};
        for (var e = window._pop, t = {}, n = 0, o = e.length; n < o; n++) {
            var i = e[n]
              , a = i[0]
              , r = a.substring(0, 5)
              , s = a.substring(5);
            "_set_" == r && (t[s] = i[1]),
            "_add_" == r && (PopIn5.isArray(t[s]) ? t[s].push(i[1]) : PopIn5.$F.notEmpty(t[s]) ? t[s] = [t[s], i[1]] : t[s] = [i[1]])
        }
        return this.parameterMap = t,
        t
    },
    getParam: function(e, t) {
        return this.paramMap = this.getParameterMap(),
        void 0 !== this.paramMap[e] ? this.paramMap[e] : void 0 !== window["_popin_" + e] ? window["_popin_" + e] : void 0 !== window["_popIn_" + e] ? window["_popIn_" + e] : t
    },
    pageScrollTop: function() {
        return document.body.scrollTop || document.documentElement.scrollTop
    },
    getBetterSizeImg: function(e, t) {
        var n, o, i = e.offsetWidth, a = e.offsetHeight, r = [];
        i && a || (i = 1,
        a = 1),
        n = i / a;
        for (var s = 0, d = t.length; s < d; s++)
            o = t[s],
            r.push({
                aspect: Math.abs(n - o.aspect),
                image: o.image
            });
        return r.sort(function(e, t) {
            return e.aspect - t.aspect
        }),
        r[0].image
    }
}),
PopIn5.StaticClass("$", "Global", {
    init: function() {
        this.uid = "",
        this.device = PopIn5.$F.isMobileDevice() ? "mobile" : PopIn5.$F.isTabletDevice() ? "tablet" : "pc",
        this.deviceForAd = PopIn5.$F.isMobileDevice() ? "mobile" : "pc",
        this.protocol = "https:",
        this.referrer = "other";
        var e = [["news.google.co", "portal_google"], ["search.yahoo.co", "search_yahoo"], ["facebook.co", "sns_facebook"], ["twitter.co", "sns_twitter"], ["t.co$", "sns_twitter"], ["yahoo.co", "portal_yahoo"], ["goo.ne", "portal_goo"], ["infoseek.co", "portal_infoseek"], ["msn.com", "portal_msn"], ["excite.co.jp", "portal_excite"], ["livedoor.com", "portal_livedoor"], ["search.naver.com", "search_naver"], ["naver.com|naver.jp", "sns_naver"], ["hatena.ne.jp", "sns_hatena"], ["aol.jp", "portal_aol"], ["google.co", "search_google"], ["www.bing.com", "search_bing"], ["www.biglobe.ne.jp", "portal_biglobe"], ["www.smartnews.be|www.smartnews.com", "app_smartnews"], ["gunosy.com", "app_gunosy"], ["newspicks.com", "app_newspicks"], ["antenna.jp", "app_antenna"], ["paid.outbrain.com", "paid_outbrain"], ["trc.taboola.com", "paid_yahoo"], ["dsp.logly.co.jp", "paid_logly"], ["www.baidu.com", "search_baidu"], ["m.sm.cn", "search_m-sm"], ["www.so.com", "search_so"], ["www.sogou.com", "search_sogou"], ["news.baidu.com", "portal_news-baidu"], ["www.msn.cn", "portal_msn"], ["www.sina.com.cn", "portal_sina"], ["www.sohu.com", "portal_sohu"], ["www.qq.com", "portal_qq"], ["www.163.com", "portal_163"], ["hao.360.cn", "portal_hao-360"], ["www.china.com", "portal_china"], ["www.wechat.com", "sns_wechat"], ["tieba.baidu.com", "sns_tieba-baidu"], ["www.weibo.com", "sns_weibo"], ["www.xiaohongshu.com", "sns_xiaohongshu"]]
          , t = location.host;
        e.push([t, "site"]);
        for (var n = PopIn5.$F.parseUri(document.referrer), o = 0, i = e.length; o < i; o++) {
            var a = e[o];
            if (RegExp(a[0]).test(n.host)) {
                this.referrer = a[1];
                break
            }
        }
        "" === document.referrer && (this.referrer = "organic"),
        location.href.indexOf("utm_medium=logly") > -1 && (this.referrer = "paid_logly"),
        this.baseDomain = void 0 !== window._popIn_ad_block_enable ? "api.popin.cc" : "imageaws.popin.cc",
        this.event = {},
        PopIn5.$F.makeListener(this.event)
    }
}),
PopIn5.StaticClass("$", "Language", {
    init: function() {
        this.countries = {},
        this.countries.jp = {
            video_button_detail: "詳しくはこちら",
            video_button_calendar: "カレンダーに登録",
            video_button_share: "この動画をシェアする",
            video_counter_before: "再生回数 ",
            video_counter_after: "回",
            video_end_replay: "動画をリプレイ",
            video_end_detail: "詳しくはこちら",
            read_debug_container: "本文領域",
            read_debug_info_view: "本文表示率:",
            read_debug_info_read: "読了率:",
            read_debug_info_time: "読む時間:",
            read_debug_info_sec: "秒"
        },
        this.countries.tw = {
            video_button_detail: "深入了解",
            video_button_calendar: "カレンダーに登録",
            video_counter_before: "觀看次數 ",
            video_counter_after: "次",
            video_end_replay: "再看一次",
            video_end_detail: "瞭解詳情",
            read_debug_container: "正文",
            read_debug_info_view: "正文顯示率:",
            read_debug_info_read: "正文閱讀率:",
            read_debug_info_time: "正文閱讀時間:",
            read_debug_info_sec: "秒"
        },
        this.countries.kr = {
            video_button_detail: "詳しくはこちら",
            video_button_calendar: "カレンダーに登録",
            video_counter_before: "再生回数 ",
            video_counter_after: "回",
            video_end_replay: "動画をリプレイ",
            video_end_detail: "詳しくはこちら",
            read_debug_container: "本文領域",
            read_debug_info_view: "本文表示率:",
            read_debug_info_read: "読む時間:",
            read_debug_info_time: "読む時間:",
            read_debug_info_sec: "秒"
        }
    },
    getCurrent: function() {
        try {
            return this._curr || (this._curr = this.countries[PopIn5.$.Config.country || "jp"]),
            this._curr
        } catch (e) {
            return {}
        }
    },
    getMessage: function(e) {
        var t = this.getCurrent();
        return PopIn5.$F.notEmpty(t[e]) ? t[e] : e
    }
}),
PopIn5.StaticClass("$", "Log", {
    init: function() {
        this.history = [],
        this.category = "",
        this.commonCategory = "",
        this.enabled = !0,
        PopIn5.$.Log.logDocument = document,
        PopIn5.$F.isIE || PopIn5.Loader.load(function() {
            var e = [];
            e.push("<body>"),
            e.push("</body>");
            var t = PopIn5.$F.iframeLoader(e.join(""), {
                id: "_popIn_log",
                width: 1,
                height: 1,
                css: {
                    display: "none"
                }
            });
            PopIn5.$.Log.logDocument = t ? t.document : null
        })
    },
    uniqueLog: function(e, t, n) {
        for (var o = !1, i = PopIn5.$F.isArray(e) ? e : [e], a = 0, r = this.history.length; a < r; a++) {
            for (var s = !0, d = 0; d < i.length; d++)
                s = s && this.history[a].indexOf(i[d]) >= 0;
            o = o || s
        }
        o || this.log(t, n)
    },
    log: function(e, t) {
        if (this.enabled) {
            "undefined" != typeof _popIn5_config && void 0 !== _popIn5_config.apiUrl && _popIn5_config.apiUrl.indexOf("popin.baidu.com") > -1 && (e.indexOf("//rlog.popin.cc/s.gif?") > -1 || e.indexOf("//r.popin.cc/log.gif?") > -1) && (e = e.replace("//rlog.popin.cc/", "//popin.baidu.com/popin_log/rlog/")),
            t = this.parseOptions(t),
            this.history.push(e);
            this.logDocument;
            if ("image" == t.type) {
                e = this.setTzValue(e);
                var n = new Image;
                PopIn5.$F.notEmpty(t.onLoad) && (n.onload = t.onLoad),
                PopIn5.$F.notEmpty(t.onError) && (n.onerror = t.onError),
                n.src = e
            }
        }
    },
    setTzValue: function(e) {
        if (!PopIn5.$.Global.requestCountry || e.indexOf("s.gif") < 0)
            return e;
        for (var t = [/[&?]r1=\w+/, /[?&]type=(pc|mobile)_viewall/], n = !1, o = 0, i = t.length; o < i; o++)
            t[o].test(e) && (n = !0);
        return n || (e += "&tz=" + PopIn5.$.Global.requestCountry),
        e
    },
    parseOptions: function(e) {
        var t = {
            type: "image",
            onError: function(e) {}
        };
        return void 0 === e && (e = {}),
        PopIn5.$.Config.overrideAll(e, t),
        e
    },
    logBuilder: function(e) {
        return "undefined" != typeof _popIn5_config && void 0 !== _popIn5_config.apiUrl && _popIn5_config.apiUrl.indexOf("popin.baidu.com") > -1 && (e.indexOf("//rlog.popin.cc/s.gif?") > -1 || e.indexOf("//r.popin.cc/log.gif?") > -1) && (e = e.replace("//rlog.popin.cc/", "//popin.baidu.com/popin_log/rlog/")),
        {
            url: e,
            params: [],
            add: function(e, t) {
                return this.params.push([e, t]),
                this
            },
            build: function() {
                for (var e = {}, t = [], n = 0; n < this.params.length; n++) {
                    var o = this.params[n]
                      , i = o[0]
                      , a = o[1];
                    void 0 === e[i] && (e[i] = [],
                    t.push(i)),
                    e[i].push(a)
                }
                for (var r = this.url, s = 0, d = t.length; s < d; s++) {
                    var c = t[s];
                    r += (0 === s ? "?" : "&") + c + "=" + e[c].join("|")
                }
                return this.paramsMap = e,
                r
            }
        }
    }
}),
PopIn5.Class("$", "ProxyAjax", {
    init: function(e) {
        "string" == typeof e && (e = {
            url: e
        }),
        this.status = "init",
        this.success = !1,
        this.data = e,
        this.timeout = 1e3
    },
    loaded: function(e) {
        if (e) {
            if (PopIn5.$F.isEmpty(PopIn5.$.Global.uid) && PopIn5.$F.notEmpty(e) && PopIn5.$F.notEmpty(e.cdata)) {
                var t = JSON.parse(window.atob(e.cdata));
                PopIn5.$F.notEmpty(t) && PopIn5.$F.notEmpty(t.uid) && (PopIn5.$.Global.uid = t.uid)
            }
            this.result = e,
            this.status = "finish",
            this.func.call(this, e)
        }
    },
    setCallback: function(e) {
        this.func = e
    },
    load: function() {
        var e = this;
        this.status = "start";
        for (var t = 0, n = PopIn5.ajaxCache.length; t < n; t++) {
            var o = PopIn5.ajaxCache[t];
            if (o.data.url == this.data.url) {
                if ("finish" == o.status)
                    return void this.loaded(o.result);
                if ("start" == o.status)
                    return void PopIn5.$F.aspectAfter(o, "loaded", function(t) {
                        e.loaded(t)
                    })
            }
        }
        PopIn5.ajaxCache.push(this),
        setTimeout(function() {
            e.success || (e.success = !0,
            e.loaded(null))
        }, this.timeout),
        PopIn5.$F.ajax(PopIn5.$F.join(this.data, {
            success: function(t) {
                !1 === e.success && (e.success = !0,
                e.loaded(t))
            },
            fast: !0
        }))
    }
}),
PopIn5.StaticClass("$", "Segment", {
    init: function() {},
    getSegmentData: function(e, t, n) {
        if (PopIn5.$F.isEmpty(e) || PopIn5.$F.isEmpty(t))
            return {};
        n = PopIn5.$F.join({}, n);
        var o = PopIn5.$F.join(t.segmentData, e.segmentData)
          , i = [["ca", "category"], ["ab", "abtest"], ["au", "customField"]];
        PopIn5.$F.notEmpty(n.useCommonCategory) && i.push(["cc", "commonCategory"]),
        PopIn5.$F.notEmpty(n.onlyCommonCategory) && (i = [["cc", "commonCategory"]]);
        for (var a = {}, r = 0, s = i.length; r < s; r++) {
            var d = i[r]
              , c = d[0]
              , p = d[1];
            if (PopIn5.$F.notEmpty(o[p])) {
                var l = o[p];
                l = PopIn5.$F.isArray(l) ? l : [l],
                a[c] = l
            }
        }
        return a
    },
    addSegmentLog: function(e, t, n, o) {
        var i = this.getSegmentData(t, n, o);
        for (var a in i) {
            var r = i[a];
            r = PopIn5.$F.isArray(r) ? r : [r],
            "cc" === a && (r = [r[0]]);
            for (var s = 0, d = r.length; s < d; s++)
                e.add("r5", a + "_" + encodeURIComponent(r[s]))
        }
    }
}),
PopIn5.StaticClass("$", "Treasure", {
    init: function() {
        !function(e, t) {
            if (void 0 === t[e]) {
                t[e] = function() {
                    t[e].clients.push(this),
                    this._init = [Array.prototype.slice.call(arguments)]
                }
                ,
                t[e].clients = [];
                for (var n = ["addRecord", "set", "trackEvent", "trackPageview", "trackClicks", "ready"], o = 0; o < n.length; o++) {
                    var i = n[o];
                    t[e].prototype[i] = function(e) {
                        return function() {
                            return this["_" + e] = this["_" + e] || [],
                            this["_" + e].push(Array.prototype.slice.call(arguments)),
                            this
                        }
                    }(i)
                }
                var a = document.createElement("script");
                a.type = "text/javascript",
                a.async = !0,
                a.src = ("https:" === document.location.protocol ? "https:" : "http:") + "//api.popin.cc/td_js_sdk_171.js";
                var r = document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(a, r)
            }
        }("Treasure2", window),
        this.interactionNumber = 0;
        var e = this
          , t = function(t) {
            e.interactionNumber++,
            e.lastEvent = t
        };
        window.addEventListener("touchstart", t, !1),
        window.addEventListener("click", t, !1),
        window.addEventListener("mousedown", t, !1)
    },
    treasureFactory: function(e, t) {
        var n = new Treasure2({
            writeKey: "8378/25839e06ce4cc1cab55c1c1f1e49d336d6d1d48f",
            database: t
        });
        return e && n.set("$global", "td_global_id", "td_global_id"),
        n
    },
    createLogger: function(e) {
        return e = void 0 === e || e,
        this.treasureFactory(e, "popin_media")
    },
    createAdLogger: function(e) {
        return e = void 0 === e || e,
        this.treasureFactory(e, "popin_ads")
    },
    createUtsLogData: function(e) {
        var t = {};
        for (var n in e)
            t[n] = e[n];
        var o = PopIn5.Discovery.Treasure.uainfo || {};
        return t.td_browser = o.browser || "",
        t.td_browser_version = o.browser_version || "",
        t.td_language = navigator.language,
        t.td_os = o.os || "",
        t.td_os_version = o.os_version || "",
        delete t.td_version,
        delete t.td_ip,
        t
    },
    sendLogDataToUts: function(e, t, n) {
        try {
            var o = JSON.stringify(this.createUtsLogData(n))
              , i = [PopIn5.$.Global.protocol + "//log.popin.cc/log", "/" + e.client.database, "/" + t, "?data=" + btoa(unescape(encodeURIComponent(o))), "&t=" + (new Date).getTime()].join("");
            (new Image).src = i
        } catch (e) {}
    },
    writeRecord: function(e, t, n) {
        if (n.interaction_number = this.interactionNumber,
        PopIn5.$F.notEmpty(this.lastEvent)) {
            if (PopIn5.$F.notEmpty(this.lastEvent.touches)) {
                var o = this.lastEvent.touches[0];
                n.interaction_touchx = Math.round(o.pageX),
                n.interaction_touchy = Math.round(o.pageY)
            }
            "mousedown" == this.lastEvent.type && (n.interaction_mousex = Math.round(event.pageX),
            n.interaction_mousey = Math.round(event.pageY))
        }
        return (!e.client || e.client && "popin_media" === e.client.database) && "discoverylogs" === t ? ("cn" !== PopIn5.$.Global.requestCountry && this.sendLogDataToUts(e, t, n),
        this) : (e.addRecord(t, n, function() {}, function() {}),
        (!e.client || e.client && "popin_ads" === e.client.database) && "adlogs" === t && "cn" !== PopIn5.$.Global.requestCountry && this.sendLogDataToUts(e, t, n),
        this)
    }
}),
PopIn5.StaticClass("$", "User", {
    init: function() {
        this.afterLoad = [],
        this.status = 0
    },
    getUser: function(e) {
        return PopIn5.$F.notEmpty(PopIn5.$.Global.uid) ? (e(PopIn5.$.Global.uid),
        !0) : PopIn5.$F.isSupportStorage() && PopIn5.$F.notEmpty(PopIn5.$F.ssGet("_ss_pp_id")) ? (e(PopIn5.$F.ssGet("_ss_pp_id")),
        !0) : (this.afterLoad.push(e),
        0 === this.status && (this.status = 1,
        this.loadUser()),
        !1)
    },
    loadUser: function() {
        var e = this.afterLoad
          , t = function(t) {
            for (PopIn5.$.Global.uid = t; e.length > 0; )
                e.pop()(t)
        }
          , n = "";
        void 0 !== window.PopIn6 && "hk" == window.PopIn6.requestCountry || (n = -1 != location.href.indexOf("popintoken") ? "&c_token=popin" : ""),
        PopIn5.$F.ajax("https://discoveryplus.popin.cc/popin_discovery/ck?name=uid" + n, function(e) {
            if (PopIn5.$F.notEmpty(e) && PopIn5.$F.notEmpty(e.uid))
                PopIn5.$F.isSupportStorage() && PopIn5.$F.ssSet("_ss_pp_id", e.uid),
                t(e.uid);
            else {
                PopIn5.$F.getMessage(PopIn5.$.Global.protocol + "//api.popin.cc/retarget/uid.html?ac=", function(n) {
                    PopIn5.$F.isSupportStorage() && PopIn5.$F.ssSet("_ss_pp_id", e.uid),
                    t(n)
                })
            }
        })
    }
}),
PopIn5.Class("Discovery", "ArticleRenderer", {
    init: function(e, t, n) {
        this.container = e,
        this.data = PopIn5.$F.join(t, {}),
        this._config = n,
        this.renderParts = {},
        this.isRender = !0,
        this.fixData(),
        this.isRender && (this.render(),
        this.afterRender())
    },
    fixData: function() {
        var e = this.data;
        if (e.originalTitle = e.title,
        PopIn5.$F.notEmpty(this._config.delWord) && e.type.indexOf("ad") < 0 && (e.title = e.title.replace(new RegExp(this._config.delWord,"g"), "")),
        PopIn5.$F.isEmpty(e.title))
            this.isRender = !1;
        else {
            e.rank = e.renderIndex + 1,
            e.formattedDate = PopIn5.$F.notEmpty(e.pubdate) ? this.formatDate(e.pubdate) : "",
            e.type.indexOf("ad") < 0 && (e.url = PopIn5.$F.notEmpty(this._config.displayUrlReplace) ? PopIn5.$F.replaceAll(e.url, this._config.displayUrlReplace) : e.url,
            e.url += PopIn5.$F.notEmpty(this._config.addQuery) ? (/[?]/.test(e.url) ? "&" : "?") + this._config.addQuery : ""),
            e.media = PopIn5.$F.notEmpty(e.media) ? this._config.mediaFormat.replace(/\$MEDIA/, e.media) : "",
            "" !== e.media && PopIn5.$F.notEmpty(this._config.adTitle) && (e.media = e.media.replace(/^\(/, "(" + this._config.adTitle));
            var t = ""
              , n = ""
              , o = ""
              , i = PopIn5.$.Global.protocol;
            if (e.notFoundImg = this._config.notFoundImg,
            0 === e.type.indexOf("ad") ? (o = e.image,
            PopIn5.$F.notEmpty(this._config.imageSize) && 0 === ("" + this._config.imageSize).indexOf("w") ? t = (n = i + "//f.popincdn.com/" + this._config.imageSize + "/") + o : (n = i,
            t = o.indexOf("http://images.popin.cc") > 0 ? n + o.replace(/http:\/\/images.popin.cc/, "//i.popincdn.com") : o,
            "https:" === n && t.indexOf("http://images.popin.cc") > -1 && (t = t.replace(/http:\/\/images.popin.cc/, "https://i.popincdn.com"))),
            t = t.replace(/i.popincdn.com/, "imageaws.popin.cc"),
            e.images && (e.images = e.images.map(function(e) {
                return {
                    image: e.image.replace(/i.popincdn.com/, "imageaws.popin.cc"),
                    aspect: e.aspect
                }
            }))) : (PopIn5.$F.notEmpty(this._config.imageSize) && 0 === ("" + this._config.imageSize).indexOf("w") ? (o = e.image_url,
            t = (n = i + "//f.popincdn.com/" + this._config.imageSize + "/") + o) : PopIn5.$F.notEmpty(this._config.imageSize) && "" + this._config.imageSize == "original" ? t = (n = "") + (o = e.image_url) : "noimage" === (o = e.image) || PopIn5.$F.isEmpty(o) ? o = "" : t = (n = o.indexOf("http") > -1 ? "" : "https://i.popincdn.com/article/") + ("" === this._config.imageSize || o.indexOf("http") > -1 ? o : o.replace(".", "_" + this._config.imageSize + ".")),
            t = t.replace(/i.popincdn.com/, "imageaws.popin.cc"),
            e.imageHash = e.image),
            e.hasImage = PopIn5.$F.notEmpty(o),
            e.imageUrl = e.hasImage ? t : e.notFoundImg,
            e.authorName = PopIn5.$F.notEmpty(e.author_name) ? e.author_name : "",
            0 === e.type.indexOf("ad")) {
                var a = [];
                PopIn5.$F.notEmpty(this._config.channelId) && a.push("m_ch_" + this._config.channelId),
                PopIn5.$F.notEmpty(PopIn5.$.Global.loc) && a.push("c_lc_" + PopIn5.$.Global.loc),
                a.length > 0 && (e.url += "&extra=" + a.join("%7C"));
                var r = PopIn5.$F.parseUri(PopIn5.Discovery._instance._config.apiUrl).host.replace("discoveryplus.", "jp.");
                e.url += "&api_host=" + r,
                PopIn5.$.Global.logid && (e.url += "&logid=" + PopIn5.$.Global.logid)
            }
        }
    },
    renderImageNode: function(e, t) {
        var n = PopIn5.$F.ce(e, "div");
        PopIn5.$F.addClass(n, "_popIn_recommend_art_img"),
        this.renderParts.imageDiv = n,
        t.hasImage || PopIn5.$F.addClass(n, "_popIn_recommend_no_img");
        var o = PopIn5.$F.ce(n, "a");
        this._config.imageInView ? new PopIn5.Discovery.ImageInView(o,t) : PopIn5.$F.ce(o, "img").src = t.imageUrl
    },
    renderCategoryNode: function(e, t) {
        var n = PopIn5.$F.ce(e, "div", t.category);
        PopIn5.$F.addClass(n, "_popIn_recommend_art_category")
    },
    renderTitleNode: function(e, t) {
        var n = PopIn5.$F.ce(e, "div");
        if (PopIn5.$F.addClass(n, "_popIn_recommend_art_title"),
        this._config.debugMode) {
            var o = PopIn5.$F.ce(n, "span", t.type);
            PopIn5.$F.css(o, {
                color: "#ff0000"
            })
        }
        var i = t.title
          , a = PopIn5.$F.ce(n, "a", i);
        "hidden" == PopIn5.$F.cssGet(n, "overflow") && this.addEllipsis(n, a, i)
    },
    addEllipsis: function(e, t, n) {
        for (var o = PopIn5.$F.size(e), i = PopIn5.$F.size(t); i.height > o.height && n.length > 1; )
            n = n.substr(0, n.length - 1),
            t.innerHTML = n + "...",
            i = PopIn5.$F.size(t)
    },
    formatDate: function(e) {
        var t = this._config.dateFormat
          , n = this._config.dateFormatShowYear
          , o = (new Date).getFullYear()
          , i = "";
        if ("000000000000000000" !== e) {
            "0000" == e.slice(8, 12) && /h|m|s/.test(t) && (t = t.replace(/h|m|s|:|：|\s|時|分|秒/g, "")),
            n || e.slice(0, 4) !== o || (t = t.replace(/Y年/, ""));
            var a = {
                Y: [0, 4],
                M: [4, 6],
                D: [6, 8],
                h: [8, 10],
                m: [10, 12],
                s: [12, 14]
            };
            i = t;
            for (var r in a) {
                var s = Number(e.slice(a[r][0], a[r][1]));
                /m|s/.test(r) && s < 10 && (s = "0" + s),
                i = i.replace(new RegExp(r), s)
            }
        }
        return i
    },
    renderMediaNode: function(e, t) {
        var n = PopIn5.$F.ce(e, "div");
        n.innerHTML = t.media,
        PopIn5.$F.addClass(n, "_popIn_recommend_art_media"),
        this.renderParts.mediaDiv = n,
        "hidden" == PopIn5.$F.cssGet(n, "overflow") && this.addEllipsis(n, n, t.media)
    },
    renderDateNode: function(e, t) {
        var n = PopIn5.$F.ce(e, "div", t.formattedDate);
        PopIn5.$F.addClass(n, "_popIn_recommend_art_date")
    },
    renderAuthorNode: function(e, t) {
        if ("" !== t.authorName) {
            var n = PopIn5.$F.ce(e, "div", t.authorName);
            PopIn5.$F.addClass(n, "_popIn_recommend_art_author")
        }
    },
    render: function() {
        var e = this.data;
        if ("fluct" !== e.dsp && "logicad" !== e.dsp && "das" !== e.dsp && "rtb_system" !== e.dsp && "ad" === e.type) {
            var t = "&caid=" + e.channelId
              , n = e.clicktrackers.filter(function(e) {
                return e.indexOf("trace.popin.cc") > 0
            })[0];
            e.url.indexOf("//trace.popin.cc") < 0 ? e.url += "&cb=" + encodeURIComponent(n + t) : e.url += t
        }
        var o = PopIn5.$F.ce(this.container, "div");
        PopIn5.$F.addClass(o, "_popIn_recommend_article _popIn_recommend_article_" + e.type + " _popIn_idx" + (this.data.renderIndex + 1)),
        e.image_fit && PopIn5.$F.addClass(o, "_popIn_recommend_img_fit"),
        e.hasImage && PopIn5.$F.addClass(o, "_popIn_recommend_has_img"),
        this.renderParts.articleDiv = o,
        this.renderImageNode(o, e),
        this.renderTitleNode(o, e),
        this.renderCategoryNode(o, e),
        this.renderMediaNode(o, e),
        this.renderDateNode(o, e),
        this.renderAuthorNode(o, e),
        this.renderParts.imageDiv = PopIn5.$F.oneSelector(o, "._popIn_recommend_art_img"),
        this.renderParts.imageLink = PopIn5.$F.oneSelector(o, "._popIn_recommend_art_img A"),
        this.renderParts.image = PopIn5.$F.oneSelector(o, "._popIn_recommend_art_img IMG"),
        this.renderParts.titleDiv = PopIn5.$F.oneSelector(o, "._popIn_recommend_art_title"),
        this.renderParts.titleLink = PopIn5.$F.oneSelector(o, "._popIn_recommend_art_title A")
    },
    afterRender: function() {
        for (var e = this.renderParts.articleDiv.getElementsByTagName("A"), t = 0; t < e.length; t++)
            this.addClickEvent(e[t]);
        if (PopIn5.$F.notEmpty(this.renderParts.image)) {
            var n = this.renderParts.image
              , o = this;
            n.onerror = function() {
                n.src != o._config.notFoundImg && (n.src = o._config.notFoundImg)
            }
        }
    },
    addClickEvent: function(e) {
        var t = this;
        e.href = this.data.url,
        PopIn5.$F.bind(e, "click", function(e) {
            return PopIn5.$F.notEmpty(e.preventDefault) ? e.preventDefault() : e.returnValue = !1,
            t.handleClick(),
            !1
        })
    },
    handleClick: function() {
        var e = this
          , t = PopIn5.$.Context.findContext(this.container);
        PopIn5.Discovery.Log.clickLog(this._config, t, function() {
            e.addClickCookie(),
            e.afterClick()
        }, this.data)
    },
    afterClick: function() {
        window.top.location = this.data.url
    },
    addClickCookie: function() {
        if (PopIn5.$F.notEmpty(this.data.hash) && PopIn5.$F.notEmpty(this.data.hash.originalUrl)) {
            var e = PopIn5.Cookie.getCookie("__prd") || "";
            -1 === e.indexOf(this.data.hash.originalUrl) && (e = this.data.hash.originalUrl + (e.length > 0 ? "|" + e : ""));
            var t = e.split("|");
            t.length > 50 && (t = t.splice(0, 50)),
            PopIn5.Cookie.setCookie("__prd", t.join("|"), {
                expires: 30,
                path: "/",
                noencode: !0
            })
        }
    }
}),
PopIn5.Class("Discovery", "ArticleRendererAd", function() {
    function e(e, t) {
        var n = JSON.stringify({
            resources: e,
            href: t,
            hasPopInView5: void 0 !== window.PopInView5
        })
          , o = new XMLHttpRequest;
        o.open("POST", "https://smartphone.popin.cc/post.php?" + (new Date).getTime(), !0),
        o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
        o.send("data=" + n)
    }
    var t = PopIn5.Discovery.ArticleRenderer.prototype
      , n = {};
    for (var o in t)
        n[o] = t[o];
    var i = [];
    return window.performance && window.performance.getEntries && window.addEventListener("load", function() {
        try {
            for (var e, t = performance.getEntries(), n = /\.js$/, o = 0; e = t[o++]; )
                n.test(e.name) && i.push(e.name)
        } catch (e) {}
    }, !1),
    n.addClickEvent = function(t) {
        var n = this;
        t.href = this.data.url,
        t.setAttribute("rel", "nofollow"),
        t.href = t.href + "&mode=20170420",
        t.href += "&piuid=" + PopIn5.$.UserId.getUid();
        var o = PopIn5.$.Treasure.createLogger();
        o.ready(function() {
            t.href += "&td_client_id=" + o.getTrackValues().td_client_id
        }),
        PopIn5.$F.bind(t, "click", function() {
            var o = PopIn5.$.Context.findContext(n.container);
            PopIn5.$F.notEmpty(o.readOutput) && (t.href = t.href + "&read=" + 10 * Math.round(10 * o.readOutput.readPercent)),
            t.href = t.href + "&referer_type=" + PopIn5.$.Global.referrer,
            t.href += "&hasPopInView5=" + (void 0 !== window.PopInView5 ? "1" : "0"),
            PopIn5.Discovery.Treasure.adClickLog(o, n.data),
            PopIn5.Discovery.Treasure.discoveryMediaDnaLog(o, n.data),
            "58ec60ca11e7bb2720549371" === n.data.campaign && e(i, t.href),
            PopIn5.$F.notEmpty(n.click_tracking_pixel) && PopIn5.Discovery.Log.clickTrackingLog(n.click_tracking_pixel),
            n.data.dspObj && n.data.dspObj.execDspFunc("click")
        }),
        t.target = "_blank"
    }
    ,
    n.render = function(e) {
        return function() {
            if (e.apply(this),
            this.data.movie) {
                var t = this.renderParts.articleDiv;
                PopIn5.$F.addClass(t, "_popIn_recommend_art_movie")
            }
            if (this.data.video_link) {
                var n = this.renderParts.imageDiv;
                PopIn5.$F.cssSet(n, "position", "relative");
                PopIn5.$F.size(n);
                var o = this.renderParts.imageLink
                  , i = +PopIn5.$F.css(o, "margin-top").replace(/px/, "")
                  , a = PopIn5.$F.isMobileDevice() ? 33 : 40
                  , r = PopIn5.$F.ce(n, "div");
                PopIn5.$F.css(r, {
                    display: "display",
                    background: "url(https://i.popincdn.com/videos/play.png) no-repeat left",
                    "background-size": "contain",
                    position: "absolute",
                    bottom: -i,
                    right: 0,
                    width: a,
                    height: a
                })
            }
            this.data.trackingPixelConf && this.data.trackingPixelConf.trackingNodeId && (this.renderParts.articleDiv.id = this.data.trackingPixelConf.trackingNodeId)
        }
    }(n.render),
    n
}()),
PopIn5.Class("Discovery", "ArticleRendererAd_video", function() {
    var e = PopIn5.Discovery.ArticleRenderer.prototype
      , t = {};
    for (var n in e)
        t[n] = e[n];
    return t.renderImageNode = function(e, t) {
        var n = this;
        if ("undefined" == typeof video_jsv) {
            window.jsv_config = {
                bufferSec: 5,
                chunkSize: 1e6,
                doNotPatchCreateElement: !0
            };
            var o = document.createElement("script");
            o.type = "text/javascript",
            o.charset = "utf-8",
            o.async = !0,
            o.onload = function() {
                n.loadVideo()
            }
            ,
            o.src = "//" + PopIn5.$.Global.baseDomain + "/popin_video_ads-min.js";
            var i = document.getElementsByTagName("script")[0];
            i.parentNode.insertBefore(o, i)
        } else
            this.loadVideo();
        var a = PopIn5.$F.ce(e, "div");
        PopIn5.$F.addClass(a, "_popIn_recommend_art_video"),
        this.videoDiv = a
    }
    ,
    t.loadVideo = function() {
        var e = PopIn5.$F.ce(this.videoDiv, "div");
        PopIn5.$F.css(e, {
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0px",
            bottom: "0px",
            left: "0px",
            right: "0px",
            "text-align": "center"
        });
        var t = new video_jsv;
        e.appendChild(t);
        var n = PopIn5.$.Global.protocol + "//jsv.popin.cc/" + this.data.nid + "/video.jsv";
        t.addEventListener("canplay", function() {}),
        t.setAttribute("preload", "auto"),
        t.setAttribute("data-audio", ""),
        t.setAttribute("autoplay", "true"),
        t.style.height = "100%",
        t.setAttribute("src", n),
        t.firstChild.style.width = ""
    }
    ,
    t
}()),
PopIn5.Class("Discovery", "ArticleRendererYahoo", function() {
    var e = []
      , t = PopIn5.Discovery.ArticleRenderer.prototype
      , n = {};
    for (var o in t)
        n[o] = t[o];
    return n.render = (n.render,
    function() {
        var t = this.data
          , n = "_popy" + (new Date).getTime().toString(16) + "_"
          , o = PopIn5.$F.ce(this.container, "div");
        PopIn5.$F.addClass(o, "_popIn_recommend_article _popIn_recommend_article_" + t.type + " _popIn_idx" + (this.data.renderIndex + 1)),
        o.id = n,
        e.push(n)
    }
    ),
    n.afterRender = (n.afterRender,
    function() {
        var t = PopIn5.$F.notEmpty(this._config.yads_ad_ds) ? this._config.yads_ad_ds : ""
          , n = this._config.pages;
        if (t && e.length === n) {
            var o = null
              , i = 0;
            o = setInterval(function() {
                if (++i > 10 && clearInterval(o),
                !PopIn5.$F.isEmpty(window.YadsTimelineManager)) {
                    for (var n = new YadsTimelineManager({
                        yads_ad_ds: t
                    }), a = 0, r = e.length; a < r; a++)
                        n.insertAd(e[a]);
                    clearInterval(o)
                }
            }, 500)
        }
    }
    ),
    n
}()),
PopIn5.Class("Discovery", "Box", {
    init: function(e, t, n, o) {
        this.context = e,
        this.originalData = t,
        this._config = n,
        this.template = o,
        this.template.segmentData = PopIn5.$F.join(this._config.segmentData, this.template.segmentData);
        var i = o.selector
          , a = e.key.querySelector(i);
        if (!PopIn5.$F.isEmpty(a)) {
            var r = this.prepareData()
              , s = this
              , d = function(e) {
                e()
            };
            "share" == o.loadAfter && (d = function(e) {
                PopIn5.$.Global.event.addEventListener("share-click", function(t) {
                    e()
                })
            }
            ),
            "amp" == o.loadAfter && (d = function(e) {
                window.addEventListener("message", function(t) {
                    t.source == window.parent && t.data && "amp" == t.data.sentinel && "intersection" == t.data.type && t.data.changes.forEach(function(t) {
                        t.intersectionRect.height > 0 && (e(),
                        e = function() {}
                        )
                    })
                })
            }
            ),
            r && (this.rendered = !1,
            d(function() {
                s.rendered || (s.render(),
                s.rendered = !0)
            }))
        }
    },
    prepareData: function() {
        if (!PopIn5.$F.isEmpty(this.originalData)) {
            this.includeRules = [].concat(this.template.includeRules),
            this.excludeRules = [].concat(this.template.excludeRules),
            PopIn5.$F.notEmpty(this.originalData.cdata) && this.processCookie(JSON.parse(window.atob(this.originalData.cdata)));
            var e = PopIn5.$F.notEmpty(this.template.type) ? this.template.type : this._config.type
              , t = new Date;
            if (this.nowDate = [t.getFullYear(), ("00" + (t.getMonth() + 1)).slice(-2), ("00" + t.getDate()).slice(-2), "2359999999"].join(""),
            PopIn5.$F.notEmpty(this._config.yads_ad_ds)) {
                this.template.yads_ad_ds = this._config.yads_ad_ds;
                this.originalData.yahoo = [];
                for (var n = 0; n < 100; n++) {
                    var o = {
                        image: "dummy"
                    };
                    o.title = "dummy" + Math.floor(200 * Math.random()),
                    o.url = "dummy" + Math.floor(200 * Math.random()),
                    this.originalData.yahoo.push(o)
                }
            }
            return this.dataToRender = this._handleFunc(e),
            !0
        }
    },
    processCookie: function(e) {
        var t = e._click;
        if (!PopIn5.$F.isEmpty(t)) {
            for (var n = {}, o = t.split("|"), i = (new Date).getTime(), a = 0, r = o.length; a < r; a++) {
                var s = o[a].split(".")
                  , d = s[1];
                (i - s[2]) / 864e5 > 30 || (void 0 === n[d] && (n[d] = 0),
                n[d]++)
            }
            this.addExcludeRuleForAd(n)
        }
    },
    addExcludeRuleForAd: function(e) {
        this.excludeRules.push(function(t) {
            return !(!("ad" != t.type && "ad_image" != t.type || t.dsp) && PopIn5.$F.notEmpty(e[t.nid]) && e[t.nid] >= 3)
        })
    },
    addValid: function(e, t, n) {
        if (PopIn5.$F.notEmpty(t))
            for (var o = 0, i = t.length; o < i; o++) {
                var a = this.fixOne(n, t[o]);
                this.isValid(a) && e.push(a)
            }
    },
    _handleFunc: function(e) {
        var t = this.originalData;
        if (!t)
            return [];
        var n = [];
        if (e in t && PopIn5.$F.notEmpty(t[e]))
            return this.addValid(n, t[e], e),
            n;
        if (!PopIn5.$F.isArray(e))
            return [];
        var o = (e = [].concat(e))[0];
        "getRandomUnique" === o && (o = "rand");
        for (var i = "", a = ["left", "right", "rand", "sort", "pattern"], r = 0, s = a.length; r < s; r++)
            o == a[r] && (i = e.pop());
        for (var d = 1, c = e.length; d < c; d++)
            n = n.concat(this._handleFunc(e[d]));
        if (n = this.getUnique(n),
        "rand" == o && n.sort(function(e, t) {
            return Math.random() - .5
        }),
        "left" != o && "rand" != o || (n = n.slice(0, Math.min(i, n.length))),
        "right" == o && (n = n.slice(Math.max(0, n.length - i), n.length)),
        "pattern" == o && (n = this.getPattern(n, i)),
        "sort" == o) {
            var p = function(e, t) {
                return e > t ? 1 : e < t ? -1 : 0
            };
            n.sort(function(e, t) {
                return -p(e[i], t[i])
            })
        }
        return n
    },
    getPattern: function(e, t) {
        for (var n = !0, o = [].concat(e), i = [], a = t; n; ) {
            n = !1,
            "function" == typeof t && (a = t());
            for (var r = 0, s = a.length; r < s; r++) {
                var d = a[r];
                e: for (var c = 0, p = (d = PopIn5.$F.isArray(d) ? d : [d]).length; c < p; c++)
                    for (var l = d[c], h = 0, g = o.length; h < g; h++) {
                        var u = o[h];
                        if (u.type2.search(l) > -1) {
                            n = !0,
                            i.push(u),
                            o.splice(h, 1);
                            break e
                        }
                    }
            }
        }
        return i
    },
    getReadHistoryAll: function() {
        if (PopIn5.$F.notEmpty(this.readHistoryAll))
            return this.readHistoryAll;
        var e = PopIn5.$F.lsGet("_prh_all");
        return e = PopIn5.$F.notEmpty(e) ? JSON.parse(e) : [],
        this.readHistoryAll = e,
        e
    },
    getUnique: function(e) {
        for (var t = this.template.showLocation, n = [], o = ["originalUrl", "title"], i = {}, a = 0, r = o.length; a < r; a++)
            i[o[a]] = {};
        t || (i[o[0]][PopIn5.$F.digest(this._config.target)] = 1);
        for (var s = 0, d = e.length; s < d; s++) {
            var c = e[s];
            if (c) {
                c.hash = {};
                for (var p = !0, l = 0, h = o.length; l < h; l++) {
                    var g = o[l];
                    if (PopIn5.$F.notEmpty(g) && PopIn5.$F.notEmpty(c[g])) {
                        var u = PopIn5.$F.digest(c[g]);
                        c.hash[g] = u,
                        PopIn5.$F.notEmpty(i[g][u]) ? p = !1 : i[g][u] = 1
                    }
                }
                p && n.push(c)
            }
        }
        if (this._config.hideHistory) {
            for (var f = (PopIn5.Cookie.getCookie("__prd") || "").split("|"), m = 0, v = f.length; m < v; m++) {
                var I = f[m];
                if (n.length <= 5)
                    break;
                for (var P = 0, _ = n.length; P < _; P++)
                    if (n[P].hash.originalUrl == I) {
                        n.splice(P, 1);
                        break
                    }
            }
            var y = this.getReadHistoryAll();
            for (var $ in y)
                if (y.hasOwnProperty($)) {
                    if (n.length <= 5)
                        break;
                    for (var w = 0, b = n.length; w < b; w++)
                        if ($ == PopIn5.$F.digest(n[w].url)) {
                            n.splice(w, 1);
                            break
                        }
                }
        }
        return n
    },
    fixOne: function(e, t) {
        t.type = e,
        t.originalTitle = t.title,
        this.template.delImage && PopIn5.$F.notEmpty(t.image) && t.image.indexOf(this.template.delImage) >= 0 && (t.image = "");
        var n = PopIn5.$F.notEmpty(this.template.imageSize) && 0 === ("" + this.template.imageSize).indexOf("w") ? t.image_url : t.image;
        if ("noimage" === n && (n = ""),
        t.hasImage = PopIn5.$F.notEmpty(n) ? "1" : "0",
        t.type2 = t.type + ("1" == t.hasImage ? "_img" : "_noimg"),
        t.originalUrl = t.url,
        t.url.indexOf("?url=") > 0) {
            var o = PopIn5.$F.parseUrl(t.url).qString.url;
            t.originalUrl = decodeURIComponent(o)
        }
        t.channelId = PopIn5.$F.notEmpty(this.template.channelId) ? this.template.channelId : "",
        t.abtest = PopIn5.$F.notEmpty(this.template.abtestName) ? this.template.abtestName : "";
        var i = PopIn5.$F.digest(t.originalUrl);
        t.hashCount = this.context.discoverySelected[i],
        t.imp && (t.originalImp = t.imp,
        t.imp = t.imp);
        var a = "fluct" !== t.dsp && "logicad" !== t.dsp && "das" !== t.dsp && "rtb_system" !== t.dsp && "ad" === t.type
          , r = new PopIn5.Discovery.Dsp(a ? "Md" : t.dsp);
        return r.setup(t, {}) && (t.dspObj = r),
        "ad" === e ? this.formatTrackingPixelMacroCode(t) : t.imageHash = t.image,
        t
    },
    isValid: function(e) {
        if (PopIn5.$F.isEmpty(e.title))
            return !1;
        if (PopIn5.$F.notEmpty(e.pubdate) && e.pubdate > this.nowDate)
            return !1;
        for (var t = 0, n = this.excludeRules.length; t < n; t++)
            if (!(0,
            this.excludeRules[t])(e))
                return !1;
        for (var o = 0, i = this.includeRules.length; o < i; o++)
            if ((0,
            this.includeRules[o])(e))
                return !0;
        if (PopIn5.$F.notEmpty(e.position))
            return !1;
        var a = !0;
        return "ad" != e.type && "ad_image" != e.type || 0 !== e.media.indexOf("3rdparty") || (a &= PopIn5.$F.notEmpty(e.thirdPartyEnabled)),
        a
    },
    render: function() {
        this.renderer = new PopIn5.Discovery.BoxRenderer(this.context,this.template,this.dataToRender)
    },
    formatTrackingPixelMacroCode: function(e) {
        var t = function(e, t, n) {
            var o = {
                "{{p_advid}}": t.userid,
                "{{p_campId}}": t.campaign,
                "{{p_sid}}": n,
                "{{p_adid}}": t.nid
            };
            for (var i in o) {
                var a = new RegExp(i,"g")
                  , r = o[i];
                e = e.replace(a, r)
            }
            return e
        }
          , n = e
          , o = this.context.configs.discovery.media;
        if (n.click_tracking_pixel && (n.click_tracking_pixel = t(n.click_tracking_pixel, n, o)),
        n.tracking_pixel) {
            n.tracking_pixel = t(n.tracking_pixel, n, o);
            var i = this.getCustomTrackingPixelConf(n.tracking_pixel);
            if (i && "ias" === i.name) {
                var a, r, s = /((https?:)?\/\/\w+\.adsafeprotected.com\/(?!.*ias_adpath.*)([\w-./?%&=]*)?)/g;
                a = n.campaign + n.nid + (new Date).getTime(),
                r = btoa(PopIn5.$F.digest(a)),
                n.trackingPixelConf = {},
                n.trackingPixelConf.name = i.name,
                n.trackingPixelConf.trackingNodeId = r,
                n.tracking_pixel = n.tracking_pixel.replace(s, "$1&ias_adpath=%23" + r)
            }
        }
    },
    getCustomTrackingPixelConf: function(e) {
        for (var t, n = [{
            name: "ias",
            check_reg: /https?:\/\/\w+.adsafeprotected.com\//
        }], o = 0, i = n.length; o < i; o++)
            if ((t = n[o]).check_reg && t.check_reg.test(e))
                return t
    }
}),
new PopIn5.Class("Discovery","BoxRenderer",{
    init: function(e, t, n) {
        if (this.context = e,
        this._config = t,
        this.data = n,
        0 !== this.data.length) {
            var o = Math.min(t.infinitePages, Math.floor(this.data.length / t.infiniteSize));
            if (0 !== o) {
                this._config.pages = o,
                this.plugins = new PopIn5.Discovery.Plugins,
                PopIn5.$F.notEmpty(this._config.css) && PopIn5.$F.appendCSS(this._config.css),
                this.createContainer(),
                PopIn5.Discovery.Log.previewLog(this._config, this.context),
                this.render();
                PopIn5.$F.parseUri(e.configs.discovery.apiUrl).host
            }
        } else
            PopIn5.Discovery.Treasure.emptyData(e, t)
    },
    createContainer: function() {
        var e = document.createElement("div");
        e.id = this._config.containerId,
        PopIn5.$F.addClass(e, "_popIn_recommend_container");
        var t = this.context.key.querySelector(this._config.selector);
        if (t) {
            var n = this.context.configs.discovery;
            PopIn5.$F.notEmpty(n.debugLog) && PopIn5.$.Log.log("https://rlog.popin.cc/s.gif?url=" + location.host + "&uid=&type=paid_discovery_createContainer&t=" + Date.now()),
            PopIn5.$F.insertAdjacentElement(t, this._config.position, e)
        }
        this.container = e
    },
    render: function() {
        var e = this.container
          , t = this.context.configs.discovery;
        PopIn5.$F.notEmpty(t.debugLog) && PopIn5.$.Log.log("https://rlog.popin.cc/s.gif?url=" + location.host + "&uid=&type=paid_discovery_render&t=" + Date.now()),
        this.renderHeader(e);
        var n = PopIn5.$F.ce(e, "div");
        PopIn5.$F.addClass(n, "_popIn_recommend_articles"),
        this.renderFooter(e),
        new (this._config.infiniteSize > 0 ? PopIn5.Discovery.ListInfiniteRenderer : PopIn5.Discovery.ListSimpleRenderer)(this._config,n,this.data),
        this._config.afterRender(this),
        this.plugins.afterRender(this),
        PopIn5.Discovery.Performance.addTimeMark("box_did_render").addMark("is_box_rendered", !0).report(),
        PopIn5.Discovery.Log.boxRenderedLog(this),
        PopIn5.$F.notEmpty(this._config.channelId) && PopIn5.Discovery.Log.intextBoxRenderedLog(this)
    },
    renderHeader: function(e) {
        if (this._config.title) {
            var t = PopIn5.$F.ce(e, "div", this._config.title);
            PopIn5.$F.addClass(t, "_popIn_recommend_header")
        }
    },
    renderFooter: function(e) {
        if (PopIn5.$F.notEmpty(this._config.credit)) {
            var t = PopIn5.$F.ce(e, "div", this._config.credit);
            PopIn5.$F.addClass(t, "_popIn_recommend_credit");
            var n = PopIn5.$F.ce(t, "div");
            PopIn5.$F.addClass(n, "_popIn_recommend_credit_image"),
            this.creditDiv = t,
            this.addCreditEvent(t)
        }
    },
    closeAbout: function() {
        var e = function(e) {
            var t = document.getElementById(e);
            PopIn5.$F.notEmpty(t) && PopIn5.$F.remove(t)
        };
        e("_popIn_about_black"),
        e("_popIn_about_inner")
    },
    addCreditEvent: function(e) {
        var t = this
          , n = function() {
            t.closeAbout()
        };
        n(),
        PopIn5.$F.bind(e, "click", function() {
            if (PopIn5.$F.isMobileDevice())
                return window.open("https://discovery.popin.cc/discovery/what-is.php"),
                !0;
            var e = PopIn5.$F.ce(document.body, "div");
            e.id = "_popIn_about_black",
            PopIn5.$F.css(e, {
                position: "fixed",
                width: "100%",
                height: "100%",
                left: "0px",
                top: "0px",
                "background-color": "black",
                opacity: .75,
                "z-index": 9998
            }),
            PopIn5.$F.bind(e, "click", n);
            var t = PopIn5.$F.ce(document.body, "div");
            t.id = "_popIn_about_inner",
            PopIn5.$F.css(t, {
                position: "fixed",
                width: "500px",
                height: "450px",
                left: "50%",
                top: "50%",
                "margin-left": "-250px",
                "margin-top": "-225px",
                "background-color": "white",
                "border-radius": "6px",
                "z-index": 9999
            });
            var o = PopIn5.$F.ce(t, "div");
            PopIn5.$F.css(o, {
                position: "absolute",
                top: "-18px",
                left: "-18px",
                background: "url(https://" + PopIn5.$.Global.baseDomain + "/images/close.png) no-repeat",
                width: "36px",
                height: "36px",
                cursor: "pointer"
            }),
            PopIn5.$F.bind(o, "click", n),
            PopIn5.$F.iframeLoader("", {
                parentNode: t,
                src: "https://discovery.popin.cc/discovery/what-is.php",
                frameBorder: "0",
                scrolling: "no",
                css: {
                    width: "480px",
                    height: "430px",
                    border: "0px",
                    margin: "10px 0px 0px 10px"
                }
            })
        })
    }
}),
PopIn5.Class("Discovery", "Config", {
    init: function(e) {
        PopIn5.Discovery.Global.device = PopIn5.$F.isMobileDevice() ? "mobile" : "pc",
        this.setDefaults(),
        PopIn5.$.Config.overrideAll(this, e),
        this.afterConfig()
    },
    setDefaults: function() {
        this.agency = "",
        this.adEnable = !1,
        this.media = PopIn5.$.Config.partnerDomain,
        this.target = PopIn5.$.Config.target;
        this.apiUrl = PopIn5.$.Global.protocol + "//discoveryplus.popin.cc/popin_discovery/recommend?mode=new&url=%target",
        this.apiUrlAdd = "",
        this.templates = [],
        this.useForSzAdLtrRatio = PopIn5.$.Config.useForSzAdLtrRatio,
        this.useSzAdLtrChannelIdPrefix = PopIn5.$.Config.useSzAdLtrChannelIdPrefix,
        this.hideHistory = !0,
        this.personal = !1,
        this.adVideo = !1,
        this.adReservedVideo = !1,
        this.videos = [],
        this.plugins = [],
        this.cfid = "",
        this.ad = 10,
        this.treasureDiscoveryLog = !1,
        this.inrecLogEnable = !1,
        this.segmentData = {}
    },
    afterConfig: function() {
        if (this.adEnable && (this.apiUrl += "&device=" + PopIn5.Discovery.Global.device + "&media=" + this.media + "&ad=" + this.ad,
        this.apiUrl += "&extra=" + PopIn5.$F.getPlatform(),
        typeof ("undefined" === PopIn5.Discovery.Global.device) || PopIn5.Discovery.Global.device.indexOf("undefined") > -1)) {
            var e = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
            e.add("url", location.href),
            e.add("uid", ""),
            e.add("type", "undefined_device"),
            e.add("ua", encodeURIComponent(window.navigator.userAgent)),
            e.add("nid", ""),
            e.add("media", ""),
            PopIn5.Discovery.Log.writeLog(e.build())
        }
        if (PopIn5.$F.notEmpty(this.agency) && (this.apiUrl += "&agency=" + this.agency),
        PopIn5.$F.notEmpty(this.cfid) && (this.apiUrl += "&cf=" + this.cfid),
        PopIn5.$F.notEmpty(this.pathnum) && (this.apiUrl += "&pathnum=" + (this.pathnum + 0)),
        "number" == typeof this.topn && this.topn ? this.apiUrl += "&topn=" + this.topn : this.apiUrl += "&topn=50",
        this.apiUrl += "&piuid=" + PopIn5.$.UserId.getUid(),
        this.apiUrl += "&uid=" + PopIn5.$.UserId.getLib6Uid(),
        PopIn5.$F.notEmpty(this.apiUrlAdd)) {
            var t = this.apiUrlAdd;
            "string" == typeof t && 0 !== t.indexOf("&") && (t = "&" + t),
            this.apiUrl += t
        }
        if (PopIn5.$F.isEmpty(PopIn5.$.Config.country))
            for (var n = PopIn5.$F.parseUri(this.apiUrl), o = [["discoveryplus.popin.cc", "jp"], ["jp.popin.cc", "jp"], ["tw.popin.cc", "tw"], ["kr.popin.cc", "kr"], ["popin.cc", "jp"]], i = 0; i < o.length; i++) {
                var a = o[i];
                if (n.host.indexOf(a[0]) > -1) {
                    PopIn5.$.Config.country = a[1];
                    break
                }
            }
        var r = PopIn5.Discovery.Global;
        r.media = this.media,
        r.target = this.target,
        r.adEnable = this.adEnable,
        r.adVideo = this.adVideo,
        r.performanceSample = this.performanceSample,
        r.enablePerformanceMonitor = this.enablePerformanceMonitor,
        PopIn5.$F.notEmpty(this.template) && (this.templates.push(this.template),
        delete this.template);
        for (var s = [], i = 0, d = this.templates.length; i < d; i++)
            s.push(new PopIn5.Discovery.TemplateConfig(this.templates[i]));
        if (this.templates = s,
        this.setSzAdLtrByBatch(),
        (PopIn5.$F.notEmpty(this.yads_ad_ds) ? this.yads_ad_ds : "") && PopIn5.$F.isEmpty(window.YadsTimelineManager))
            for (var c = PopIn5.$.Global.protocol, p = ["//yads.c.yimg.jp/js/yads-async.js", "//" + ("https:" === c ? "s" : "i") + ".yimg.jp/images/listing/tool/yads/yads-timeline-ex.js"], l = 0, h = p.length; l < h; l++) {
                var g = document.createElement("script");
                g.type = "text/javascript",
                g.charset = "UTF-8",
                g.async = !0,
                g.src = c + p[l];
                var u = document.getElementsByTagName("script")[0];
                u.parentNode.insertBefore(g, u)
            }
        PopIn5.$.Global.requestCountry = function(e) {
            if (!PopIn5.$.Global.requestCountry) {
                var t = "jp"
                  , n = /.*country=(\w+).*/
                  , o = e;
                return n.test(o) && (t = o.replace(n, "$1")),
                t
            }
        }(this.apiUrl)
    },
    setSzAdLtrByBatch: function() {
        var e = PopIn5.$F.parseUri(this.apiUrl);
        if ("ignore" !== this.useForSzAdLtrRatio && -1 === this.apiUrl.indexOf("&alg=ltr") && -1 === this.apiUrlAdd.indexOf("&alg=ltr")) {
            var t = "tw.popin.cc" === e.host || "jp.popin.cc" === e.host || "discoveryplus.popin.cc" === e.host;
            "number" == typeof this.useForSzAdLtrRatio ? Math.random() <= this.useForSzAdLtrRatio && (this.apiUrl = this.apiUrl + "&alg=ltr",
            this.appenedAdLtrPrefix()) : t && (this.apiUrl = this.apiUrl + "&alg=ltr")
        }
    },
    appenedAdLtrPrefix: function() {
        for (var e = void 0 === this.useSzAdLtrChannelIdPrefix ? "" : this.useSzAdLtrChannelIdPrefix, t = 0; t < this.templates.length; t++) {
            var n = this.templates[t];
            n.channelId && 0 !== n.channelId.indexOf("with_sz_") && (n.channelId = e + n.channelId)
        }
    }
}),
PopIn5.Class("Discovery", "Dsp", {
    init: function(e) {
        this._dspName = e || "",
        this._dspObj = {}
    },
    setup: function(e, t) {
        var n = "Dsp" + this._dspName.charAt(0).toUpperCase() + this._dspName.slice(1);
        return !!PopIn5.Discovery[n] && (this._dspObj = new PopIn5.Discovery[n](e),
        !0)
    },
    execDspFunc: function(e, t) {
        var n = "_" + e;
        if (this._dspObj[n])
            this._dspObj[n](t);
        else {
            var o = "default" + n;
            this[o] && "function" == typeof this[o] && this[o](t)
        }
    },
    _sendImgRequest: function(e) {
        (new Image).src = e
    },
    default_imp: function(e) {
        this._dspObj.item.nurl && this._sendImgRequest(this._dspObj.item.nurl),
        Array.isArray(this._dspObj.item.imptrackers) && this._dspObj.item.imptrackers.forEach(function(e) {
            this._sendImgRequest(e)
        }, this)
    },
    default_click: function() {
        Array.isArray(this._dspObj.item.clicktrackers) && this._dspObj.item.clicktrackers.forEach(function(e) {
            this._sendImgRequest(e)
        }, this)
    }
}),
PopIn5.Class("Discovery", "DspDas", {
    init: function(e, t) {
        this.item = e,
        this.parameter = t || {}
    }
}),
PopIn5.Class("Discovery", "DspFluct", {
    init: function(e, t) {
        this.item = e,
        this.parameter = t || {}
    }
}),
PopIn5.Class("Discovery", "DspLogicad", {
    init: function(e, t) {
        this.item = e,
        this.parameter = t || {}
    },
    _sendImgRequest: function(e) {
        (new Image).src = e
    },
    _imp: function(e) {
        this.item.nurl && this._sendImgRequest(this.item.nurl),
        Array.isArray(this.item.imptrackers) && this.item.imptrackers.forEach(function(e) {
            this._sendImgRequest(e)
        }, this)
    },
    _click: function() {
        Array.isArray(this.item.clicktrackers) && this.item.clicktrackers.forEach(function(e) {
            this._sendImgRequest(e)
        }, this)
    }
}),
PopIn5.Class("Discovery", "DspMd", {
    init: function(e) {
        this.item = e;
        var t = {
            uu: PopIn5.$.UserId.getUid(),
            tst: (new Date).getTime(),
            ppvs: 5,
            tss: Math.round(((new Date).getTime() - PopIn5.Loader.timeLoad) / 1e3)
        }
          , n = [];
        for (var o in t)
            n.push(o + "=" + t[o]);
        this.params = n.join("&")
    },
    _sendImgRequest: function(e) {
        "function" != typeof navigator.sendBeacon ? (new Image).src = e : navigator.sendBeacon(e)
    },
    _imp: function(e) {
        mdAdPosition++,
        this.item.nurl && this._sendImgRequest(this.item.nurl),
        this.params += "&aps=" + mdAdPosition + "&rp=" + e.renderPosition + "&fs=&bs=&caid=" + e.channelId,
        this.item.nurl && this._sendImgRequest(this.item.nurl),
        Array.isArray(this.item.imptrackers) && this.item.imptrackers.forEach(function(e) {
            this._sendImgRequest(e + "&" + this.params)
        }, this)
    },
    _click: function() {
        var e = this.item.url.indexOf("//trace.popin.cc") < 0
          , t = "&api_host=" + PopIn5.$F.parseUri(PopIn5.Discovery._instance._config.apiUrl).host.replace("discoveryplus.", "jp.") + "&logid=" + PopIn5.$.Global.logid + "&extra=m_ch_" + this.item.channelId;
        Array.isArray(this.item.clicktrackers) && this.item.clicktrackers.forEach(function(n) {
            this._sendImgRequest(e ? n + "&" + this.params : n + t)
        }, this)
    }
}),
PopIn5.StaticClass("Discovery", "Global", {
    init: function() {}
}),
new PopIn5.Class("Discovery","ImageInView",{
    init: function(e, t) {
        PopIn5.$F.inView({
            element: e,
            complete: function() {
                var n = new Image
                  , o = t.imageUrl;
                t.images && (o = PopIn5.$F.getBetterSizeImg(e, t.images)),
                n.onload = function() {
                    PopIn5.$F.css(e, {
                        opacity: 1,
                        "background-image": "url(" + o + ")"
                    }),
                    t && !0 === t.image_fit && PopIn5.$F.css(e, {
                        "background-size": "contain",
                        "background-repeat": "no-repeat"
                    })
                }
                ,
                n.onerror = function() {
                    PopIn5.$F.css(e, {
                        opacity: 1,
                        "background-image": "url(" + t.notFoundImg + ")"
                    }),
                    t && !0 === t.image_fit && PopIn5.$F.css(e, {
                        "background-size": "contain",
                        "background-repeat": "no-repeat"
                    })
                }
                ,
                n.src = o
            }
        })
    }
}),
PopIn5.StaticClass("Discovery", "InfiniteAds", {
    init: function() {
        this.status = 0,
        this.idx = 0
    },
    prepareAds: function() {
        var e = []
          , t = PopIn5.$F.firstNotEmpty(!!PopIn5.$F.notEmpty(window.popInInfiniteAds) && window.popInInfiniteAds(), PopIn5.Discovery.Global.infinite)
          , n = 1
          , o = !0;
        if (PopIn5.$F.notEmpty(t))
            for (; o && e.length < 20; ) {
                o = !1;
                for (var i = 0; i < t.length; i++) {
                    var a = t[i];
                    "ad" != a.type && 1 != n || (e.push(a),
                    o = !0)
                }
                n++
            }
        this.ads = e,
        this.status = 1
    },
    getNextAd: function() {
        if (0 === this.status && this.prepareAds(),
        PopIn5.$F.notEmpty(this.ads)) {
            var e = this.ads[this.idx];
            return this.idx++,
            e
        }
    }
}),
new PopIn5.Class("Discovery","ListInfiniteRenderer",{
    init: function(e, t, n) {
        this._config = e,
        this.container = t;
        for (var o = e.infiniteSize, i = e.infinitePages, a = Math.min(i, Math.floor(n.length / e.infiniteSize)), r = 0; r < a; r++) {
            for (var s = [], d = 0; d < o; d++) {
                var c = r * o + d;
                n[c].renderPosition = c,
                s.push(n[c])
            }
            this.renderPage(s)
        }
    },
    renderPage: function(e) {
        var t = PopIn5.$F.ce(this.container, "div");
        PopIn5.$F.addClass(t, "_popIn_infinite_page"),
        setTimeout(function() {
            PopIn5.$F.cssSet(t, "opacity", 1)
        }, 1);
        new PopIn5.Discovery.ListSimpleRenderer(this._config,t,e)
    }
}),
new PopIn5.Class("Discovery","ListSimpleRenderer",{
    init: function(e, t, n) {
        this.context = PopIn5.$.Context.findContext(t),
        this._config = e,
        this.data = n,
        this.container = t,
        this.plugins = new PopIn5.Discovery.Plugins,
        this.render(),
        this.plugins.afterRender(this)
    },
    render: function() {
        for (var e = this.container, t = 0; t < this.data.length; t++) {
            var n = this.data[t];
            n.renderIndex = t,
            this.renderArticle(e, n)
        }
    },
    renderArticle: function(e, t) {
        var n = PopIn5.$F.digest(t.originalUrl);
        PopIn5.$F.isEmpty(this.context.discoverySelected[n]) && (this.context.discoverySelected[n] = 0),
        this.context.discoverySelected[n]++;
        var o = "ArticleRenderer" + t.type.substr(0, 1).toUpperCase() + t.type.slice(1);
        void 0 === PopIn5.Discovery[o] && (o = "ArticleRenderer");
        var i = new PopIn5.Discovery[o](e,t,this._config);
        return this.plugins.afterRender(i),
        i.data.sendedTrackingPixel && (t.tracking_pixel = void 0),
        PopIn5.Discovery.Log.articleRenderedLog(this.context, t, i),
        i
    }
}),
PopIn5.StaticClass("Discovery", "Log", {
    init: function() {},
    adRequestLog: function(e) {
        PopIn5.Discovery.Treasure.adRequestLog(e)
    },
    boxRenderedLog: function(e) {
        "fixed" !== PopIn5.$F.css(e.container, "position") ? PopIn5.$F.inView({
            element: e.container,
            showArea: 0,
            offset: -100,
            complete: function() {
                PopIn5.Discovery.Log.boxInViewLog(e)
            }
        }) : PopIn5.Discovery.Log.boxInViewLog(e)
    },
    boxInViewLog: function(e) {
        var t = e._config
          , n = e.context;
        PopIn5.Discovery.Treasure.discoveryInviewLog(e);
        var o = PopIn5.Discovery.Global.device
          , i = PopIn5.Discovery.Global.media
          , a = encodeURIComponent(n.target)
          , r = o + "_inview"
          , s = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
        s.add("url", a),
        s.add("uid", ""),
        s.add("type", r),
        s.add("nid", o),
        s.add("media", i),
        PopIn5.$.Segment.addSegmentLog(s, t, n),
        s.add("t", (new Date).getTime()),
        PopIn5.$.Log.uniqueLog(["type=" + r, "url=" + a], s.build())
    },
    intextBoxRenderedLog: function(e) {
        this.channelLogAssit("_channel_pv", e._config, e.context),
        "fixed" !== PopIn5.$F.css(e.container, "position") ? PopIn5.$F.inView({
            element: e.container,
            showArea: 0,
            offset: -100,
            complete: function() {
                PopIn5.Discovery.Log.intextBoxInViewLog(e._config, e.context)
            }
        }) : PopIn5.Discovery.Log.intextBoxInViewLog(e._config, e.context)
    },
    intextBoxInViewLog: function(e, t) {
        this.channelLogAssit("_channel_inview", e, t)
    },
    channelLogAssit: function(e, t, n) {
        for (var o = PopIn5.Discovery.Global.device, i = PopIn5.Discovery.Global.media, a = encodeURIComponent(n.target), r = t.channelId, s = ["url", a, "uid", "", "type", o + e, "nid", o, "media", i], d = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif"), c = 0, p = s.length; c < p; c += 2) {
            var l = s[c]
              , h = s[c + 1];
            d.add(l, h)
        }
        PopIn5.$.Segment.addSegmentLog(d, t, n),
        d.add("r5", "ch_" + r),
        d.add("t", (new Date).getTime()),
        PopIn5.$.Log.uniqueLog(["type=" + e, "url=" + a], d.build())
    },
    logSns: function(e) {
        if (!(Math.random() < .1))
            for (var t = 0, n = 0, o = ["facebook"], i = o.length, a = 0; a < i; a++)
                PopIn5.Share.Handlers.start(o[a], function(o) {
                    if (t += o,
                    ++n == i && t >= 30) {
                        var a = encodeURIComponent(e.target)
                          , r = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/log.gif");
                        r.add("url", a),
                        r.add("share", t);
                        var s = PopIn5.$F.parseUri(e.configs.discovery.apiUrl);
                        "jp.popin.cc" == s.host && r.add("type", "share-jp"),
                        "tw.popin.cc" == s.host && r.add("type", "share-tw"),
                        "kr.popin.cc" == s.host && r.add("type", "share-kr"),
                        PopIn5.$.Log.log(r.build())
                    }
                }, e.target)
    },
    logRelated: function(e) {
        PopIn5.Discovery.Global.device,
        PopIn5.Discovery.Global.media;
        var t = encodeURIComponent(e.target)
          , n = PopIn5.$F.notEmpty(e.configs) && PopIn5.$F.notEmpty(e.configs.discovery) ? e.configs.discovery.apiUrl : ""
          , o = /(jp|tw|kr|sg|th|id).popin.cc/.test(n) ? "related-" + RegExp.$1 : "related";
        "related-sg" !== o && "related-id" !== o || (o = "related-th");
        var i = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//r.popin.cc/log.gif");
        i.add("type", o),
        i.add("uid", ""),
        i.add("url", t),
        PopIn5.$.Log.uniqueLog(["type=" + o, "url=" + t], i.build() + "&" + (new Date).getTime())
    },
    previewLog: function(e, t) {
        PopIn5.Discovery.Treasure.discoveryPreviewData({
            context: t,
            _config: e
        }),
        PopIn5.Discovery.Treasure.discoveryConcatnationPVLog({
            context: t
        });
        var n = PopIn5.Discovery.Global.device
          , o = PopIn5.Discovery.Global.media
          , i = encodeURIComponent(t.target)
          , a = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
        a.add("url", i),
        a.add("uid", ""),
        a.add("type", n + "_pv"),
        a.add("nid", n),
        a.add("media", o),
        PopIn5.$.Segment.addSegmentLog(a, e, t),
        a.add("t", (new Date).getTime()),
        PopIn5.$.Log.uniqueLog(["type=" + n + "_pv", "url=" + i], a.build())
    },
    adBoxRenderedLog: function(e, t) {
        PopIn5.Discovery.Treasure.discoveryAdsImpressionLog({
            context: t,
            _config: e
        });
        var n = PopIn5.$.Global.deviceForAd
          , o = PopIn5.$.Global.uid
          , i = PopIn5.Discovery.Global.media
          , a = encodeURIComponent(t.target)
          , r = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
        r.add("url", a),
        r.add("uid", o),
        r.add("type", n + "_imp"),
        r.add("nid", ""),
        r.add("media", i),
        PopIn5.$.Segment.addSegmentLog(r, e, t, {
            onlyCommonCategory: !0
        }),
        PopIn5.$F.notEmpty(e.channelId) && r.add("r5", "ch_" + e.channelId),
        r.add("t", (new Date).getTime()),
        PopIn5.$.Log.uniqueLog(n + "_imp", r.build())
    },
    adChannelImpLog: function(e, t) {
        if (void 0 === t._sentChannelIdForChannelImpLog && (t._sentChannelIdForChannelImpLog = []),
        !(PopIn5.$F.isEmpty(e.channelId) || t._sentChannelIdForChannelImpLog.indexOf(e.channelId) > -1)) {
            t._sentChannelIdForChannelImpLog.push(e.channelId);
            var n = PopIn5.$.Global.deviceForAd
              , o = PopIn5.$.Global.uid
              , i = PopIn5.Discovery.Global.media
              , a = encodeURIComponent(t.target)
              , r = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
            r.add("url", a),
            r.add("uid", o),
            r.add("type", n + "_channel_imp"),
            r.add("nid", ""),
            r.add("media", i),
            PopIn5.$.Segment.addSegmentLog(r, e, t, {
                onlyCommonCategory: !0
            }),
            r.add("r5", "ch_" + e.channelId),
            r.add("t", (new Date).getTime()),
            PopIn5.$.Log.uniqueLog(["type=" + n + "_channel_imp", "url=" + t.target], r.build())
        }
    },
    articleRenderedLog: function(e, t, n) {
        if (0 === t.type.indexOf("ad")) {
            var o = this;
            PopIn5.$F.inView({
                element: n.renderParts.articleDiv,
                showArea: .5,
                complete: function() {
                    o.adBoxRenderedLog(n._config, e),
                    o.adChannelImpLog(n._config, e),
                    setTimeout(function() {
                        o.adInViewLog(n._config, e, t)
                    }, 1e3)
                }
            })
        }
    },
    adInViewLog: function(e, t, n) {
        if (!(PopIn5.$F.notEmpty(n.debug) || Math.round(((new Date).getTime() - PopIn5.Loader.timeLoad) / 1e3) > 1800)) {
            PopIn5.Discovery.Treasure.adInViewLog(e, t, n);
            var o = n.url.match(/[\?&]token=([^&]+)/) ? n.url.match(/[\?&]token=([^&]+)/)[1] : ""
              , i = n.nid
              , a = n.campaign
              , r = PopIn5.$.Global.deviceForAd
              , s = PopIn5.$.Global.uid
              , d = PopIn5.Discovery.Global.media
              , c = encodeURIComponent(t.target);
            if (n.imp) {
                var p = n.imp
                  , l = PopIn5.$F.parseUri(PopIn5.Discovery._instance._config.apiUrl).host.replace("discoveryplus.", "jp.");
                p += (!0 === /\?/.test(p) ? "&" : "?") + "api_host=" + l,
                p += "&extra=m_ch_" + e.channelId,
                PopIn5.$.Global.logid && (p += "&logid=" + PopIn5.$.Global.logid),
                p += "&mode=20170420",
                p += "&piuid=" + PopIn5.$.UserId.getUid();
                var h = PopIn5.$.Treasure.createLogger();
                h.ready(function() {
                    p += "&td_client_id=" + h.getTrackValues().td_client_id
                }),
                PopIn5.$.Log.log(p)
            } else {
                var g = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
                g.add("url", c),
                g.add("uid", s),
                g.add("type", r + "_imp"),
                g.add("nid", i),
                g.add("campaign", a),
                g.add("media", d),
                PopIn5.$.Segment.addSegmentLog(g, e, t, {
                    onlyCommonCategory: !0
                }),
                PopIn5.$F.notEmpty(PopIn5.$.Global.loc) && g.add("r5", "lc_" + PopIn5.$.Global.loc),
                g.add("r6", o),
                "fluct" !== n.dsp && "logicad" !== n.dsp && "das" !== n.dsp && "rtb_system" !== n.dsp && "ad" === n.type && g.add("dmf", "m"),
                PopIn5.Discovery.Log.writeLog(g.build())
            }
            PopIn5.$F.notEmpty(n.trackingPixel) ? this._writeTrackingPixel(n.trackingPixel) : PopIn5.$F.notEmpty(n.tracking_pixel) && this._writeTrackingPixel(n.tracking_pixel),
            n.dspObj && n.dspObj.execDspFunc("imp", n)
        }
    },
    videoTracking: function(e, t) {
        if (!PopIn5.$F.isEmpty(t.trackingPixel) && !PopIn5.$F.isEmpty(t.impUrl) && ("imp" === e || "playTimeSeconds" === e && PopIn5.$F.notEmpty(t.play_time_seconds))) {
            try {
                this._writeTrackingPixel(t.trackingPixel)
            } catch (e) {}
            t.trackingPixel = ""
        }
    },
    clickTrackingLog: function(e) {
        this._writeTrackingPixel(e)
    },
    _writeTrackingPixel: function(e) {
        var t = e.replace(/""/g, '"')
          , n = [];
        n.push('<body style="margin:0px;padding:0px;background-color: transparent;">'),
        n.push("<script>window.inDapIF = true;<\/script>"),
        n.push(t),
        n.push("</body>"),
        PopIn5.$F.iframeLoader(n.join(""), {
            src: "about:self",
            scrolling: "no",
            frameBorder: "0",
            allowTransparency: !0,
            css: {
                width: "0px",
                height: "0px",
                margin: "0px",
                padding: "0px",
                overflow: "none"
            }
        })
    },
    videoLog: function(e, t, n, o) {
        var i = "";
        try {
            this.videoTracking(t, e)
        } catch (e) {}
        var a = !(!PopIn5.$F.notEmpty(e.videoObj.type) || "vast" !== e.videoObj.type)
          , r = function(e) {
            e.forEach(function(e) {
                PopIn5.$.Log.log(e)
            })
        };
        if ("imp" === t && PopIn5.$F.notEmpty(e.impUrl))
            return i = e.impUrl,
            PopIn5.$F.notEmpty(e.play_time_seconds) && (i += "&target=m"),
            PopIn5.Discovery.Treasure.adVideoLog(PopIn5.$.Global.deviceForAd + "_video_" + t, o, e),
            a && PopIn5.$F.notEmpty(e.videoObj.Impression) && r(e.videoObj.Impression),
            void PopIn5.$.Log.log(i);
        if ("playTimeSeconds" === t && PopIn5.$F.notEmpty(e.impUrl))
            return i = e.impUrl,
            PopIn5.$F.notEmpty(e.play_time_seconds) && (i += "&target=c"),
            PopIn5.Discovery.Treasure.adVideoLog(PopIn5.$.Global.deviceForAd + "_video_" + t, o, e),
            void PopIn5.$.Log.log(i);
        "" + t == "100" && PopIn5.$F.notEmpty(e.endUrl) && PopIn5.$.Log.log(e.endUrl);
        var s = ""
          , d = e.nid
          , c = e.campaign
          , p = PopIn5.$.Global.deviceForAd
          , l = PopIn5.$.Global.uid
          , h = PopIn5.Discovery.Global.media
          , g = encodeURIComponent(PopIn5.Discovery.Global.target);
        "twoSeconds" === t && (t = "2s"),
        "threeSeconds" === t && (t = "3s");
        var u = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
        if (u.add("url", g),
        u.add("uid", l),
        u.add("type", p + "_video_" + t),
        u.add("nid", d),
        u.add("campaign", c),
        u.add("media", h),
        "" + t == "100" && PopIn5.$.Segment.addSegmentLog(u, n, o, {
            useCommonCategory: !0
        }),
        u.add("r5", "cc_video"),
        u.add("r6", "video_imp"),
        u.add("t", (new Date).getTime()),
        s = u.build(),
        PopIn5.Discovery.Treasure.adVideoLog(p + "_video_" + t, o, e),
        "2s" === t && PopIn5.Discovery.Treasure.discoveryVideoMediaLog(o, e),
        a)
            switch ("" + t) {
            case "full":
                r(e.videoObj.ClickTracking);
                break;
            case "2s":
                r(e.videoObj.start);
                break;
            case "25":
                r(e.videoObj.firstQuartile);
                break;
            case "50":
                r(e.videoObj.midpoint);
                break;
            case "75":
                r(e.videoObj.thirdQuartile);
                break;
            case "100":
                r(e.videoObj.complete)
            }
        PopIn5.$.Log.log(s)
    },
    clickLog: function(e, t, n, o) {
        PopIn5.Discovery.Treasure.discoveryClickLog({
            context: t,
            item: o,
            _config: e
        });
        var i = PopIn5.Discovery.Global.device
          , a = PopIn5.Discovery.Global.media
          , r = e.channelId
          , s = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
        s.add("url", ""),
        s.add("uid", ""),
        s.add("type", i + "_rclick"),
        s.add("nid", i),
        s.add("media", a),
        PopIn5.$.Segment.addSegmentLog(s, e, t);
        var d = PopIn5.$.Global.protocol + "//r.popin.cc/log.gif?type=click&url=" + encodeURIComponent(o.url) + "&common_category=" + t.segmentData.commonCategory;
        PopIn5.$F.ssSet("__discovery_clicklog", d),
        PopIn5.$F.notEmpty(r) && s.add("r5", "ch_" + r),
        this.writeLog(s.build(), n)
    },
    writeLog: function(e, t) {
        t = t || function() {}
        ;
        var n = function() {
            var e = !1;
            return function() {
                e || (e = !0,
                t())
            }
        }();
        e += "&t=" + (new Date).getTime(),
        setTimeout(n, 200),
        PopIn5.$.Log.log(e, {
            onLoad: n,
            onError: n
        })
    }
}),
PopIn5.Module("Discovery", {
    initModule: function() {
        var e = this;
        if (location.href.indexOf("popinbasedebug=true") > 0) {
            var t = function(e, t) {
                var n = document.getElementById("_popIn_debug_base");
                PopIn5.$F.isEmpty(n) && ((n = PopIn5.$F.ce(document.body, "div")).id = "_popIn_debug_base",
                n.style.position = "fixed",
                n.style.width = "500px",
                n.style.height = "500px",
                n.style.overflow = "auto",
                n.style.right = "10px",
                n.style.padding = "10px",
                n.style.top = "10px",
                n.style.border = "solid 1px gray",
                n.style.backgroundColor = "black",
                n.style.zIndex = 999999),
                PopIn5.$F.ce(n, "div", e).style.color = t || "#00ff00"
            };
            for (var n in PopIn5.Discovery)
                for (var o in PopIn5.Discovery[n].prototype)
                    !function(e, n, o) {
                        var i = e[o];
                        "function" == typeof i && (e[o] = function() {
                            t("Discovery." + n + "." + o);
                            try {
                                return i.apply(this, arguments)
                            } catch (e) {
                                t("ERROR: " + e, "#FF0000")
                            }
                        }
                        )
                    }(PopIn5.Discovery[n].prototype, n, o)
        }
        if (PopIn5.$F.notEmpty(this._config.debugLog) && PopIn5.$.Log.log("http://rlog.popin.cc/s.gif?url=" + location.host + "&uid=&type=paid_discovery_initModule&t=" + Date.now()),
        PopIn5.$F.notEmpty(PopIn5.$.Config.includeFilter.url) && !PopIn5.$F.testOne(PopIn5.$.Config.includeFilter.url, this._config.target))
            return !1;
        this.testMode = 0,
        this.testMode += location.href.indexOf("popinadtest=true") > -1 ? 1 : 0,
        this.testMode += location.href.indexOf("popinadid=") > -1 ? 1 : 0,
        this.testMode += location.href.indexOf("popinvideotest=") > -1 ? 1 : 0,
        this.testMode += location.href.indexOf("popinadimage=") > -1 ? 1 : 0;
        for (var i = 0; i < PopIn5.$.Context.contexts.length; i++)
            e.initContext(PopIn5.$.Context.contexts[i]);
        PopIn5.$.Global.event.addEventListener("newContext", function(t) {
            e.initContext(t)
        });
        var a = PopIn5.$F.ssGet("__discovery_clicklog");
        PopIn5.$F.notEmpty(a) && (PopIn5.$.Log.log(a),
        PopIn5.$F.ssSet("__discovery_clicklog", ""))
    },
    initContext: function(e) {
        var t = e.key.querySelector("._popIn_recommend");
        if (PopIn5.$F.notEmpty(t)) {
            var n = t.getAttribute("data-url");
            PopIn5.$F.notEmpty(n) && (e.target = PopIn5.$F.replaceAll(n, PopIn5.$.Config.urlReplace))
        }
        this.startContext(e)
    },
    startContext: function(e) {
        e.configs.discovery = this._config,
        e.discoverySelected = {},
        this.initProxy(e),
        this.addPopinImgJs(),
        PopIn5.$.Config.isArticle && (PopIn5.Discovery.Log.logRelated(e),
        PopIn5.Discovery.Log.logSns(e))
    },
    addPopinImgJs: function() {
        var e = document.createElement("script");
        e.type = "text/javascript",
        e.charset = "UTF-8",
        e.async = !0,
        e.src = "https://api.popin.cc/test/popin_img_m.js";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t)
    },
    initProxy: function(e) {
        for (var t = !1, n = null, o = 0, i = this._config.templates.length; o < i; o++) {
            var a = this._config.templates[o];
            n = e.key.querySelector(a.selector),
            t = t || PopIn5.$F.notEmpty(n)
        }
        for (var r = 0, s = this._config.videos.length; r < s; r++) {
            var d = this._config.videos[r];
            n = e.key.querySelector(d.selector),
            t = t || PopIn5.$F.notEmpty(n)
        }
        if (t) {
            var c = this._config.apiUrl.replace(/^http:/, "https:");
            c = c.replace("%target", encodeURIComponent(e.target)),
            PopIn5.$.Config.isArticle || (c += "&related=false");
            var p = this
              , l = function(t) {
                PopIn5.Discovery.Performance.addTimeMark("api_data_will_deal"),
                p.handleResult(e, t);
                try {
                    PopIn5.$.UserId.setLib6Uid(t.cookie.uid)
                } catch (e) {
                    throw new Error(e)
                }
            };
            if (this.testMode > 0) {
                window._popIn_discovery_test = {
                    url: c,
                    callback: l
                };
                var h = document.createElement("script");
                h.type = "text/javascript",
                h.charset = "UTF-8",
                h.async = !0,
                h.src = "https://i.popincdn.com/test/discovery_test.js";
                var g = document.getElementsByTagName("script")[0];
                return void g.parentNode.insertBefore(h, g)
            }
            var u = function() {
                PopIn5.Discovery.Performance.addMark("apiUrl", c).addTimeMark("api_will_request");
                var e = new PopIn5.$.ProxyAjax(c);
                e.timeout = 5e3,
                e.setCallback(l),
                e.load()
            };
            try {
                var f = PopIn5.$.Treasure.createLogger();
                f.ready(function() {
                    try {
                        var e = f.getTrackValues();
                        e = PopIn5.Discovery.Treasure.updateBrowserInfo(e);
                        var t = {};
                        for (var n in e)
                            t["user_" + n] = "td_title" === n ? encodeURIComponent(e[n]) : e[n];
                        t.user_device = PopIn5.$.Global.device,
                        t.user_time = Date.now();
                        var o = JSON.stringify(t)
                          , i = btoa(unescape(encodeURIComponent(o)));
                        c += "&info=" + i
                    } catch (e) {}
                    u()
                })
            } catch (e) {
                u()
            }
            PopIn5.Discovery.Treasure.discoverySelector(e, this._config)
        }
    },
    handleResult: function(e, t) {
        if (PopIn5.$F.notEmpty(t)) {
            PopIn5.$.Global.event.fireEvent("result-loaded", [t]),
            PopIn5.$F.notEmpty(t.category) && (e.segmentData.category = t.category),
            PopIn5.$F.notEmpty(t.common_category) && (e.segmentData.commonCategory = t.common_category),
            PopIn5.$F.notEmpty(t.logid) && (PopIn5.$.Global.logid = t.logid),
            PopIn5.$F.notEmpty(t.loc) && (PopIn5.$.Global.loc = t.loc),
            PopIn5.$.Global.event.fireEvent("start-render", []),
            e.discoveryData = t,
            this._config.adEnable && PopIn5.Discovery.Log.adRequestLog(e);
            for (var n = 0, o = this._config.videos.length; n < o; n++) {
                var i = this._config.videos[n];
                new PopIn5.Discovery.VideoBox(e,t,this._config,i)
            }
            for (var a = 0, r = this._config.templates.length; a < r; a++) {
                var s = this._config.templates[a];
                new PopIn5.Discovery.Box(e,t,this._config,s)
            }
        } else
            PopIn5.$.Global.event.fireEvent("no-content", [])
    }
}),
PopIn5.StaticClass("Discovery", "Performance", {
    isSupported: void 0 !== window.performance && "function" == typeof window.performance.getEntries,
    enableMonitor: !1,
    sample: .5,
    isResourceReady: !1,
    db: "popin_ads",
    table: "fe_performance_monitor",
    marks: {},
    data: {},
    resourceFilterRules: [function(e, t) {
        if (/\/searchbox\/.+\.js$/.test(t.name))
            return e.addMark("request_config_start", t.startTime),
            e.set("rcd", parseInt(t.duration, 10)),
            e.addMark("request_config_end", t.responseEnd),
            !0
    }
    , function(e, t) {
        if (/\/popin_discovery5.+\.js$/.test(t.name))
            return e.addMark("request_discovery_start", t.startTime),
            e.set("rdd", parseInt(t.duration, 10)),
            e.addMark("request_discovery_end", t.responseEnd),
            !0
    }
    , function(e, t) {
        if (0 === t.name.indexOf(e.marks.apiUrl))
            return e.addMark("request_api_start", t.startTime),
            e.set("rad", parseInt(t.duration, 10)),
            e.addMark("request_api_end", t.responseEnd),
            !0
    }
    ],
    init: function(e) {
        if (this.isSupported)
            return this.addMark("discovery_init", PopIn5.__PERFORMANCE_DISCOVERY_INIT__),
            this.bindEvent(),
            this
    },
    check: function() {
        var e = PopIn5.Discovery.Global;
        "number" == typeof e.performanceSample && (this.sample = e.performanceSample),
        void 0 !== e.enablePerformanceMonitor && (this.enableMonitor = e.enablePerformanceMonitor),
        (!this.isSupported || Math.random() > this.sample) && (this.enableMonitor = !1)
    },
    bindEvent: function() {
        var e = this;
        window.addEventListener("load", function() {
            e.isResourceReady = !0,
            e.marks.is_box_rendered && e.report()
        }, !1)
    },
    addTimeMark: function(e) {
        return this.isSupported ? "box_did_render" === e && void 0 !== this.marks.box_did_render ? this : (this.marks[e] = window.performance.now(),
        this) : this
    },
    addMark: function(e, t) {
        return this.marks[e] = t,
        this
    },
    set: function(e, t) {
        return this.data[e] = t,
        this
    },
    collectResourceInfo: function() {
        for (var e, t = window.performance.getEntries(), n = this.resourceFilterRules, o = n.length, i = {}, a = 0; e = t[a++]; ) {
            for (var r, s = 0; r = n[s]; s++)
                if (r(this, e)) {
                    i[r.key] = e,
                    n.splice(s, 1),
                    o--;
                    break
                }
            if (0 === o)
                break
        }
    },
    analyse: function() {
        var e = this.data
          , t = PopIn5.Discovery.Treasure.uainfo || {};
        e.host = window.location.host,
        e.user_agent = window.navigator.userAgent,
        e.browser = t.browser || "",
        e.browser_version = t.browser_version || "",
        e.os = t.os || "",
        e.os_version = t.os_version || "",
        e.device = PopIn5.Discovery.Global.device || "";
        var n = top.screen;
        e.screen = n ? [n.width, n.height].join("x") : "-",
        e.libLoadMode = "script",
        e.rce_rds = this.calculate("request_config_end", "request_discovery_start"),
        e.rde_di = this.calculate("request_discovery_end", "discovery_init"),
        e.di_awr = this.calculate("discovery_init", "api_will_request"),
        e.awr_ras = this.calculate("api_will_request", "request_api_start"),
        e.rae_adwd = this.calculate("request_api_end", "api_data_will_deal"),
        e.adwd_bdr = this.calculate("api_data_will_deal", "box_did_render"),
        e.total = this.calculate("request_config_start", "box_did_render"),
        e.popin_version = 5
    },
    calculate: function(e, t) {
        var n = this.marks;
        return void 0 === n[e] || void 0 === n[t] ? "null" : parseInt(n[t] - n[e], 10)
    },
    report: function() {
        if (this.check(),
        this.enableMonitor && this.isResourceReady && !this.isReported) {
            if (this.collectResourceInfo(),
            this.analyse(),
            this.data.total > 0) {
                new window.Treasure({
                    writeKey: "8378/25839e06ce4cc1cab55c1c1f1e49d336d6d1d48f",
                    database: this.db
                }).addRecord(this.table, this.data)
            }
            return this.isReported = !0,
            this
        }
    }
}),
PopIn5.Class("Discovery", "PluginAfterinview", {
    init: function(e) {
        "BoxRenderer" == e._className && (this._height = Math.min(300, Math.ceil(Math.max.apply(null, [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]) / 4)),
        this._topPos = PopIn5.$F.getPageScrollTop(),
        this.showWidget(e))
    },
    showWidget: function(e) {
        var t = e.container
          , n = PopIn5.$F.position(t);
        this._height += n.top;
        var o = PopIn5.$F.css(t, "height");
        PopIn5.$F.css(t, {
            display: "none",
            opacity: 0,
            height: 1
        });
        var i = this
          , a = null
          , r = function() {
            PopIn5.$F.css(t, {
                display: "",
                transition: "opacity 500ms, height 500ms"
            }),
            PopIn5.$F.inView({
                element: t,
                offset: 0,
                complete: function() {
                    PopIn5.$F.css(t, {
                        opacity: 1,
                        height: o
                    })
                }
            })
        }
          , s = 0
          , d = !1;
        a = setInterval(function() {
            var e = PopIn5.$F.getPageScrollTop()
              , t = e - i._topPos;
            e > i._height && (d = !0),
            t < s && e < i._height && e < n.top && d ? (r(),
            clearInterval(a)) : s = t
        }, 500)
    }
}),
PopIn5.Class("Discovery", "PluginClickall", {
    init: function(e) {
        if (!(e._className.indexOf("ArticleRenderer") < 0)) {
            var t = e.renderParts.articleDiv;
            PopIn5.$F.bind(t, "click", function(e) {
                e.preventDefault(),
                t.querySelector("A").cloneNode(!0).click()
            })
        }
    }
}),
PopIn5.Class("Discovery", "PluginFullclick", {
    init: function(e) {
        if (!(e._className.indexOf("ArticleRenderer") < 0)) {
            var t = e.renderParts.articleDiv
              , n = document.createElement("a");
            for (t.parentNode.insertBefore(n, t); t.childNodes.length > 0; )
                n.appendChild(t.firstChild);
            t.parentNode.removeChild(t),
            n.setAttribute("class", t.getAttribute("class")),
            e.addClickEvent(n),
            e.renderParts.articleDiv = n
        }
    }
}),
PopIn5.Class("Discovery", "PluginImageback", {
    init: function(e) {
        if (!(e._className.indexOf("ArticleRenderer") < 0)) {
            var t = e.renderParts.image;
            PopIn5.$F.notEmpty(t) && (e.data.images && (t.src = PopIn5.$F.getBetterSizeImg(t.parentNode, e.data.images)),
            PopIn5.$F.css(t.parentNode, {
                "background-image": "url(" + t.src + ")"
            }),
            e.data && !0 === e.data.image_fit && PopIn5.$F.css(t.parentNode, {
                "background-size": "contain",
                "background-repeat": "no-repeat"
            }),
            PopIn5.$F.remove(t))
        }
    }
}),
PopIn5.Class("Discovery", "PluginInfinite", {
    init: function(e) {
        e._className.indexOf("ListSimpleRenderer") < 0 || (this.renderer = e,
        this.container = e.container,
        this.context = e.context,
        PopIn5.$F.notEmpty(this.context.discoveryData.infinite) && (PopIn5.Discovery.Global.infinite = this.context.discoveryData.infinite),
        "function" == typeof _popIn_noVideo_loader && PopIn5.$.Global.event.addEventListener("no-video", _popIn_noVideo_loader),
        this.render())
    },
    getVideo: function() {
        var e = PopIn5.Discovery.VideoUtils.getVideo(this.context);
        if (!PopIn5.$F.isEmpty(e)) {
            var t = window.navigator.userAgent
              , n = parseFloat(function(e) {
                var t = e.match(/android\s([0-9\.]*)/);
                return !!t && t[1]
            }(t))
              , o = /Chrome/.test(t) && !/Version/.test(t);
            if (isNaN(n) || o) {
                if (isNaN(n) || !(n < 4))
                    return PopIn5.$.Log.log("https://rlog.popin.cc/s.gif?url=" + location.host + "&uid=&type=paid_video_OK&t=" + Date.now()),
                    e;
                PopIn5.$.Log.log("https://rlog.popin.cc/s.gif?url=" + location.host + "&uid=&type=paid_video_NG2&t=" + Date.now())
            } else
                PopIn5.$.Log.log("https://rlog.popin.cc/s.gif?url=" + location.host + "&uid=&type=paid_video_NG1&t=" + Date.now())
        }
    },
    render: function() {
        if (PopIn5.Discovery.InfiniteAds.idx == this.renderer._config.adVideoPosition) {
            var e = this.getVideo();
            if (PopIn5.$F.notEmpty(e))
                return this.renderVideo(e, this.container),
                void PopIn5.Discovery.InfiniteAds.idx++
        }
        var t = PopIn5.Discovery.InfiniteAds.getNextAd();
        if (PopIn5.$F.notEmpty(t))
            "ad" == t.type && this.renderAd(t, this.container),
            "article" == t.type && this.renderArticle(t, this.container);
        else {
            var n = PopIn5.$F.ce(this.container, "div");
            PopIn5.$F.addClass(n, "_popIn_infinite_empty")
        }
    },
    renderAd: function(e, t) {
        var n = PopIn5.$F.ce(t, "div");
        PopIn5.$F.addClass(n, "_popIn_infinite_ad"),
        PopIn5.$F.cssSet(n, "height", e.height);
        var o = function() {
            var t = [];
            t.push('<body style="margin:0px;padding:0px;background-color: transparent;">'),
            t.push("<script>window.inDapIF = true;<\/script>"),
            t.push(e.script),
            t.push("</body>"),
            PopIn5.$F.iframeLoader(t.join(""), {
                parentNode: n,
                src: "about:self",
                scrolling: "no",
                frameBorder: "0",
                allowTransparency: !0,
                css: {
                    width: e.width + "px",
                    height: e.height + "px",
                    margin: "0px",
                    padding: "0px",
                    overflow: "none"
                }
            })
        };
        this.context.configs.discovery;
        this.renderer._config.adInView ? PopIn5.$F.inView({
            element: n,
            complete: o
        }) : o()
    },
    renderArticle: function(e, t) {
        var n = PopIn5.$F.ce(t, "div");
        PopIn5.$F.addClass(n, "_popIn_infinite_article");
        new PopIn5.Discovery.ListSimpleRenderer(this.renderer._config,n,[PopIn5.$F.join(e, {
            type: "inf_ad",
            renderIndex: this.renderer.data.renderIndex
        })])
    },
    renderVideo: function(e, t) {
        var n = this.renderer._config
          , o = document.createElement("div")
          , i = n.adVideoInsertSelector
          , a = n.adVideoInsertPosition;
        if (PopIn5.$F.notEmpty(i) && PopIn5.$F.notEmpty(i)) {
            var r = document.querySelector(i);
            PopIn5.$F.notEmpty(r) && PopIn5.$F.insertAdjacentElement(r, a, o)
        } else
            t.appendChild(o);
        PopIn5.$F.addClass(o, "_popIn_infinite_video"),
        new PopIn5.Discovery.Video2(this.renderer._config,this.renderer.context,o,e)
    }
}),
PopIn5.Class("Discovery", "PluginMultipledivs", {
    init: function(e) {
        "BoxRenderer" == e._className && this.movePages(e)
    },
    movePages: function(e) {
        for (var t = e.container.querySelectorAll("._popIn_infinite_page"), n = document.querySelectorAll("._popIn_recommend"), o = Math.min(t.length, n.length), i = !1, a = 1; a < o; a++) {
            var r = t[a]
              , s = n[a]
              , d = PopIn5.$F.ce(s, "div");
            PopIn5.$F.addClass(d, "_popIn_recommend_container");
            var c = PopIn5.$F.ce(d, "div");
            PopIn5.$F.addClass(c, "_popIn_recommend_articles"),
            c.appendChild(r),
            i = d
        }
        i && i.appendChild(e.creditDiv)
    }
}),
PopIn5.Class("Discovery", "PluginNewwindow", {
    init: function(e) {
        if (!(e._className.indexOf("ArticleRenderer") < 0)) {
            var t = e.data.url;
            e.handleClick = function() {
                var n = PopIn5.$.Context.findContext(e.container);
                PopIn5.Discovery.Log.clickLog(e._config, n, function() {
                    e.addClickCookie()
                }, e.data),
                window.open(t)
            }
        }
    }
}),
PopIn5.Class("Discovery", "PluginRanking", {
    init: function(e) {
        e._className.indexOf("ArticleRenderer") < 0 || (this.articleRenderer = e,
        this.render())
    },
    render: function() {
        var e = this.articleRenderer.data.renderIndex + 1
          , t = this.articleRenderer.renderParts.articleDiv
          , n = document.createElement("div");
        PopIn5.$F.insertAdjacentElement(t, "afterbegin", n),
        PopIn5.$F.addClass(n, "_popIn_plugin_ranking _popIn_plugin_rank" + e),
        n.innerHTML = e
    }
}),
PopIn5.Class("Discovery", "PluginSamewindow", {
    init: function(e) {
        if (!(e._className.indexOf("ArticleRenderer") < 0))
            for (var t = e.renderParts.articleDiv.querySelectorAll("a"), n = 0, o = t.length; n < o; n++) {
                var i = t[n]
                  , a = i.getAttribute("target");
                a && "_blank" === a && i.removeAttribute("target")
            }
    }
}),
PopIn5.Class("Discovery", "PluginSns", {
    init: function(e) {
        e._className.indexOf("ArticleRenderer") < 0 || (this.articleRenderer = e,
        this.total = this.articleRenderer.data.share,
        this.render())
    },
    render: function() {
        if (!PopIn5.$F.isEmpty(this.total)) {
            var e = this.articleRenderer.renderParts.articleDiv
              , t = document.createElement("div");
            PopIn5.$F.insertAdjacentElement(e, "afterbegin", t),
            PopIn5.$F.addClass(t, "_popIn_plugin_sns"),
            this.numberElement = t;
            var n = this.articleRenderer._config.snsFormat;
            this.numberElement.innerHTML = n.replace(/\$SNS/, this.total)
        }
    }
}),
PopIn5.Class("Discovery", "Plugins", {
    init: function() {},
    afterRender: function(e) {
        for (var t = e._config.plugins, n = 0; n < t.length; n++)
            this.initPlugin(t[n], e)
    },
    initPlugin: function(e, t) {
        var n = "Plugin" + e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
        void 0 !== PopIn5.Discovery[n] && new PopIn5.Discovery[n](t)
    }
}),
PopIn5.Class("Discovery", "TemplateConfig", {
    init: function(e) {
        this.setDefaults(e),
        PopIn5.$.Config.overrideAll(this, e),
        this.afterConfig(e)
    },
    setDefaults: function(e) {
        this.selector = "#_popIn_recommend",
        this.position = "AfterBegin",
        this.containerId = "_popIn_recommend_div",
        this.dateFormat = PopIn5.$F.getParam("date_format", "(Y年M月D日)"),
        this.dateShowYear = PopIn5.$F.getParam("date_format_show_year", !0),
        this.title = !1,
        this.credit = "Recommended by",
        this.afterRender = function() {}
        ,
        this.includeRules = [],
        this.excludeRules = [],
        this.imageInView = PopIn5.$F.notEmpty(e.infiniteSize),
        this.imageSize = PopIn5.$F.isMobileDevice() ? "" : 160,
        this.delImage = !1,
        this.notFoundImg = PopIn5.$.Global.protocol + "//" + PopIn5.$.Global.baseDomain + "/images/noimg.png",
        this.debugMode = /popindebug=true/.test(location.href),
        this.addQuery = "",
        this.plugins = [],
        this.infiniteSize = 0,
        this.infinitePages = 20,
        this.loadAfter = !1,
        this.showLocation = !1,
        this.inView = !1,
        this.mediaFormat = "($MEDIA)",
        this.adVideoPosition = 0,
        this.adInView = !0,
        this.adVideoInsertSelector = !1,
        this.adVideoInsertPosition = !1,
        this.autoPlay = !1,
        this.videoPosition = "AfterEnd",
        this.smoothOffset = -200,
        this.snsFormat = "<span>$SNS</span>",
        this.segmentData = {},
        this.channelId = !1
    },
    afterConfig: function() {}
}),
PopIn5.ErrorSafeStaticClass("Discovery", "Treasure", {
    init: function() {
        this.history = [],
        this.specialLogHistory = [],
        this.adPosition = 0,
        this.setup()
    },
    setup: function() {
        var e = function(e, n) {
            try {
                return t(e.split(n)[1].trim().split(/[^\w\.]/)[0])
            } catch (e) {}
            return "0.0.0"
        }
          , t = function(e) {
            var t = e.split(/[\._]/);
            return (parseInt(t[0], 10) || 0) + "." + (parseInt(t[1], 10) || 0) + "." + (parseInt(t[2], 10) || 0)
        }
          , n = function(e) {
            switch (!0) {
            case /Android/.test(e):
                return "Android";
            case /iPhone|iPad|iPod/.test(e):
                return "iOS";
            case /Windows/.test(e):
                return "Windows";
            case /Mac OS X/.test(e):
                return "Mac"
            }
            return ""
        }
          , o = function(t, n) {
            switch (n) {
            case "Android":
                return e(t, "Android");
            case "iOS":
                return e(t, /OS /);
            case "Windows":
                return e(t, /Phone/.test(t) ? /Windows Phone (?:OS )?/ : /Windows NT/);
            case "Mac":
                return e(t, /Mac OS X /)
            }
            return "0.0.0"
        }
          , i = function(e) {
            switch (!0) {
            case /CriOS/.test(e):
                return "Chrome for iOS";
            case /Edge/.test(e):
                return "Edge";
            case /Chrome/.test(e):
                return "Chrome";
            case /Firefox/.test(e):
                return "Firefox";
            case /Android/.test(e):
                return "AOSP";
            case /MSIE|Trident/.test(e):
                return "IE";
            case /Safari\//.test(e):
                return "Safari";
            case /AppleWebKit/.test(e):
                return "WebKit";
            case /Vivaldi/.test(e):
                return "Vivaldi"
            }
            return ""
        }
          , a = function(t, n) {
            switch (n) {
            case "Chrome for iOS":
                return e(t, "CriOS/");
            case "Edge":
                return e(t, "Edge/");
            case "Chrome":
                return e(t, "Chrome/");
            case "Firefox":
                return e(t, "Firefox/");
            case "Vivaldi":
                return e(t, "Vivaldi/");
            case "AOSP":
                return e(t, /Silk/.test(t) ? "Silk/" : "Version/");
            case "IE":
                return /IEMobile/.test(t) ? e(t, "IEMobile/") : /MSIE/.test(t) ? e(t, "MSIE ") : e(t, "rv:");
            case "Safari":
                return e(t, "Version/");
            case "Webkit":
                return e(t, "WebKit/")
            }
            return ""
        };
        this.uainfo = function() {
            var e = window.navigator.userAgent
              , t = n(e)
              , r = o(e, t)
              , s = i(e);
            return {
                os: t,
                os_version: r,
                browser: s,
                browser_version: a(e, s)
            }
        }()
    },
    discoveryLogger: function(e, t) {
        return {
            context: e,
            _logger: t,
            getTrackValues: function() {
                return void 0 !== this._logger.getTrackValues ? this._logger.getTrackValues() : {}
            }
        }
    },
    getLogger: function(e) {
        return PopIn5.$F.isEmpty(this.tdLogger) && (this.tdLogger = PopIn5.$.Treasure.createLogger()),
        this.discoveryLogger(e, this.tdLogger)
    },
    getAdLogger: function(e) {
        return PopIn5.$F.isEmpty(this.adLogger) && (this.adLogger = PopIn5.$.Treasure.createAdLogger()),
        this.discoveryLogger(e, this.adLogger)
    },
    isLogExsists: function(e, t) {
        for (var n = !1, o = (PopIn5.$F.isArray(t),
        0), i = e.length; o < i; o++)
            n = n || e[o].indexOf(t.join("")) >= 0;
        return n
    },
    adClickLog: function(e, t) {
        this.adLogOne("click", e, t)
    },
    adInViewLog: function(e, t, n) {
        "ad" === n.type || "ad_image" === n.type ? this.adLogOne("imp", t, n, n.recall_tag) : this.adLogOne("reserved_imp", t, n, n.recall_tag)
    },
    adVideoLog: function(e, t, n) {
        this.adLogOne(e, t, n)
    },
    adLogOne: function(e, t, n, o) {
        var i = PopIn5.$F.parseUrl(n.url);
        this.adLogCommon(t, {
            type: e,
            nid: n.nid,
            campaign: n.campaign,
            token: i.qString.token,
            uid: i.qString.uid,
            recall_tag: o,
            timestamp: Date.now()
        }, n)
    },
    adRequestLog: function(e) {
        var t = void 0 !== e.configs && void 0 !== e.configs.discovery ? e.configs.discovery.ad : 0
          , n = void 0 !== e.discoveryData && void 0 !== e.discoveryData.ad ? e.discoveryData.ad.length : 0
          , o = void 0 !== e.discoveryData && void 0 !== e.discoveryData.af ? e.discoveryData.af + "" : ""
          , i = void 0 !== e.discoveryData && void 0 !== e.discoveryData.dmf ? e.discoveryData.dmf + "" : ""
          , a = (void 0 !== e.configs && void 0 !== e.configs.discovery ? e.configs.discovery.apiUrl : "") + "&" + (void 0 !== e.configs && void 0 !== e.configs.discovery ? e.configs.discovery.apiUrlAdd : "")
          , r = (a.match(/[\?&]rid=([^&]+)/) || ["", ""])[1]
          , s = (a.match(/[\?&]alg=([^&]+)/) || ["", ""])[1];
        this.adLogCommon(e, {
            type: "req",
            request_ad: t,
            response_ad: n,
            af: o,
            dmf: i,
            rid: r,
            alg: s
        })
    },
    adLogCommon: function(e, t, n) {
        var o = Math.round(((new Date).getTime() - PopIn5.Loader.timeLoad) / 1e3)
          , i = PopIn5.$F.join({}, t);
        if (i.time_show_seconds = o,
        i.device = PopIn5.$F.isMobileDevice() ? "mobile" : "pc",
        PopIn5.$F.notEmpty(e.discoveryData)) {
            var a = e.discoveryData.common_category;
            i.common_category = PopIn5.$F.notEmpty(a) ? PopIn5.$F.isArray(a) ? a[0] : a : "";
            var r = PopIn5.$F.parseUri(e.configs.discovery.apiUrl).host;
            i.api_host = r.replace("discoveryplus.", "jp."),
            i.media = PopIn5.Discovery.Global.media,
            i.dish_media = PopIn5.Discovery.Global.media,
            e.discoveryData.logid && (i.logid = e.discoveryData.logid),
            e.discoveryData.rid && (i.rid = e.discoveryData.rid),
            e.discoveryData.sample_tag && (i.sample_tag = e.discoveryData.sample_tag)
        }
        n && (n.c1 && (i.c1 = n.c1),
        n.c2 && (i.c2 = n.c2),
        n.c3 && (i.c3 = n.c3),
        i.image = n.image || "",
        i.fruit_image = n.image || "",
        i.image_hash = n.image_hash || "",
        i.fruit_title = n.title || ""),
        i.popin_user_id = PopIn5.$.UserId.getUid(),
        "imp" === i.type && (i.channel_id = n.channelId),
        "fluct" !== n.dsp && "logicad" !== n.dsp && "das" !== n.dsp && "rtb_system" !== n.dsp && "ad" === n.type && (i.dmf = "m"),
        this.writeAdRecord(i, e, n)
    },
    writeAdRecord: function(e, t, n) {
        var o = this.getAdLogger(t);
        (e = PopIn5.$F.join(e, o.getTrackValues())).url = t.target,
        this.writeRecord(o, "adlogs", e),
        "imp" === e.type && this.newSpecialLogForAd(o, e, n)
    },
    emptyData: function(e, t) {
        var n = this.getLogger(e)
          , o = PopIn5.$F.join({}, n.getTrackValues());
        o.type = "empty_data";
        var i = t.type;
        if (PopIn5.$F.notEmpty(i) && PopIn5.$F.isArray(i)) {
            if ("rand,related,0" === i.join(","))
                return;
            if ("pattern" == i[0]) {
                for (var a = [], r = 1; r < i.length - 1; r++) {
                    var s = i[r];
                    a.push(PopIn5.$F.isArray(s) ? s.join(",") : s)
                }
                o.template_type = "pattern[" + a.join("|") + "]"
            } else
                o.template_type = i.join(",")
        } else
            o.template_type = i;
        var d = e.discoveryData
          , c = JSON.stringify(d);
        c = c.substring(0, Math.min(c.length, 1e3)),
        o.api_response = c,
        this.writeRecord(n, "errorlogs", o)
    },
    getDiscoveryCommonData: function(e) {
        var t = {};
        if (PopIn5.$F.notEmpty(e.context)) {
            var n = e.context
              , o = e.config
              , i = n.discoveryData || {}
              , a = i.common_category
              , r = PopIn5.$F.notEmpty(a) ? PopIn5.$F.isArray(a) ? a[0] : a : ""
              , s = PopIn5.$F.parseUri(n.configs.discovery.apiUrl).host.replace("discoveryplus.", "jp.")
              , d = PopIn5.$F.notEmpty(n.configs.discovery.segmentData.abtest) ? n.configs.discovery.segmentData.abtest : ""
              , c = PopIn5.$F.notEmpty(o.channelId) ? "m_ch_" + o.channelId : "";
            t = {
                device: PopIn5.$F.isMobileDevice() ? "mobile" : "pc",
                url: n.target,
                common_category: r,
                category: i.category,
                domain: location.host,
                media: PopIn5.Discovery.Global.media,
                api_host: s,
                abtest: d,
                extra: c,
                popin_user_id: PopIn5.$.UserId.getUid()
            },
            i.rid && (t.rid = i.rid)
        }
        return PopIn5.$F.notEmpty(e.logger) && void 0 !== e.logger.getTrackValues && (t.td_client_id = e.logger.getTrackValues().td_client_id),
        t
    },
    discoverySelector: function(e, t) {
        var n = this.getLogger(e)
          , o = this.getDiscoveryCommonData({
            logger: n,
            context: e,
            config: t
        })
          , i = {
            r_url: "",
            type: 9
        };
        i = PopIn5.$F.join(o, i),
        this.uniqueTreasureLog(["type=" + i.device + "_selector", "url=" + i.url], n, i)
    },
    discoveryPreviewData: function(e) {
        var t = this.getLogger(e.context)
          , n = this.getDiscoveryCommonData({
            logger: t,
            context: e.context,
            config: e._config
        })
          , o = {
            r_url: "",
            type: 0
        };
        o = PopIn5.$F.join(n, o),
        this.uniqueTreasureLog(["type=" + o.device + "_pv", "url=" + o.url], t, o);
        var i = PopIn5.$F.join({
            url: e.context.target
        }, o);
        this.newSpecialLogForType0(["type=" + o.device + "_pv", "url=" + o.url], t, i)
    },
    discoveryInviewLog: function(e) {
        var t = this.getLogger(e.context)
          , n = this.getDiscoveryCommonData({
            logger: t,
            context: e.context,
            config: e._config
        })
          , o = {
            r_url: "",
            type: 3
        };
        o = PopIn5.$F.join(n, o),
        this.writeRecord(t, "discoverylogs", o);
        for (var i = e.data, a = 0, r = 0, s = e._config.infiniteSize * e._config.pages; r < s && a < 3; r++) {
            var d = i[r];
            if (d.type.indexOf("ad") < 0) {
                var c = {
                    r_url: d.url,
                    extra: PopIn5.$F.notEmpty(d.channelId) ? "m_ch_" + d.channelId : "",
                    abtest: d.abtest,
                    type: 1,
                    recommend_type: d.type,
                    logid: PopIn5.$.Global.logid
                };
                PopIn5.$F.notEmpty(d.RecallRefer) && (c.recall_refer = d.RecallRefer),
                c = PopIn5.$F.join(n, c),
                this.writeRecord(t, "discoverylogs", c);
                var p = PopIn5.$F.join({
                    url: e.context.target
                }, c);
                this.newSpecialLog(p, t, d, "imp"),
                a++
            }
        }
    },
    discoveryClickLog: function(e) {
        var t = this.getLogger(e.context)
          , n = this.getDiscoveryCommonData({
            logger: t,
            context: e.context,
            config: e._config
        })
          , o = {
            r_url: e.item.url,
            extra: PopIn5.$F.notEmpty(e.item.channelId) ? "m_ch_" + e.item.channelId : "",
            abtest: e.item.abtest,
            type: 2,
            recommend_type: e.item.type,
            recommend_position: e.item.renderPosition,
            logid: PopIn5.$.Global.logid
        };
        o = PopIn5.$F.join(n, o),
        PopIn5.$F.notEmpty(e.item.RecallRefer) && (o.recall_refer = e.item.RecallRefer),
        this.writeRecord(t, "discoverylogs", o);
        var i = PopIn5.$F.join({
            url: e.context.target
        }, o);
        this.newSpecialLog(i, t, e.item, "click")
    },
    discoveryAdsImpressionLog: function(e) {
        var t = this.getLogger(e.context)
          , n = this.getDiscoveryCommonData({
            logger: t,
            context: e.context,
            config: e._config
        })
          , o = {
            r_url: "",
            type: 4
        };
        o = PopIn5.$F.join(n, o),
        this.writeRecord(t, "discoverylogs", o)
    },
    discoveryMediaDnaLog: function(e, t) {
        var n = this.getLogger(e)
          , o = PopIn5.$F.notEmpty(e.configs) && PopIn5.$F.notEmpty(e.configs.discovery) ? e.configs.discovery : {}
          , i = this.getDiscoveryCommonData({
            logger: n,
            context: e,
            config: o
        })
          , a = {
            time: Date.now(),
            campaign_id: t.campaign
        };
        a = PopIn5.$F.join(i, a);
        try {
            var r = n.getTrackValues()
              , s = {};
            for (var d in r)
                s[d] = r[d];
            a = PopIn5.$F.join(s, a)
        } catch (e) {}
        this.writeRecord(n, "mediadna_clicks", a)
    },
    discoveryConcatnationPVLog: function(e) {
        if (void 0 !== window._popIn_concatenation_param) {
            var t = this.getLogger(e)
              , n = window._popIn_concatenation_param
              , o = {
                user_id: n.user_id,
                useragent_popin: n.useragent,
                timestamp: Date.now()
            };
            this.isLogExsists(this.history, "concatnation_pv") || (this.history.push("concatnation_pv"),
            this.writeRecord(t, "pageview_concatenation", o))
        }
    },
    discoveryVideoMediaLog: function(e, t) {
        var n = this.getLogger(e)
          , o = PopIn5.$F.notEmpty(e.configs) && PopIn5.$F.notEmpty(e.configs.discovery) ? e.configs.discovery : {}
          , i = this.getDiscoveryCommonData({
            logger: n,
            context: e,
            config: o
        })
          , a = {
            time: Date.now(),
            campaign_id: t.campaign
        };
        a = PopIn5.$F.join(i, a);
        try {
            var r = n.getTrackValues()
              , s = {};
            for (var d in r)
                s[d] = r[d];
            a = PopIn5.$F.join(s, a)
        } catch (e) {}
        this.writeRecord(n, "mediadna_clicks", a)
    },
    uniqueTreasureLog: function(e, t, n) {
        this.isLogExsists(this.history, e) || (this.history.push(e.join("")),
        this.writeRecord(t, "discoverylogs", n))
    },
    writeRecord: function(e, t, n) {
        PopIn5.$F.notEmpty(e.context) && PopIn5.$F.notEmpty(e.context.discoveryData) && (n.date = e.context.discoveryData.time),
        PopIn5.$.Treasure.writeRecord(e._logger, t, n)
    },
    updateBrowserInfo: function(e) {
        for (var t = ["td_browser", "td_browser_version", "td_os", "td_os_version"], n = 0, o = t.length; n < o; n++) {
            var i = t[n]
              , a = i.replace(/td_/, "");
            PopIn5.$F.notEmpty(e[i]) && PopIn5.$F.notEmpty(this.uainfo[a]) && (e[i] = this.uainfo[a])
        }
        return e
    },
    writeSpecialLog: function(e, t) {
        e.popin_user_id = PopIn5.$.UserId.getUid();
        var n = JSON.stringify(e)
          , o = btoa(unescape(encodeURIComponent(n)));
        PopIn5.$.Log.log(t + o)
    },
    newSpecialLog: function(e, t, n, o) {
        function i(e) {
            for (var t = e.split("."), n = [], o = t.pop(); t.length > 0 && "www" != o && (n.push(o),
            !(o.length > 3 && n.length > 0)); o = t.pop())
                ;
            return n.reverse().join(".")
        }
        try {
            var a = t.getTrackValues()
              , r = {};
            for (var s in a)
                r[s] = a[s];
            (r = this.updateBrowserInfo(r)).api_host = location.host,
            r.type = o,
            r.key = "key" + PopIn5.Loader.timeStart,
            r.url = e.url,
            r.now = Date.now(),
            r.dish_common_category = e.common_category,
            r.dish_domain = i(location.host),
            r.dish_td_title = "",
            r.dish_pubdate = "",
            r.dish_category = "",
            r.dish_td_url = e.url,
            r.dish_media = e.media;
            var d = n.originalUrl;
            r.fruit_common_category = "",
            r.fruit_domain = i(PopIn5.$F.parseUri(d).host),
            r.fruit_td_title = n.title,
            r.fruit_title = n.originalTitle,
            r.fruit_pubdate = n.pubdate,
            r.fruit_category = n.category,
            r.fruit_td_url = d,
            r.fruit_media = n.media,
            r.fruit_image = n.image,
            r.image_hash = n.imageHash,
            r.fruit_recommend_position = n.renderPosition,
            PopIn5.$F.notEmpty(n.RecallRefer) && (r.fruit_recommend_type = n.RecallRefer),
            r.logid = t.context.discoveryData.logid,
            this.writeSpecialLog(r, "//inrecsys.popin.cc/PopinService/Logs/discovery?data=")
        } catch (e) {}
    },
    newSpecialLogForType0: function(e, t, n) {
        if (!this.isLogExsists(this.specialLogHistory, e)) {
            this.specialLogHistory.push(e.join(""));
            try {
                var o = t.getTrackValues()
                  , i = {};
                for (var a in o)
                    i[a] = o[a];
                (i = this.updateBrowserInfo(i)).now = Date.now(),
                i.key = "key" + PopIn5.Loader.timeStart,
                i.domain = location.host,
                i.client_id = o.td_client_id,
                i.url = n.url || "",
                i.logid = t.context.discoveryData.logid,
                this.writeSpecialLog(i, "//inrecsys.popin.cc/PopinService/Logs/other?data=")
            } catch (e) {}
        }
    },
    newSpecialLogForAd: function(e, t, n) {
        try {
            var o = {};
            o.now = Date.now(),
            o.key = "key" + PopIn5.Loader.timeStart;
            for (var i in t)
                o[i] = t[i];
            var a = e.getTrackValues();
            for (var r in a)
                o[r] = a[r];
            (o = this.updateBrowserInfo(o)).client_id = a.td_client_id;
            var s = PopIn5.$F.parseUrl(location.href);
            o.token = s.qString.token;
            var d = e.context.discoveryData.ad;
            d && d.length && (o.ad_total = d.length,
            o.ad_index = d.indexOf(n)),
            o.ad_position = ++this.adPosition,
            o.ad_request_origin = "web",
            n.abtest && (o.abtest = n.abtest),
            o.logid = e.context.discoveryData.logid,
            n.c1 && (o.c1 = n.c1),
            n.c2 && (o.c2 = n.c2),
            n.c3 && (o.c3 = n.c3),
            this.writeSpecialLog(o, "//inrecsys.popin.cc/PopinService/Logs/ad?data=")
        } catch (e) {}
    }
}),
function() {
    function e() {
        return L = !0,
        i(E, h()),
        [p(8), p(4), p(4), p(3), h()].join("")
    }
    function t(e) {
        var t, n = location.host.split("."), o = n.length - 2;
        do {
            if (t = "." + n.slice(o).join("."),
            PopIn5.Cookie.setCookie(F, k, {
                domain: t
            }),
            PopIn5.Cookie.setCookie(F, k, {
                expires: 365,
                domain: t,
                path: "/"
            }),
            PopIn5.Cookie.getCookie(F) === e)
                break
        } while (--o >= 0)
    }
    function n(e) {
        return x.test(e) ? e : C === e && e
    }
    function o(e) {
        i(b, e),
        t(e)
    }
    function i(e, t) {
        try {
            return localStorage.setItem(e, t),
            !0
        } catch (e) {
            return !1
        }
    }
    function a(e) {
        try {
            return localStorage.getItem(e)
        } catch (e) {
            return ""
        }
    }
    function r(e) {
        try {
            return localStorage.removeItem(e)
        } catch (e) {
            return ""
        }
    }
    function s() {
        function e(t) {
            try {
                if ($.window !== t.source)
                    return;
                var n = JSON.parse(t.data);
                "get" === n.action ? c(n.payload) : "done" === n.action && (window.removeEventListener("message", e),
                $.parentNode && $.parentNode.removeChild($),
                $ = null)
            } catch (e) {
                u(e)
            }
        }
        PopIn5.$.Config ? /.+_sdk$/.test(PopIn5.$.Config.pid) || ($ = f(y),
        window.addEventListener("message", e, !1)) : setTimeout(s, 1)
    }
    function d(e) {
        P.test(e) && $.window.postMessage(JSON.stringify({
            action: "setId",
            payload: e
        }), _)
    }
    function c(e) {
        if ("string" == typeof e && P.test(e)) {
            if (w)
                return m = e.split("-")[0],
                i(I, e),
                void (w = !1);
            if (e !== v) {
                var t = e.split("-")
                  , n = v.split("-");
                if (n[1] >= t[1])
                    return m = t[0],
                    i(I, e),
                    void (t[0] !== n[0] && a(I) === e && g({
                        previous_id: n[0],
                        previous_create_time: n[1],
                        current_id: t[0],
                        current_create_time: t[1],
                        host: top.location.host
                    }));
                d(v)
            }
        } else
            d(v)
    }
    function p(e) {
        var t = parseInt(Math.floor(Math.random() * Math.pow(16, e))).toString(16);
        return ("" + Math.pow(10, e) + t).slice(-e)
    }
    function l() {
        return [p(8), p(4), p(4), p(4), p(12)].join("") + "-" + h()
    }
    function h() {
        var e = new Date;
        return e.setMinutes(e.getMinutes() + e.getTimezoneOffset()),
        e.getTime()
    }
    function g(e) {
        window.Treasure2 ? new window.Treasure2({
            writeKey: "8378/25839e06ce4cc1cab55c1c1f1e49d336d6d1d48f",
            database: "popin_user_id"
        }).addRecord("uid_change_log", e) : setTimeout(function() {
            g(e)
        }, 1e3)
    }
    function u(e) {
        window.Treasure2 ? new window.Treasure2({
            writeKey: "8378/25839e06ce4cc1cab55c1c1f1e49d336d6d1d48f",
            database: "fe_monitor"
        }).addRecord("err_log", {
            msg: e.message || "",
            stack: e.stack || "",
            name: e.name || "",
            ua: navigator.userAgent
        }) : setTimeout(function() {
            u(e)
        }, 1e3)
    }
    function f(e, t) {
        e = e || "about:self";
        var n = void 0 !== (t = t || {}).pnode && void 0 !== t.pnode.nodeValue ? t.pnode : document.body
          , o = PopIn5.$F.ce(n, "iframe");
        o.src = e,
        o.setAttribute("scrolling", "no"),
        o.setAttribute("frameBorder", "0"),
        o.setAttribute("allowTransparency", "true"),
        function(e) {
            e.display = "block",
            e.width = "0px",
            e.height = "0px",
            e.margin = "0px",
            e.padding = "0px",
            e.overflow = "none"
        }(o.style);
        var i = {
            element: o,
            document: o.contentDocument || o.contentWindow.document,
            window: o.contentWindow ? o.contentWindow : o.contentDocument.document ? o.contentDocument.document : o.contentDocument,
            write: function(e) {
                i.document.open(),
                i.document.write(e),
                i.document.close()
            }
        };
        return i
    }
    var m = ""
      , v = ""
      , I = "__pi_u_id__"
      , P = /^([\d\w]{32})|(\d{13})-\d+$/
      , _ = "https://api.popin.cc"
      , y = _ + "/iframe/piuid.html?ac=piuid&t=15009898"
      , $ = null
      , w = !1
      , b = "_ss_pp_id"
      , F = "_ss_pp_id"
      , x = /^[\d\w]{32}|\d{13}$/
      , C = "OPT_OUT"
      , E = "uid_gen_time"
      , L = !1
      , k = "";
    o(k = n(PopIn5.Cookie.getCookie(F)) || n(a(b)) || e()),
    PopIn5.StaticClass("$", "UserId", {
        init: function() {
            try {
                if ("object" == typeof window.PopIn6 || window.PopIn && 8 === window.PopIn.VERSION)
                    return;
                PopIn5.$.Global.event.addEventListener("result-loaded", function(e) {
                    try {
                        var t = JSON.parse(window.atob(e.cdata))
                          , n = "OPT_OUT" === m && m !== t.uid
                          , o = w || "OPT_OUT" === t.uid || n;
                        t && t.uid && o && (m = t.uid,
                        v = m,
                        "OPT_OUT" !== t.uid && (v = v + "-" + h()),
                        i(I, v))
                    } catch (e) {}
                }),
                "function" == typeof window.postMessage && s(),
                v = a(I) || "";
                var e = a("_ss_pp_id") || "";
                if (P.test(v) || "OPT_OUT" === v)
                    return void (m = v.split("-")[0]);
                if (r(I),
                /^([\da-f]{32})|(\d{13})$/.test(e))
                    return m = e,
                    v = e + "-" + h(),
                    i(I, v),
                    void (w = !0);
                r("_ss_pp_id"),
                v = l(),
                m = v.split("-")[0],
                i(I, v),
                w = !0
            } catch (e) {
                u(e)
            }
        },
        getUid: function() {
            return m
        },
        getLib6Uid: function() {
            return k
        },
        setLib6Uid: function(e) {
            n(e) && o(k = e)
        }
    })
}(),
new PopIn5.Class("Discovery","Video2",{
    init: function(e, t, n, o) {
        this.config = e,
        this.context = t,
        this.container = n,
        this.data = o;
        this.render()
    },
    render: function() {
        this.renderHeader(),
        this.renderCanvas(),
        this.renderFooter(),
        this.addEvents(),
        this.calendar = new PopIn5.Discovery.Video2Calendar(this),
        this.share = new PopIn5.Discovery.Video2Share(this)
    },
    renderHeader: function() {
        var e = PopIn5.$F.ce(this.container, "div");
        PopIn5.$F.addClass(e, "_popIn_video_title"),
        PopIn5.$F.css(e, {
            "white-space": "nowrap",
            padding: "5px 2px",
            "font-size": "14px",
            "background-color": "#ffffff"
        });
        var t = PopIn5.$F.ce(e, "span", "PR");
        PopIn5.$F.addClass(t, "_popIn_video_pr"),
        PopIn5.$F.css(t, {
            color: "#ffffff",
            "font-size": "12px",
            "border-radius": "3px",
            padding: "3px 4px",
            "z-index": 98,
            "background-color": "rgb(239, 196, 57)"
        });
        var n = PopIn5.$F.ce(e, "span", this.data.title);
        PopIn5.$F.addClass(n, "_popIn_video_title_inner"),
        PopIn5.$F.css(n, {
            "text-align": "left",
            "font-size": "14px",
            "font-weight": "bolder",
            color: "rgb(0, 0, 0)",
            "margin-left": "7px",
            "line-height": "18px",
            "text-overflow": "ellipsis",
            overflow: "hidden",
            "white-space": "nowrap",
            width: "80%",
            display: "inline-block",
            "vertical-align": "middle"
        })
    },
    renderCanvas: function() {
        var e = PopIn5.$F.ce(this.container, "div");
        if (PopIn5.$F.css(e, {
            position: "relative",
            padding: "0px"
        }),
        PopIn5.$F.notEmpty(this.data.background)) {
            var t = function() {
                var t = PopIn5.$F.getWindowWidth() > PopIn5.$F.getWindowHeight() ? "30%" : "10%";
                PopIn5.$F.css(e, {
                    padding: "0px " + t + " 0px " + t
                })
            };
            window.addEventListener("orientationchange", t, !1),
            window.addEventListener("resize", t, !1),
            t();
            var n = PopIn5.$F.ce(e, "div");
            PopIn5.$F.css(n, {
                position: "absolute",
                left: "0px",
                right: "0px",
                top: "0px",
                bottom: "0px",
                background: "url(" + this.data.background + ") no-repeat top center ",
                "background-size": "cover",
                "-webkit-filter": "brightness(150%) blur(5px)"
            })
        }
        this.canvasContainer = e;
        var o = PopIn5.$F.ce(e, "div");
        PopIn5.$F.addClass(o, "_popIn_video_box"),
        PopIn5.$F.css(o, {
            position: "relative"
        }),
        this.videoCanvas = new PopIn5.Discovery.Video2Canvas(this.config,this.context,o,this.data),
        this.videoCanvasClick = new PopIn5.Discovery.Video2CanvasClick(this.videoCanvas);
        var i = !(!PopIn5.$F.notEmpty(this.data.videoObj.type) || "vast" !== this.data.videoObj.type);
        this.videoCanvasEnd = new PopIn5.Discovery.Video2CanvasEnd(this.videoCanvas,i)
    },
    renderFooter: function() {
        var e = this
          , t = PopIn5.$F.ce(this.container, "div")
          , n = PopIn5.$F.ce(t, "div", "ads by popIn");
        PopIn5.$F.addClass(n, "_popIn_video_powered"),
        function(e) {
            e.textAlign = "right",
            e.marginTop = "3px",
            e.fontSize = "12px",
            e.padding = "0px 5px 0px 0px",
            e.fontFamily = "sans-serif;",
            e.color = "#ccc"
        }(n.style);
        var o = PopIn5.$F.ce(t, "div", this.data.description);
        PopIn5.$F.addClass(o, "_popIn_video_desc"),
        PopIn5.$F.css(o, {
            "text-align": "left",
            "font-size": "14px",
            "font-weight": "normal",
            color: "#000000",
            "line-height": "18px",
            padding: "7px",
            "white-space": "normal"
        });
        var i = PopIn5.$F.ce(t, "div");
        PopIn5.$F.addClass(i, "_popIn_video_counter"),
        PopIn5.$F.css(i, {
            float: "left",
            margin: "4px 0px 5px 5px",
            "text-align": "left",
            "font-size": "12px",
            "font-family": "sans-serif",
            "font-weight": "bolder",
            color: "rgb(103, 107, 118)"
        }),
        this.counterDiv = i,
        this.updateCounter();
        var a = null;
        !(!PopIn5.$F.notEmpty(this.data.videoObj.type) || "vast" !== this.data.videoObj.type) || ((a = PopIn5.$F.ce(t, "a", PopIn5.$F.notEmpty(this.data.detailMessage) ? this.data.detailMessage : PopIn5.$.Language.getMessage("video_button_detail"))).href = this.data.linkUrl,
        a.target = "_blank",
        PopIn5.$F.addClass(a, "_popIn_video_moreButton"),
        PopIn5.$F.css(a, {
            float: "right",
            margin: "0px 5px 5px 0px",
            "text-decoration": "none",
            color: "rgb(51, 51, 51)",
            border: "1px solid rgb(204, 204, 204)",
            "font-size": "12px",
            "font-weight": "bold",
            "font-family": "sans-serif",
            padding: "2px 3px",
            "text-align": "center",
            "border-radius": "5px",
            background: "-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(255, 255, 255)), to(rgb(235, 235, 235))) rgb(238, 238, 238)"
        }),
        PopIn5.$F.bind(a, "click", function() {
            PopIn5.Discovery.Video2Log.link(e)
        })),
        PopIn5.$F.css(PopIn5.$F.ce(t, "div"), {
            clear: "both"
        })
    },
    increaseCounter: function() {
        this.counterCommand("imp")
    },
    updateCounter: function() {
        this.counterCommand("info")
    },
    counterCommand: function(e) {
        var t = PopIn5.$.Global.protocol + "//discoveryplus.popin.cc/popin_discovery/video?op=" + e + "&video=" + this.data.nid + "&t=" + (new Date).getTime()
          , n = this;
        PopIn5.$F.ajax(t, function(e) {
            var t = PopIn5.$F.notEmpty(e) && PopIn5.$F.notEmpty(e.imp) ? e.imp : "0";
            n.setCounterNumber(t)
        })
    },
    setCounterNumber: function(e) {
        this.counterDiv.textContent = PopIn5.$.Language.getMessage("video_counter_before") + function(e) {
            for (var t = String(e).replace(/,/g, ""); t != (t = t.replace(/^(-?\d+)(\d{3})/, "$1,$2")); )
                ;
            return t
        }(e) + PopIn5.$.Language.getMessage("video_counter_after")
    },
    addEvents: function() {
        var e = this;
        this.videoCanvas.addEventListener("inview", function() {
            PopIn5.$.Log.log("https://rlog.popin.cc/s.gif?url=" + location.host + "&uid=&type=paid_video_INVIEW&t=" + Date.now())
        }),
        this.videoCanvas.addEventListener("twoSeconds", function() {
            e.increaseCounter(),
            e.saveHistory(),
            PopIn5.Discovery.Video2Log.imp(e),
            PopIn5.Discovery.Video2Log.twoSeconds(e)
        }),
        this.videoCanvas.addEventListener("threeSeconds", function() {
            PopIn5.Discovery.Video2Log.threeSeconds(e)
        }),
        this.videoCanvas.addEventListener("playTimeSeconds", function() {
            PopIn5.Discovery.Video2Log.playTimeSeconds(e)
        }),
        this.videoCanvas.addEventListener("percent", function(t) {
            for (var n = [25, 50, 75, 95, 100], o = 0; o < n.length; o++)
                n[o] == t && PopIn5.Discovery.Video2Log.percent(e, "" + t)
        }),
        this.videoCanvas.addEventListener("click", function() {
            PopIn5.Discovery.Video2Log.full(this)
        })
    },
    saveHistory: function() {
        var e = PopIn5.$F.ssGet("_video");
        PopIn5.$F.notEmpty(e) ? e += "." + this.data.nid : e = this.data.nid,
        PopIn5.$F.ssSet("_video", e)
    }
}),
new PopIn5.Class("Discovery","Video2Calendar",{
    init: function(e) {
        if (this.video = e,
        !PopIn5.$F.isEmpty(e.data.calendar)) {
            var t = e.container.querySelector("._popIn_video_moreButton");
            t.style.display = "none";
            var n = document.createElement("div");
            n.appendChild(document.createTextNode(PopIn5.$.Language.getMessage("video_button_calendar"))),
            t.parentNode.insertBefore(n, t),
            PopIn5.$F.addClass(n, "_popIn_video_moreButton"),
            PopIn5.$F.css(n, {
                float: "right",
                "background-color": "#fff",
                border: "1px solid",
                "border-color": "#e5e6e9 #dfe0e4 #d0d1d5",
                padding: "5px 5px 5px 30px",
                margin: "0px 10px 5px 0px",
                "-webkit-border-radius": "3px",
                "border-radius": "3px",
                cursor: "pointer",
                "font-size": "12px",
                "-webkit-font-smoothing": "antialiased!important",
                "text-shadow": "1px 1px 1px rgba(0,0,0,0.004)",
                "-webkit-touch-callout": "none",
                "-webkit-user-select": "none",
                "-khtml-user-select": "none",
                "-moz-user-select": "none",
                "-ms-user-select": "none",
                "user-select": "none",
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                background: "url(https://addevent.com/gfx/icon-calendar-t5.png) no-repeat 7px"
            });
            var o = this;
            PopIn5.$F.bind(n, "click", function() {
                o.clickCalendar()
            });
            var i = this.video.videoCanvasEnd
              , a = i.videoCanvasEnded;
            i.videoCanvasEnded = function() {
                a.apply(this, arguments),
                o.addEndButton()
            }
        }
    },
    addEndButton: function() {
        var e = this.video.container.querySelector("._popIn_video_end_table");
        e.querySelector("._popIn_video_end_detailRow").style.display = "none";
        var t = PopIn5.$F.ce(e, "div");
        PopIn5.$F.addClass(t, "_popIn_video_end_detailRow"),
        PopIn5.$F.css(t, {
            display: "table-row",
            height: "50%"
        });
        var n = PopIn5.$F.ce(t, "div", PopIn5.$.Language.getMessage("video_button_calendar"));
        PopIn5.$F.addClass(n, "_popIn_video_end_detailCell _popIn_video_end_detailLink"),
        PopIn5.$F.css(n, {
            display: "table-cell",
            "text-align": "left",
            "vertical-align": "middle",
            color: "white",
            background: "url(https://imageaws.popin.cc/videos/lp.png) no-repeat left",
            "padding-left": "80px"
        });
        var o = this;
        PopIn5.$F.bind(t, "click", function() {
            o.clickCalendar()
        })
    },
    clickCalendar: function() {
        var e = this.video.data.calendar
          , t = e.start.split(" ")
          , n = e.end.split(" ");
        t.length > 0 && (e.start = t[0]),
        t.length > 1 && (e.starttime = t[1]),
        t.length > 2 && (e.startext = t[2]),
        n.length > 0 && (e.end = n[0]),
        n.length > 1 && (e.endtime = n[1]),
        n.length > 2 && (e.endext = n[2]),
        PopIn5.$F.isiPhone ? e.service = "iCalendar" : e.service = "google";
        var o = ["https://addevent.com/dir/", "?client=aDoyjOXdmzdeHwNStmZG11131"];
        for (var i in e)
            o.push("&" + i + "=" + encodeURIComponent(e[i]));
        window.open(o.join("")),
        PopIn5.Discovery.Video2Log.calendar(this.video)
    }
}),
new PopIn5.Class("Discovery","Video2Canvas",{
    init: function(e, t, n, o) {
        this.config = e,
        this.context = t,
        this.container = n,
        this.data = o,
        this.shown = !1;
        var i = this;
        if (PopIn5.$F.makeListener(this),
        "undefined" == typeof video_jsv) {
            window.jsv_config = {
                bufferSec: 5,
                chunkSize: 1e6,
                doNotPatchCreateElement: !0
            };
            var a = document.createElement("script");
            a.type = "text/javascript",
            a.charset = "utf-8",
            a.async = !0,
            a.onload = function() {
                i.load()
            }
            ,
            a.src = PopIn5.$.Global.protocol + "//api.popin.cc/popin_video_ads-min.js";
            var r = document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(a, r)
        } else
            this.load()
    },
    load: function() {
        var e = this
          , t = new video_jsv;
        this.container.appendChild(t),
        t.setAttribute("preload", "auto"),
        t.setAttribute("data-audio", ""),
        t.style.width = "100%",
        t.style.fontSize = "0px",
        t.setAttribute("src", this.data.url),
        t.addEventListener("canplay", function() {
            e.autoScroll()
        });
        var n = PopIn5.$F.ce(this.container, "div");
        PopIn5.$F.css(n, {
            position: "absolute",
            display: "none",
            bottom: "0px",
            right: "0px",
            width: "60px",
            height: "60px",
            "---background": "url(https://i.popincdn.com/videos/animat-audio-color.gif)",
            "background-size": "60px 60px"
        });
        var o = PopIn5.$F.ce(this.container, "div");
        PopIn5.$F.css(o, {
            position: "absolute",
            display: "none",
            bottom: "-4px",
            left: "0px",
            right: "0px",
            width: "100%",
            height: "4px",
            "background-color": "white"
        });
        var i = PopIn5.$F.ce(o, "div");
        PopIn5.$F.css(i, {
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "0%",
            height: "4px",
            "background-color": "#295ED4"
        }),
        this.player = t,
        this.status = 0,
        PopIn5.$F.bind(t, "ended", function() {
            e.fireEvent("percent", [100]),
            n.style.display = "none",
            o.style.display = "none",
            e.fireEvent("ended", []),
            e.status = 2
        }),
        PopIn5.$F.bind(t, "click", function() {
            e.fireEvent("click", [])
        });
        var a = 0
          , r = 0;
        PopIn5.$F.bind(t, "timeupdate", function() {
            n.style.display = "block",
            o.style.display = "block";
            var s = t.currentTime;
            if (e.currentTime = s,
            a < 1 && s >= 1 && e.fireEvent("oneSecond", []),
            a < 2 && s >= 2 && e.fireEvent("twoSeconds", []),
            a < 3 && s >= 3 && e.fireEvent("threeSeconds", []),
            PopIn5.$F.notEmpty(e.data.play_time_seconds)) {
                var d = parseInt(e.data.play_time_seconds);
                a < d && s >= d && e.fireEvent("playTimeSeconds", [])
            }
            var c = Math.round(t.currentTime / t.duration * 100);
            i.style.width = c + "%",
            (c = 5 * Math.floor(c / 5)) > r && c < 100 && e.fireEvent("percent", [c]),
            a = s,
            r = c
        })
    },
    resume: function() {
        this.status < 2 && (this.status = 1,
        this.player.play())
    },
    resumeAt: function(e) {
        this.status = 1,
        this.player.currentTime = e,
        this.player.play()
    },
    replay: function() {
        this.player.currentTime = 0,
        this.status = 1,
        this.player.play()
    },
    stop: function() {
        this.status = 0,
        this.player.pause()
    },
    autoScroll: function() {
        var e = this;
        this.scrollInterval = setInterval(function() {
            e.checkScroll()
        }, 1e3),
        this.checkScroll()
    },
    checkScroll: function() {
        var e = PopIn5.$F.getWindowHeight()
          , t = PopIn5.$F.pageScrollTop()
          , n = PopIn5.$F.position(this.player).top + PopIn5.$F.size(this.player).height / 2
          , o = n > t && n < t + e;
        !this.shown && o && (this.shown = !0,
        this.fireEvent("inview", [])),
        0 === this.status && o ? this.resume() : 1 != this.status || o || this.stop()
    }
}),
new PopIn5.Class("Discovery","Video2CanvasClick",{
    init: function(e) {
        var t = this;
        this.videoCanvas = e,
        this.videoCanvas.addEventListener("click", function() {
            t.handleCanvasClick()
        })
    },
    handleCanvasClick: function() {
        var e = PopIn5.$F.ce(document.body, "div");
        PopIn5.$F.css(e, {
            position: "fixed",
            top: "0px",
            left: "0px",
            "background-color": "black",
            width: "100%",
            height: "100%",
            "z-index": 9999
        });
        var t = PopIn5.$F.ce(e, "div");
        PopIn5.$F.css(t, {
            position: "absolute",
            bottom: "20px",
            right: "20px",
            width: "64px",
            height: "64px",
            background: "url(//imageaws.popin.cc/videos/Close-icon.png) no-repeat center",
            "background-size": "cover",
            "z-index": 1e4
        });
        var n = PopIn5.$F.ce(e, "video");
        PopIn5.$F.css(n, {
            position: "absolute",
            width: "100%",
            height: "100%"
        });
        var o = this.videoCanvas.data.video
          , i = PopIn5.$F.ce(n, "source");
        i.src = o,
        i.type = "video/mp4";
        this.videoCanvas.currentTime;
        n.setAttribute("autoplay", "autoplay"),
        n.setAttribute("controls", "controls"),
        n.load(),
        n.play();
        var a = function() {
            PopIn5.$F.remove(e)
        };
        e.addEventListener("click", function(e) {
            a()
        }),
        n.addEventListener("webkitendfullscreen", function() {
            a()
        }),
        n.addEventListener("ended", function() {
            a()
        })
    }
}),
new PopIn5.Class("Discovery","Video2CanvasEnd",{
    init: function(e, t) {
        var n = this;
        this.videoCanvas = e,
        this.isVast = t,
        this.videoCanvas.addEventListener("ended", function() {
            n.videoCanvasEnded()
        })
    },
    videoCanvasEnded: function() {
        var e = this
          , t = this.videoCanvas.container
          , n = PopIn5.$F.ce(t, "div");
        PopIn5.$F.addClass(n, "_popIn_video_end_outerContainer"),
        PopIn5.$F.css(n, {
            "background-color": "black",
            position: "absolute",
            top: "0px",
            left: "0px",
            right: "0px",
            height: "100%",
            "text-align": "center",
            color: "white",
            "z-index": 99,
            transition: "opacity 0.5s ease-in",
            opacity: 0
        });
        var o = PopIn5.$F.ce(t, "div");
        PopIn5.$F.addClass(o, "_popIn_video_end_innerContainer"),
        PopIn5.$F.css(o, {
            "font-size": "16px",
            position: "absolute",
            left: "0px",
            right: "0px",
            height: "110px",
            top: "50%",
            "margin-top": "-55px",
            "text-align": "center",
            "z-index": 100
        });
        var i = PopIn5.$F.ce(o, "div");
        PopIn5.$F.addClass(i, "_popIn_video_end_table"),
        PopIn5.$F.css(i, {
            display: "table",
            height: "100%",
            margin: "0px auto"
        });
        var a = PopIn5.$F.ce(i, "div");
        PopIn5.$F.addClass(a, "_popIn_video_end_replayRow"),
        PopIn5.$F.css(a, {
            display: "table-row",
            height: "50%"
        });
        var r = PopIn5.$F.ce(a, "div", PopIn5.$.Language.getMessage("video_end_replay"));
        if (PopIn5.$F.addClass(r, "_popIn_video_end_replayCell"),
        PopIn5.$F.css(r, {
            display: "table-cell",
            "text-align": "left",
            "vertical-align": "middle",
            "padding-left": "80px",
            color: "white",
            background: "url(https://imageaws.popin.cc/videos/play.png) no-repeat left"
        }),
        PopIn5.$F.bind(a, "click", function() {
            return PopIn5.$F.remove(n),
            PopIn5.$F.remove(o),
            e.replayClick(),
            !1
        }),
        !this.isVast) {
            var s = PopIn5.$F.ce(i, "div");
            PopIn5.$F.addClass(s, "_popIn_video_end_detailRow"),
            PopIn5.$F.css(s, {
                display: "table-row",
                height: "50%"
            });
            var d = PopIn5.$F.ce(s, "div", PopIn5.$F.notEmpty(this.videoCanvas.data.detailMessage) ? this.videoCanvas.data.detailMessage : PopIn5.$.Language.getMessage("video_end_detail"));
            PopIn5.$F.addClass(d, "_popIn_video_end_detailCell _popIn_video_end_detailLink"),
            PopIn5.$F.css(d, {
                display: "table-cell",
                "text-align": "left",
                "vertical-align": "middle",
                color: "white",
                background: "url(https://imageaws.popin.cc/videos/lp.png) no-repeat left",
                "padding-left": "80px"
            }),
            PopIn5.$F.bind(s, "click", function() {
                return e.detailClick(),
                !1
            })
        }
        setTimeout(function() {
            PopIn5.$F.cssSet(n, "opacity", "0.4")
        }, 1)
    },
    replayClick: function() {
        this.videoCanvas.replay()
    },
    detailClick: function() {
        window.open(this.videoCanvas.data.linkUrl),
        PopIn5.Discovery.Video2Log.link(this.videoCanvas)
    }
}),
PopIn5.StaticClass("Discovery", "Video2Log", {
    init: function() {},
    percent: function(e, t) {
        this.uniqueLog(t, e)
    },
    imp: function(e) {
        this.uniqueLog("imp", e)
    },
    full: function(e) {
        this.uniqueLog("full", e)
    },
    link: function(e) {
        this.uniqueLog("link", e)
    },
    calendar: function(e) {
        this.uniqueLog("link", e),
        this.uniqueLog("calendar", e)
    },
    share: function(e, t) {
        this.uniqueLog("share-" + t, e)
    },
    twoSeconds: function(e) {
        this.uniqueLog("twoSeconds", e)
    },
    threeSeconds: function(e) {
        this.uniqueLog("threeSeconds", e)
    },
    playTimeSeconds: function(e) {
        this.uniqueLog("playTimeSeconds", e)
    },
    uniqueLog: function(e, t) {
        var n = t.data
          , o = t.config
          , i = t.context;
        PopIn5.$F.isEmpty(t._log) && (t._log = {}),
        PopIn5.$F.isEmpty(t._log[e]) && (t._log[e] = 0),
        t._log[e] > 0 || (t._log[e]++,
        PopIn5.$F.notEmpty(n.debugMode) || PopIn5.Discovery.Log.videoLog(n, e, o, i))
    }
}),
new PopIn5.Class("Discovery","Video2Share",{
    init: function(e) {
        if (this.video = e,
        !PopIn5.$F.isEmpty(e.data.share)) {
            var t = encodeURIComponent("http://share.popin.cc/getVideoDemo?popinvideotest=" + e.data.nid)
              , n = encodeURIComponent(e.data.title)
              , o = PopIn5.$F.ce(e.canvasContainer, "div")
              , i = [{
                type: "facebook",
                url: "https://m.facebook.com/sharer.php?u=" + t + "&t=" + n,
                background: "https://imageaws.popin.cc/videos/facebook.png"
            }, {
                type: "twitter",
                url: "https://twitter.com/share?url=" + t + "&text=" + n,
                background: "https://imageaws.popin.cc/videos/twitter.png"
            }, {
                type: "line",
                url: "https://line.naver.jp/R/msg/text/?" + n + t,
                background: "https://imageaws.popin.cc/videos/line.png"
            }];
            PopIn5.$F.css(o, {
                opacity: 0,
                position: "absolute",
                left: "10%",
                right: "10%",
                bottom: "0px",
                width: "80%",
                transition: "opacity 0.2s",
                "z-index": 9999
            }),
            e.videoCanvas.addEventListener("oneSecond", function() {
                o.style.opacity = 1
            });
            for (var a = this, r = 0; r < i.length; r++) {
                var s = i[r]
                  , d = PopIn5.$F.ce(o, "a");
                d.href = s.url,
                d.target = "_blank",
                PopIn5.$F.bind(d, "click", function(e, t) {
                    a.beforeClick(t)
                }, s),
                PopIn5.$F.css(d, {
                    width: "33.3%",
                    display: "inline-block",
                    height: "32px",
                    "text-align": "center",
                    "margin-bottom": "15px"
                });
                var c = PopIn5.$F.ce(d, "div");
                PopIn5.$F.css(c, {
                    display: "inline-block",
                    width: "32px",
                    height: "32px",
                    background: "url(" + s.background + ") no-repeat center",
                    "background-size": "contain"
                })
            }
            var p = this.video.videoCanvasEnd
              , l = p.videoCanvasEnded;
            p.videoCanvasEnded = function() {
                l.apply(this, arguments)
            }
        }
    },
    beforeClick: function(e) {
        PopIn5.Discovery.Video2Log.share(this.video, e.type)
    },
    addShareButton: function() {
        var e = this.video.container.querySelector("._popIn_video_end_table")
          , t = PopIn5.$F.ce(e, "div");
        PopIn5.$F.addClass(t, "_popIn_video_end_detailRow"),
        PopIn5.$F.css(t, {
            display: "table-row"
        });
        var n = PopIn5.$F.ce(t, "div", PopIn5.$.Language.getMessage("video_button_share"));
        PopIn5.$F.addClass(n, "_popIn_video_end_detailCell _popIn_video_end_detailLink"),
        PopIn5.$F.css(n, {
            display: "table-cell",
            "text-align": "left",
            "vertical-align": "middle",
            color: "white",
            background: "url(https://imageaws.popin.cc/videos/lp.png) no-repeat left",
            "padding-left": "80px"
        }),
        this.video.container.querySelector("._popIn_video_end_innerContainer").style.height = "150px";
        for (var o = this.video.container.querySelectorAll("._popIn_video_end_table > div"), i = 0; i < o.length; i++)
            o[i].style.height = 100 / o.length + "%";
        PopIn5.$F.bind(t, "click", function() {})
    }
}),
PopIn5.StaticClass("Discovery", "VideoUtils", {
    getVideo: function(e) {
        var t = [];
        if (PopIn5.$F.notEmpty(e.configs.discovery.adVideo) && PopIn5.$F.notEmpty(e.discoveryData.ad_video) && (t = t.concat(e.discoveryData.ad_video)),
        PopIn5.$F.notEmpty(e.configs.discovery.adReservedVideo) && PopIn5.$F.notEmpty(e.discoveryData.ad_reserved_video) && (t = t.concat(e.discoveryData.ad_reserved_video)),
        PopIn5.$F.isEmpty(t))
            PopIn5.$.Global.event.fireEvent("no-video", []);
        else if (PopIn5.$F.isSupportStorage()) {
            var n = PopIn5.$F.ssGet("_video");
            n = PopIn5.$F.notEmpty(n) ? n.split(".") : [];
            for (var o = 0; o < t.length; o++) {
                for (var i = t[o], a = 0, r = 0; r < n.length; r++)
                    n[r] == i.nid && a++;
                if (!(a > 1)) {
                    var s = this.getVideoFromData2(i, e);
                    if (PopIn5.$F.notEmpty(s))
                        return s
                }
            }
            PopIn5.$.Log.log("http://rlog.popin.cc/s.gif?url=" + location.host + "&uid=&type=paid_video_NG3&t=" + Date.now())
        }
    },
    getVideoFromData2: function(e, t) {
        if (PopIn5.$F.notEmpty(e.used))
            return !1;
        e.used = !0;
        var n = !!(PopIn5.$F.notEmpty(e.video.background) || PopIn5.$F.notEmpty(e.video.type) && "vertical" === e.video.type)
          , o = PopIn5.$F.parseUri(t.configs.discovery.apiUrl).host.replace("discoveryplus.", "jp.");
        return {
            calendar: e.calendar || !1,
            share: e.share,
            detailMessage: e.video.btn || !1,
            background: e.video.background || !1,
            type: e.video.type || !1,
            debugMode: !!PopIn5.$F.notEmpty(e.debugMode) && e.debugMode,
            title: e.title,
            nid: e.nid,
            description: PopIn5.$F.notEmpty(e.video.description) ? e.video.description : "",
            play_time_seconds: PopIn5.$F.notEmpty(e.video.play_time_seconds) ? e.video.play_time_seconds : "",
            campaign: e.campaign,
            impUrl: e.url + (e.url.indexOf("?") > 0 ? "&" : "?") + (n ? "type=vertical_imp" : "type=imp") + "&api_host=" + o,
            endUrl: e.url + (e.url.indexOf("?") > 0 ? "&" : "?") + "type=end",
            linkUrl: e.origin_url,
            trackingPixel: e.tracking_pixel || !1,
            url: PopIn5.$.Global.protocol + "//jsv.popin.cc/" + e.nid + "/video.jsv",
            video: PopIn5.$.Global.protocol + "//jsv.popin.cc/" + e.nid + "/video.mp4",
            videoObj: e
        }
    }
}),
PopIn5.Class("Read", "Config", {
    init: function(e) {
        this.setDefaults(),
        PopIn5.$.Config.overrideAll(this, e),
        this.afterConfig()
    },
    setDefaults: function() {
        this.nid = "",
        this.media = PopIn5.$F.getParam("read_analysis_id", ""),
        this.urlReplace = PopIn5.$.Config.urlReplace,
        this.mainNode = "",
        this.mainNodeElement = "",
        this.useMainContentFinder = !1,
        this.stopNode = !1,
        this.segmentData = {},
        this.readArticle = PopIn5.$.Config.readArticle,
        this.sessionParam = "__read",
        this.useSessions = void 0 !== window.sessionStorage,
        this.useUser = !1,
        this.textSpeed = 1e3 / 60,
        this.imageSpeed = 9e4,
        this.clickLog = !1,
        this.engagement = {
            format: PopIn5.$F.getParam("engagement_format", ""),
            bid: PopIn5.$F.getParam("engagement_bid", ""),
            pid: PopIn5.$F.getParam("engagement_pid", "")
        },
        this.treasuredataLog = !1
    },
    afterConfig: function() {
        this.target = PopIn5.$F.replaceAll(window.location.href, this.urlReplace);
        var e = {
            category: PopIn5.$F.getParam("read_categoryName", PopIn5.$F.getParam("read_fragmentinfo_categoryName", "")),
            customField: PopIn5.$F.getParam("read_customField", PopIn5.$F.getParam("read_fragmentinfo_customField", "")),
            abtest: PopIn5.$F.getParam("read_abtest", PopIn5.$F.getParam("read_fragmentinfo_customField", ""))
        };
        for (var t in e)
            e.hasOwnProperty(t) && PopIn5.$F.notEmpty(e[t]) && (this.segmentData[t] = e[t])
    }
}),
new PopIn5.ClassLoad("Read","Debug",{
    init: function() {
        var e = this;
        this.colors = {
            text: "#60C560",
            img: "#5BC0DE"
        },
        this.url = PopIn5.$F.parseUrl(window.location.href),
        (this.debug || PopIn5.$F.notEmpty(this.url.qString.popinread)) && PopIn5.$F.aspectAfter(PopIn5.Read.ReadInstance.prototype, "elapsed", function() {
            void 0 === this._debug && e.initDebug(this),
            e.afterCalculate(this)
        })
    },
    initDebug: function(e) {
        var t = e.data
          , n = (e.context,
        PopIn5.$F.ce(document.body, "div"));
        PopIn5.$F.css(n, {
            position: "absolute",
            top: t.top,
            height: t.height,
            left: t.mainPosition.left - 70 < 0 ? 0 : t.mainPosition.left - 70,
            opacity: t.mainPosition.left - 70 < 0 ? .7 : 1,
            width: 45,
            border: "none",
            "box-shadow": "2px 2px 2px 2px #888888",
            "-webkit-border-radius": "10px",
            "-moz-border-radius": "10px",
            "border-radius": "10px",
            overflow: "hidden",
            "background-color": "white",
            "z-index": 999999
        });
        var o = PopIn5.$F.ce(document.body, "div", PopIn5.$.Language.getMessage("read_debug_container"));
        PopIn5.$F.css(o, {
            position: "absolute",
            top: t.top - 20,
            left: t.mainPosition.left - 70 < 0 ? 0 : t.mainPosition.left - 70,
            "font-size": "10px",
            width: 45,
            "text-align": "center",
            "z-index": 999999
        });
        var i = PopIn5.$F.ce(document.body, "div");
        i.id = "popin-read-debug-infor",
        PopIn5.$F.css(i, {
            position: "absolute",
            top: t.top,
            left: t.mainPosition.left - 200 < 0 ? 0 : t.mainPosition.left - 200,
            width: 100,
            padding: "10px",
            "background-color": "#d9534f",
            color: "white",
            "font-size": "18px",
            "font-weight": "bold",
            "line-height": "30px",
            "-webkit-border-radius": "10px",
            "-moz-border-radius": "10px",
            "border-radius": "10px",
            "box-shadow": "2px 2px 2px #888888",
            "z-index": 999999
        }),
        PopIn5.$F.ce(i, "div", PopIn5.$.Language.getMessage("read_debug_info_view"));
        var a = PopIn5.$F.ce(i, "div", "0%");
        PopIn5.$F.ce(i, "div", PopIn5.$.Language.getMessage("read_debug_info_read"));
        var r = PopIn5.$F.ce(i, "div", "0%");
        PopIn5.$F.ce(i, "div", PopIn5.$.Language.getMessage("read_debug_info_time"));
        for (var s = PopIn5.$F.ce(i, "div", "0 " + PopIn5.$.Language.getMessage("read_debug_info_sec")), d = [], c = "", p = 0; p < t.count; p++) {
            var l = t.parts[p]
              , h = PopIn5.$F.ce(n, "div");
            if (PopIn5.$F.css(h, {
                width: "0%",
                height: l.end - l.start,
                "background-color": this.colors[l.type],
                "z-index": 999999
            }),
            c != l.type) {
                var g = PopIn5.$F.ce(n, "div", "img" == l.type ? "画像" : "テキスト");
                PopIn5.$F.css(g, {
                    position: "absolute",
                    width: "100%",
                    "text-align": "center",
                    "font-size": "10px",
                    "font-weight": "bold",
                    color: "white",
                    "z-index": 999999
                })
            }
            c = l.type,
            d.push(h)
        }
        e._debug = {
            container: n,
            infoDiv: i,
            viewInfo: a,
            readInfo: r,
            readTime: s,
            partDivs: d
        }
    },
    afterCalculate: function(e) {
        for (var t = e.data, n = e._debug.partDivs, o = 0, i = 0, a = 0; a < t.count; a++) {
            var r = t.parts[a]
              , s = n[a]
              , d = r.viewPercent;
            PopIn5.$F.cssSet(s, "width", 100 * d + "%"),
            o += r.viewPercent / t.count,
            i += (r.viewTime > 0 ? 1 : 0) / t.count,
            PopIn5.$F.cssSet(s, "opacity", 1 == d ? 1 : .6)
        }
        var c = e._debug.infoDiv
          , p = PopIn5.$F.getPageScrollTop()
          , l = PopIn5.$F.size(c);
        PopIn5.$F.cssSet(c, "top", Math.min(Math.max(t.top, p), t.top + t.height - l.height)),
        e._debug.viewInfo.innerHTML = Math.round(100 * i) + "%",
        e._debug.readInfo.innerHTML = Math.round(100 * o) + "%",
        e._debug.readTime.innerHTML = Math.floor(t.totalViewTime) + " " + PopIn5.$.Language.getMessage("read_debug_info_sec")
    }
}),
PopIn5.StaticClass("Read", "Log", {
    init: function() {},
    showAllLog: function(e) {
        var t = e.readInstance
          , n = PopIn5.$.Global.device
          , o = e.readInstance.media
          , i = encodeURIComponent(t._config.target)
          , a = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
        a.add("url", i),
        a.add("uid", ""),
        a.add("type", n + "_viewall"),
        a.add("nid", n),
        a.add("media", o),
        PopIn5.$.Segment.addSegmentLog(a, t._config, t.context),
        a.add("t", (new Date).getTime()),
        PopIn5.$.Log.log(a.build())
    },
    read70Log: function(e) {
        if (!PopIn5.$F.isEmpty(e.read.clickCategory)) {
            var t = e.readInstance
              , n = PopIn5.$.Global.device
              , o = e.readInstance.media
              , i = encodeURIComponent(t._config.target)
              , a = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
            a.add("url", i),
            a.add("uid", ""),
            a.add("type", n + "_read70"),
            a.add("nid", e.read.nid),
            a.add("campaign", e.read.campaign),
            a.add("media", o),
            a.add("r5", e.read.clickCategory),
            a.add("t", (new Date).getTime()),
            PopIn5.$.Log.log(a.build())
        }
    },
    paidLog: function(e) {
        var t = e.readInstance
          , n = (PopIn5.$.Global.device,
        e.readInstance.media,
        encodeURIComponent(t._config.target))
          , o = PopIn5.$.Global.referrer
          , i = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
        i.add("url", n),
        i.add("uid", ""),
        i.add("type", o),
        i.add("t", (new Date).getTime()),
        PopIn5.$.Log.log(i.build())
    },
    monitorGMOLog: function(e) {
        var t = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif");
        t.add("url", location.hostname + "_" + e),
        t.add("uid", ""),
        t.add("type", "paid_gmo"),
        t.add("t", (new Date).getTime()),
        PopIn5.$.Log.log(t.build())
    }
}),
new PopIn5.Module("Read",{
    initModule: function() {
        if (!PopIn5.$F.isIE) {
            var e = this;
            this.uid = "",
            this.sessionData = this._config.useSessions ? PopIn5.$F.ssGet(this._config.sessionParam) : "",
            this.sessionId = this._config.useSessions ? PopIn5.$F.ssGet("__read_id") : "",
            this.newSession = !1,
            this.readArticle = this._config.readArticle,
            this.readStorage = new PopIn5.Read.Storage(this),
            this._config.useSessions && PopIn5.$F.isEmpty(this.sessionId) && (PopIn5.$F.ssSet("__read_id", "s" + (new Date).getTime()),
            this.newSession = !0),
            (this._config.useUser || PopIn5.Discovery.Global.adEnable) && PopIn5.$.User.getUser(function(t) {
                e.uid = t
            });
            var t = document.referrer
              , n = PopIn5.$F.getParam("contents_id", "");
            PopIn5.$F.notEmpty(t) && t.indexOf("a.popin.cc") > 0 && this.retrieveForAd(),
            PopIn5.$F.notEmpty(t) && t.indexOf("trace.popin.cc") > 0 && this.retrieveForAdTrace(),
            PopIn5.$F.notEmpty(n) && (this.nid = n),
            this.createInstances(),
            this.readTimer = new PopIn5.Read.Timer,
            this.readTimer.start(function(t) {
                for (var n = PopIn5.$F.getPageScrollTop(), o = PopIn5.$F.getWindowHeight(), i = 0; i < e.readInstances.length; i++)
                    PopIn5.$F.notEmpty(e.readInstances[i].mainNode) && e.readInstances[i].elapsed(t, n, o)
            })
        }
    },
    createInstances: function() {
        var e = this;
        this.readInstances = [];
        for (var t = 0; t < PopIn5.$.Context.contexts.length; t++)
            this.initContext(PopIn5.$.Context.contexts[t]);
        PopIn5.$.Global.event.addEventListener("newContext", function(t) {
            e.initContext(t)
        })
    },
    initContext: function(e) {
        var t = new PopIn5.Read.ReadInstance(this,e);
        new PopIn5.Read.ReadLogger(this,t);
        this.readInstances.push(t)
    },
    retrieveForAd: function() {
        var e = this
          , t = "";
        t = void 0 !== window.PopIn6 && "hk" == window.PopIn6.requestCountry ? "&c_token=popin" : -1 != location.href.indexOf("popintoken") ? "&c_token=popin" : "";
        var n = PopIn5.$.Global.protocol + "//discoveryplus.popin.cc/popin_discovery/ck?name=_click" + t;
        PopIn5.$F.ajax(n, function(t) {
            if (PopIn5.$F.notEmpty(t)) {
                var n = parseInt(t.time)
                  , o = JSON.parse(window.atob(t.cdata))._click;
                if (PopIn5.$F.notEmpty(o)) {
                    var i = o.split("|").pop().split(".");
                    if (i.length > 2) {
                        var a = i[0]
                          , r = i[1]
                          , s = i[2];
                        if ((n - parseInt(s)) / 1e3 < 60) {
                            if (document.referrer) {
                                var d = PopIn5.$F.parseUrl(document.referrer);
                                d.qString && d.qString.hasOwnProperty("logid") && (PopIn5.$.Global.logid = d.qString.logid)
                            }
                            e.campaign = a,
                            e.nid = r,
                            e.media = r,
                            i.length > 3 && (e.clickCategory = i[3])
                        }
                    }
                }
            }
        })
    },
    retrieveForAdTrace: function() {
        var e = this;
        PopIn5.$F.ajax("https://trace.popin.cc/cs/ck", function(t) {
            if (PopIn5.$F.notEmpty(t)) {
                var n = parseInt(t.time)
                  , o = t.clicks;
                if (PopIn5.$F.notEmpty(o)) {
                    var i = o.split("|").shift().split("_");
                    if (i.length > 2) {
                        var a = i[2]
                          , r = i[3]
                          , s = i[4];
                        if (n - parseInt(s) < 60) {
                            if (document.referrer) {
                                var d = PopIn5.$F.parseUrl(document.referrer);
                                d.qString && d.qString.hasOwnProperty("rid") && (PopIn5.$.Global.logid = d.qString.rid)
                            }
                            e.campaign = a,
                            e.nid = r,
                            e.media = r,
                            i.length >= 6 && i[5] && (e.clickCategory = "cc_" + i[5])
                        }
                    }
                }
            }
        })
    }
}),
new PopIn5.StaticClass("Read","MainContentFinder",{
    init: function() {},
    find: function(e) {
        function t(e) {
            return e.offsetWidth * e.offsetHeight
        }
        for (var n, o = e.childNodes, i = null, a = 0, r = o.length; a < r; a++)
            if (!(1 != (n = o[a]).nodeType && "IFRAME" != n.tagName && "SCRIPT" != n.tagName || i && n.offsetWidth < i.offsetWidth && i.offsetTop > 10)) {
                var s = n.getElementsByTagName("script").length > 0 ? function(e) {
                    for (var t = 0, n = e.childNodes, o = 0, i = n.length; o < i; o++)
                        "IFRAME" != n[o].tagName && "SCRIPT" != n[o].tagName && (t += "textContent"in n[o] ? n[o].textContent.length : n[o].innerText ? n[o].innerText.length : 0);
                    return t
                }(n) : PopIn5.$F.isIE ? n.innerText.replace(/\s+/, "").length : n.textContent.replace(/\s+/, "").length
                  , d = e.offsetWidth < 1100 ? .07 : 0;
                n.offsetTop < 400 && n.offsetLeft < e.offsetWidth / 2 && n.offsetWidth > 300 && n.offsetHeight > 250 && s > 30 && t(n) > t(document.body) * d && (i = n)
            }
        return i ? this.find(i) : e
    }
}),
new PopIn5.Class("Read","ReadInstance",{
    init: function(e, t) {
        this.read = e,
        this.context = t,
        this._config = e._config,
        document.body && (PopIn5.$F.notEmpty(this._config.mainNode) && (this.mainNode = PopIn5.$F.selector(t.key || document.body, this._config.mainNode),
        this.mainNode = this.mainNode.length > 0 ? this.mainNode[0] : ""),
        PopIn5.$F.notEmpty(this._config.mainNodeElement) && (this.mainNode = this._config.mainNodeElement),
        this._config.useMainContentFinder && (this.mainNode = PopIn5.Read.MainContentFinder.find(document.body)),
        PopIn5.$F.isEmpty(this.mainNode) || (this.data = {},
        this.nid = PopIn5.$F.notEmpty(this._config.nid) ? this._config.nid : PopIn5.$F.digest(window.location.host) + PopIn5.$F.digest(t.target),
        this.media = PopIn5.$F.notEmpty(this._config.media) ? this._config.media : window.location.host,
        this.calculateRequiredTimeReading(),
        this.calculateParts()))
    },
    calculateRequiredTimeReading: function() {
        this.calculateTextLength();
        var e = this.data.textLength / this._config.textSpeed;
        this.data.textTime = e,
        this.calculateImages()
    },
    calculateTextLength: function() {
        var e = ""
          , t = ["A", "IFRAME", "SCRIPT", "H1", "H2", "H3", "H4", "NOSCRIPT", "STYLE"]
          , n = 1e6
          , o = 0
          , i = function(e) {
            var t = PopIn5.$F.position(e)
              , i = PopIn5.$F.size(e)
              , a = isNaN(t.top) ? 0 : t.top
              , r = isNaN(i.height) ? 0 : i.height;
            n = Math.min(n, a),
            o = Math.max(o, a + r)
        }
          , a = !0
          , r = !1;
        PopIn5.$F.notEmpty(this._config.stopNode) && (r = PopIn5.$F.selector(this._config.stopNode));
        var s = function(n) {
            if (a)
                if (PopIn5.$F.notEmpty(r) && n == r)
                    a = !1;
                else if (3 == n.nodeType) {
                    var o = PopIn5.$F.getInnerText(n).replace(/[\n\r\s]/g, "");
                    if (0 === o.length)
                        return;
                    e += o,
                    o.length > 5 && i(n.parentNode)
                } else if (1 == n.nodeType) {
                    for (var d = 0; d < t.length; d++)
                        if (n.tagName == t[d])
                            return;
                    for (var c = 0; c < n.childNodes.length; c++) {
                        var p = n.childNodes[c];
                        s(p)
                    }
                }
        };
        s(this.mainNode),
        "" === e && i(this.mainNode),
        this.data.text = e,
        this.data.textLength = e.length,
        this.data.textStart = n,
        this.data.textEnd = o
    },
    calculateImages: function() {
        for (var e = PopIn5.$F.selector(this.mainNode, "IMG"), t = [], n = 0, o = 0; o < e.length; o++) {
            var i = e[o]
              , a = PopIn5.$F.join(PopIn5.$F.size(i), PopIn5.$F.position(i));
            a.width * a.height >= 4e4 && (t.push({
                element: i,
                box: a
            }),
            n += a.width * a.height)
        }
        this.data.imageTime = n / this._config.imageSpeed,
        this.data.images = t
    },
    calculateParts: function() {
        if (this.data.totalViewTime = 0,
        this.data.mainSize = PopIn5.$F.size(this.mainNode),
        this.data.mainPosition = PopIn5.$F.position(this.mainNode),
        !isNaN(this.data.mainSize.height) && !isNaN(this.data.mainSize.width)) {
            var e = this.data.mainPosition.top
              , t = this.data.textEnd;
            isNaN(t) && (t = this.data.mainPosition.top + this.data.mainSize.height);
            var n = t - e;
            this.data.top = e,
            this.data.height = n,
            this.data.count = Math.floor(n / 10),
            this.data.partHeight = n / this.data.count,
            this.data.partSurface = this.data.mainSize.width * this.data.partHeight,
            this.data.parts = [];
            for (var o = 0, i = 0, a = 0; a < this.data.count; a++) {
                var r = {};
                r.start = e + Math.round(a * this.data.partHeight),
                r.end = e + Math.round((a + 1) * this.data.partHeight),
                r.viewTime = 0,
                r.viewPercent = 0,
                r.imageCovered = 0;
                for (var s = 0; s < this.data.images.length; s++) {
                    var d = this.data.images[s];
                    d.box.top >= r.start && d.box.top < r.end ? r.imageCovered += (r.end - d.box.top) / this.data.partHeight * d.box.width / this.data.mainSize.width : d.box.top + d.box.height >= r.start && d.box.top + d.box.height <= r.end ? r.imageCovered += (d.box.top + d.box.height - r.start) / this.data.partHeight * d.box.width / this.data.mainSize.width : d.box.top <= r.start && d.box.top + d.box.height >= r.end && (r.imageCovered += d.box.width / this.data.mainSize.width)
                }
                r.imageCovered > .4 ? (i++,
                r.type = "img") : (o++,
                r.type = "text"),
                this.data.parts.push(r)
            }
            this.data.imageParts = i,
            this.data.textParts = o,
            this.data.textSurfaceSpeed = o * this.data.partSurface / this.data.textTime,
            this.data.imageSurfaceSpeed = i * this.data.partSurface / this.data.imageTime;
            for (var c = 0; c < this.data.count; c++) {
                var p = this.data.parts[c];
                "img" == p.type ? p.readTime = this.data.imageTime / i : "text" == p.type && (p.readTime = this.data.textTime / o)
            }
        }
    },
    elapsed: function(e, t, n) {
        for (var o = parseInt(t) + parseInt(n), i = [], a = 0; a < this.data.count; a++) {
            var r = this.data.parts[a];
            r.start > t && r.end < o && r.viewPercent < 1 && i.push(r)
        }
        for (var s = e / (i.length * this.data.partSurface), d = 0, c = 0; c < i.length; c++) {
            var p = i[c]
              , l = "img" == p.type ? this.data.imageSurfaceSpeed : this.data.textSurfaceSpeed
              , h = p.viewPercent;
            p.viewPercent = Math.min(1, h + s * l),
            p.viewPercent > h && d++,
            p.viewTime = p.viewPercent * p.readTime
        }
        d > 0 && (this.data.totalViewTime += e)
    },
    getOutput: function() {
        for (var e = {}, t = 0, n = 0, o = this.data, i = 0; i < o.count; i++) {
            var a = o.parts[i];
            a.viewTime > 0 && t++,
            n += a.viewPercent / o.count
        }
        return e.viewPercent = t / o.count,
        e.readPercent = n,
        e
    }
}),
new PopIn5.Class("Read","ReadLogger",{
    init: function(e, t) {
        this.read = e,
        this._config = e._config,
        this.readInstance = t,
        this.firstLog = !0,
        this.showAllLog = !1,
        this.read70Log = !1,
        this.paidLog = PopIn5.$.Global.referrer.indexOf("paid_") > -1,
        this.previousTime = 0;
        var n = document.referrer;
        this.isAdPage = PopIn5.$F.notEmpty(n) && n.indexOf("a.popin.cc") > 0 || PopIn5.$F.notEmpty(n) && n.indexOf("trace.popin.cc") > 0,
        this.adReadRecordFrame = null,
        PopIn5.$F.isEmpty(this.readInstance.mainNode) || (this.isAdPage && this.initAdReadRecord(),
        setInterval(PopIn5.$F.pass(this.logWritterInterval, this, []), 2e3),
        -1 != ["https://www.isuzu-tis.com/specialoffer/campaign/pup-ppv/campaign-sales-pup-ppv/spacecab-s-financial/register/?utm_source=popin&utm_medium=nativeads&utm_campaign=slg_spacecab_finance&utm_content=cid20201101004_start20201103_end20201130_1200x628___photo_broadaudience", "https://magazine.herbgoldofficial.com/indexpopin.html?cid=ejlfs6irszgk", "https://citypluscapital.com/cpc-campaign/", "https://www.naturebiotec.com/news-lzm03/", "https://www.campaign.natureherbinter.com/"].indexOf(location.href) && (this.reportFlagFor3s = !0,
        this.isReported = !1,
        this.timerByCd = setInterval(PopIn5.$F.pass(this.addLogForTimes, this, []), 100)))
    },
    addLogForTimes: function() {
        var e = this.readInstance.data
          , t = this.getOutput()
          , n = Math.min(e.totalViewTime, 1 * (e.textTime + e.imageTime));
        this.reportFlagFor3s && 3 <= n && n < 4 && (this.isReported || (this.isReported = !0,
        this.reportFlagFor3s = !1,
        this.writeLog(e, t, "newsReportBycd"),
        clearInterval(this.timerByCd)))
    },
    initAdReadRecord: function() {
        try {
            if ("function" != typeof window.postMessage)
                return;
            this.adReadRecordFrame = PopIn5.$F.cio(PopIn5.$.Global.protocol + "//api.popin.cc/iframe/ad_read.html")
        } catch (e) {}
    },
    updateAdReadPercent: function(e) {
        try {
            var t = this.adReadRecordFrame.window;
            if (!t || !this.read.nid)
                return;
            t.postMessage(JSON.stringify({
                action: "updateAdRead",
                payload: {
                    adId: this.read.nid,
                    readPercent: e
                }
            }), "*")
        } catch (e) {}
    },
    updateArticleReadPercentForRT: function(e) {
        try {
            if ("function" != typeof window.postMessage || !this.articleReadLogForRT || !this.articleReadLogForRT.articleId)
                return;
            this.articleReadRecordFrame || (this.articleReadRecordFrame = PopIn5.$F.cio(PopIn5.$.Global.protocol + "//api.popin.cc/iframe/article_read.html")),
            this.articleReadRecordFrame.window.postMessage(JSON.stringify({
                action: "updateArticleRead",
                payload: {
                    articleId: this.articleReadLogForRT.articleId,
                    readPercent: e
                }
            }), "*")
        } catch (e) {}
    },
    updateArticleCategoryReadPercent: function(e, t) {
        "function" == typeof window.postMessage && window.popInGlobal && window.popInGlobal.common_category && (this.articleReadRecordFrame || (this.articleReadRecordFrame = PopIn5.$F.cio(PopIn5.$.Global.protocol + "//api.popin.cc/iframe/article_read.html")),
        this.articleReadRecordFrame.window.postMessage(JSON.stringify({
            action: "updateArticleCategoryRead",
            payload: {
                commonCategory: window.popInGlobal.common_category,
                readTimeSecond: t,
                readPercent: e
            }
        }), "*"))
    },
    getTargetUrl: function() {
        return ("function" == typeof document.querySelector ? document.querySelector('[property="og:url"]') : {}).content || location.href
    },
    isActiveWriteReadRecord: function(e) {
        if (void 0 !== this._isActiveWriteReadRecord)
            return this._isActiveWriteReadRecord;
        if (this.read.newSession) {
            var t = Math.random() < .5 ? "true" : "false";
            this.isAdPage && (t = "true"),
            PopIn5.$F.ssSet("__read_rand", t)
        }
        return "false" == PopIn5.$F.ssGet("__read_rand") && window.location.href.indexOf("popinread") < 0 ? this._isActiveWriteReadRecord = !1 : this._isActiveWriteReadRecord = !0,
        this._isActiveWriteReadRecord
    },
    logWritterInterval: function() {
        var e = this.getOutput();
        PopIn5.Read.Uts.writeReadLog(this.readInstance, e),
        this.isActiveWriteReadRecord(e) && (this.writeLog(this.readInstance.data, e),
        1 != e.viewPercent || this.showAllLog || (this.showAllLog = !0,
        PopIn5.Read.Log.showAllLog(this)),
        PopIn5.$F.notEmpty(this.read.nid) && e.readPercent >= .7 && !this.read70Log && (this.read70Log = !0,
        PopIn5.Read.Log.read70Log(this)),
        this.paidLog && (PopIn5.Read.Log.paidLog(this),
        this.paidLog = !1))
    },
    getOutput: function() {
        var e = this.readInstance.data
          , t = this.readInstance.getOutput();
        if (this.readInstance.context.readOutput = t,
        t.stat = {
            text: 100 * Math.round(e.textLength / 100),
            image: Math.round(100 * e.imageParts / e.count)
        },
        this.firstLog && this._config.useSessions) {
            var n = this.readInstance.read.sessionData;
            if (t.stat.in_text = t.stat.text,
            t.stat.in_image = t.stat.image,
            PopIn5.$F.notEmpty(n)) {
                var o = n.split("|");
                t.stat.out_text = o.length > 0 ? o[0] : "",
                t.stat.out_r = o.length > 2 ? o[2] : "",
                t.stat.out_image = o.length > 1 ? o[1] : ""
            }
        }
        return t
    },
    writeLog: function(e, t, n) {
        var o = this.readInstance.context
          , i = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif")
          , a = this.read.readArticle ? o.target : window.location.href;
        i.add("url", encodeURIComponent(a)),
        i.add("uid", this.read.uid),
        i.add("nid", PopIn5.$F.notEmpty(this.read.nid) ? this.read.nid : this.readInstance.nid),
        i.add("media", PopIn5.$F.notEmpty(this.read.media) ? this.read.media : this.readInstance.media);
        var r = PopIn5.$F.isEmpty(this.previousR1)
          , s = (parseInt(10 * t.viewPercent),
        parseInt(10 * t.readPercent),
        10 * Math.round(10 * t.readPercent));
        if (!(s <= 0) || n) {
            this.isAdPage ? this.updateAdReadPercent(s) : this.articleReadLogForRT && this.updateArticleReadPercentForRT(s),
            i.add("r1", s);
            var d = r ? 0 : this.previousR1;
            if (!PopIn5.$F.notEmpty(this.previousR1) || s != d || n) {
                i.add("r2", d),
                PopIn5.$.Global.event.fireEvent("read-percent-change", [s, t]);
                for (var c in t.stat)
                    t.stat.hasOwnProperty(c) && i.add("r3", c + t.stat[c]);
                var p = Math.min(e.totalViewTime, 1 * (e.textTime + e.imageTime))
                  , l = r ? Math.round(p) : Math.round(p - this.previousTime);
                i.add("r4", l),
                this.updateArticleCategoryReadPercent(s - d, l),
                PopIn5.$F.notEmpty(this._config.category) && !0 === this._config.category && PopIn5.$F.isEmpty(this._config.segmentData.category) && (this._config.segmentData.category = PopIn5.$F.notEmpty(o.segmentData.category) ? o.segmentData.category : "all"),
                PopIn5.$.Segment.addSegmentLog(i, this._config, o, {});
                var h = PopIn5.$.Global.referrer;
                "" !== h && i.add("r5", "re_" + h),
                i.add("r5", "dv_" + PopIn5.$.Global.device),
                PopIn5.$F.notEmpty(t.stat.out_r) && i.add("r5", "out_r" + t.stat.out_r),
                this.read.newSession && this.firstLog && (i.add("r5", "session"),
                document.querySelector("#taxel_ab_test_parent") && PopIn5.Read.Log.monitorGMOLog("popin"),
                document.querySelector("._taxel_recommend_header") && PopIn5.Read.Log.monitorGMOLog("taxel")),
                this._config.useSessions && this.firstLog && i.add("r5", "sstorage"),
                PopIn5.$F.notEmpty(this.read.clickCategory) && i.add("r5", this.read.clickCategory),
                i.add("r6", Math.round(p)),
                i.add("r7", "-" + Math.round(this.previousTime)),
                r && i.add("r8", e.textTime + e.imageTime),
                i.add("t", (new Date).getTime()),
                PopIn5.$.Global.event.fireEvent("readChange", [s, l]),
                PopIn5.$.Log.log(i.build(), {}),
                this.previousTime = p,
                this.previousR1 = s,
                this.firstLog = !1,
                PopIn5.$F.ssSet(this._config.sessionParam, [t.stat.text, t.stat.image, s].join("|")),
                PopIn5.Read.Treasure.writeReadLog(this.readInstance, s, p, t, n)
            }
        }
    }
}),
new PopIn5.Class("Read","Storage",{
    init: function(e) {
        this.read = e,
        this._config = e._config,
        this.enabled = !0
    },
    save: function(e) {
        this.enabled && (this.saveUserClass(e),
        this.saveAllHistory(e),
        e > 70 && this.saveReadHistory(e))
    },
    localGet: function(e) {
        var t = localStorage.getItem(e);
        return PopIn5.$F.notEmpty(t) ? JSON.parse(t) : {}
    },
    localSet: function(e, t) {
        try {
            localStorage.setItem(e, JSON.stringify(t))
        } catch (e) {}
    },
    saveUserClass: function(e) {
        var t = this.localGet("_prh_class")
          , n = new Date
          , o = function(e) {
            return [e.getFullYear(), (e.getMonth() < 9 ? "0" : "") + (e.getMonth() + 1), (e.getDay() < 10 ? "0" : "") + e.getDate()].join("")
        }
          , i = o(n);
        if (!PopIn5.$F.notEmpty(t.lastSent) || t.lastSent != i) {
            t[i] = 1;
            for (var a = [], r = 0; r < 31; r++) {
                var s = new Date(n.getTime() - 1e3 * r * 60 * 60 * 24);
                a.push(PopIn5.$F.notEmpty(t[o(s)]) ? 1 : 0)
            }
            for (var d = 0, c = 0, p = n.getDate(); c < p; c++)
                d += a[c];
            var l = !1;
            if (1 == d && (l = "a"),
            10 == d && (l = "b"),
            22 == d && (l = "c"),
            l) {
                var h = this.read.readArticle ? this._config.target : window.location.href
                  , g = PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif";
                g += "?url=" + encodeURIComponent(h),
                g += "&uid=" + this.read.uid,
                g += "&nid=" + this.read.nid,
                g += "&media=" + this.read.media,
                g += "&month" + i.substring(0, 6) + "=" + l,
                g += "&t=" + (new Date).getTime(),
                PopIn5.$.Log.log(g, {}),
                t.lastSent = i
            }
            this.localSet("_prh_class", t)
        }
    },
    saveAllHistory: function(e) {
        var t = this.localGet("_prh_all")
          , n = PopIn5.$F.digest(this._config.target);
        PopIn5.$F.isEmpty(t[this._config.target]) && (t[n] = {
            read: 0
        }),
        e > t[n].read && (t[n].read = e),
        t[n].time = (new Date).getTime();
        var o = 0
          , i = ""
          , a = (new Date).getTime() + 1e4;
        for (var r in t) {
            var s = t[r];
            s.time < a && (a = s.time,
            i = r),
            o++
        }
        o > 100 && delete t[i],
        this.localSet("_prh_all", t)
    },
    saveReadHistory: function(e) {
        var t = this.localGet("_prh");
        PopIn5.$F.isEmpty(t[this._config.target]) && (t[this._config.target] = {
            read: 0,
            category: category,
            title: document.title
        }),
        t[this._config.target].read = e,
        t[this._config.target].time = (new Date).getTime();
        var n = 0
          , o = ""
          , i = (new Date).getTime() + 1e4;
        for (var a in t) {
            var r = t[a];
            r.time < i && (i = r.time,
            o = a),
            n++
        }
        n > 50 && delete t[o],
        this.localSet("_prh", t)
    }
}),
new PopIn5.Class("Read","Timer",{
    init: function() {
        this.activeDetector(),
        this.loadSendCookieFaliJs()
    },
    start: function(e) {
        var t = this
          , n = (new Date).getTime();
        setInterval(function() {
            var o = (new Date).getTime()
              , i = (o - n) / 1e3;
            n = o,
            !t.active || i > .15 || e(i)
        }, 100)
    },
    activeDetector: function() {
        var e = this;
        this.active = !0;
        var t, n;
        if (void 0 !== document.hidden)
            t = "hidden",
            n = "visibilitychange";
        else if (void 0 !== document.mozHidden)
            t = "mozHidden",
            n = "mozvisibilitychange";
        else if (void 0 !== document.msHidden)
            t = "msHidden",
            n = "msvisibilitychange";
        else {
            if (void 0 === document.webkitHidden)
                return void (this.active = !0);
            t = "webkitHidden",
            n = "webkitvisibilitychange"
        }
        document.addEventListener(n, function(n) {
            e.active = !document[t]
        }, !1)
    },
    loadSendCookieFaliJs: function() {
        var e = document.createElement("script");
        e.type = "text/javascript",
        e.charset = "UTF-8",
        e.async = !0,
        e.src = "https://api.popin.cc/test/popin_send_cookie_set_fail.js?20201223";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t)
    }
}),
PopIn5.ErrorSafeStaticClass("Read", "Treasure", {
    getLogger: function(e) {
        return PopIn5.$F.isEmpty(this.tdLogger) && (this.tdLogger = PopIn5.$.Treasure.createLogger()),
        this.tdLogger
    },
    writeReadLog: function(e, t, n, o, i) {
        var a = this.getLogger()
          , r = e.context
          , s = e.read.nid
          , d = {
            image: "",
            pubdate: "",
            domain: location.host,
            media: PopIn5.Discovery.Global.media || e.media || location.host,
            nid: s,
            device: PopIn5.$F.isMobileDevice() ? "mobile" : "pc",
            api_host: "jp.popin.cc"
        };
        if (PopIn5.$F.notEmpty(r.configs.discovery)) {
            var c = PopIn5.$F.parseUri(r.configs.discovery.apiUrl).host;
            d.api_host = c.replace("discoveryplus.", "jp.")
        }
        if (PopIn5.$F.notEmpty(PopIn5.$.Config.apiHost) && (d.api_host = PopIn5.$.Config.apiHost),
        PopIn5.$F.notEmpty(r.discoveryData)) {
            var p = r.discoveryData;
            d.category = PopIn5.$F.notEmpty(p.category) ? p.category : "",
            d.image = PopIn5.$F.notEmpty(p.image_url) ? p.image_url : "",
            d.pubdate = PopIn5.$F.notEmpty(p.pubdate) ? p.pubdate : ""
        }
        d.read_re = PopIn5.$.Global.referrer,
        (document.referrer.indexOf("a.popin.cc") > -1 || document.referrer.indexOf("trace.popin.cc") > -1) && (d.campaign = e.read.campaign);
        var l = PopIn5.$.Segment.getSegmentData(e._config, r, {
            useCommonCategory: !0
        });
        for (var h in l)
            d["read_" + h] = l[h][0];
        if (PopIn5.$F.notEmpty(d.read_cc) && (d.common_category = d.read_cc,
        delete d.read_cc),
        PopIn5.$F.notEmpty(d.common_category)) {
            var g = d.common_category.split("_");
            g.length > 0 && (d.main_category = g[0])
        }
        PopIn5.$F.notEmpty(r.segmentData.mainCategory) && (d.main_category = r.segmentData.mainCategory);
        for (var u in o.stat)
            d["read_stat_" + u] = parseInt(o.stat[u]);
        d.logid = PopIn5.$.Global.logid,
        d.tracking_id = PopIn5.$F.tracking_id,
        d.testData = i,
        d.read = t,
        d.read_time = Math.round(10 * n) / 10,
        d.popin_user_id = e.read.uid,
        d.piuid = (PopIn5.$F.lsGet("__pi_u_id__") || "").split("-")[0];
        var f = PopIn5.$F.join({}, a.getTrackValues());
        f = PopIn5.$F.join(f, d),
        PopIn5.$.Treasure.writeRecord(a, "readlogs", f)
    }
}),
PopIn5.ErrorSafeStaticClass("Read", "Uts", {
    getLogger: function(e) {
        return PopIn5.$F.isEmpty(this.tdLogger) && (this.tdLogger = PopIn5.$.Treasure.createLogger()),
        this.tdLogger
    },
    writeReadLog: function(e, t) {
        var n = 10 * Math.round(10 * t.readPercent);
        if (!(n <= 0 || this.previousR1 === n)) {
            this.previousR1 = n;
            var o = Math.min(e.data.totalViewTime, 1 * (e.data.textTime + e.data.imageTime))
              , i = this.getLogger()
              , a = e.context
              , r = e.read.nid
              , s = {
                image: "",
                pubdate: "",
                domain: location.host,
                media: PopIn5.Discovery.Global.media || e.media || location.host,
                nid: r,
                device: PopIn5.$F.isMobileDevice() ? "mobile" : "pc",
                api_host: "jp.popin.cc"
            };
            if (PopIn5.$F.notEmpty(a.configs.discovery)) {
                var d = PopIn5.$F.parseUri(a.configs.discovery.apiUrl).host;
                s.api_host = d.replace("discoveryplus.", "jp.")
            }
            if (PopIn5.$F.notEmpty(PopIn5.$.Config.apiHost) && (s.api_host = PopIn5.$.Config.apiHost),
            PopIn5.$F.notEmpty(a.discoveryData)) {
                var c = a.discoveryData;
                s.category = PopIn5.$F.notEmpty(c.category) ? c.category : "",
                s.image = PopIn5.$F.notEmpty(c.image_url) ? c.image_url : "",
                s.pubdate = PopIn5.$F.notEmpty(c.pubdate) ? c.pubdate : ""
            }
            s.read_re = PopIn5.$.Global.referrer,
            (document.referrer.indexOf("a.popin.cc") > -1 || document.referrer.indexOf("trace.popin.cc") > -1) && (s.campaign = e.read.campaign);
            var p = PopIn5.$.Segment.getSegmentData(e._config, a, {
                useCommonCategory: !0
            });
            for (var l in p)
                s["read_" + l] = p[l][0];
            if (PopIn5.$F.notEmpty(s.read_cc) && (s.common_category = s.read_cc,
            delete s.read_cc),
            PopIn5.$F.notEmpty(s.common_category)) {
                var h = s.common_category.split("_");
                h.length > 0 && (s.main_category = h[0])
            }
            PopIn5.$F.notEmpty(a.segmentData.mainCategory) && (s.main_category = a.segmentData.mainCategory);
            for (var g in t.stat)
                s["read_stat_" + g] = parseInt(t.stat[g]);
            s.logid = PopIn5.$.Global.logid,
            s.tracking_id = PopIn5.$F.tracking_id,
            s.read = n,
            s.read_time = Math.round(10 * o) / 10,
            s.popin_user_id = e.read.uid,
            s.piuid = (PopIn5.$F.lsGet("__pi_u_id__") || [""]).split("-")[0],
            s.uid = PopIn5.Cookie.getCookie("_ss_pp_id") || PopIn5.$F.lsGet("_ss_pp_id") || "";
            var u = PopIn5.$F.join({}, i.getTrackValues());
            u = PopIn5.$F.join(u, s),
            "popin.baidu.com" !== s.api_host && this.sendToUts(u)
        }
    },
    setClientInfor: function(e) {
        var t = PopIn5.Discovery.Treasure.uainfo;
        t && (e.td_browser = t.browser,
        e.td_browser_version = t.browser_version,
        e.td_os = t.os,
        e.td_os_version = t.os_version)
    },
    sendToUts: function(e) {
        this.setClientInfor(e);
        var t = JSON.stringify(e)
          , n = ["https://log.popin.cc/log", "/popin_media", "/readlogs", "?data=" + btoa(unescape(encodeURIComponent(t)))].join("");
        (new Image).src = n
    }
}),
new PopIn5.Class("Share","BoxRenderer",{
    init: function(e) {
        this._config = e,
        PopIn5.$F.makeListener(this),
        PopIn5.$F.notEmpty(this._config.css) && PopIn5.$F.appendCSS(this._config.css),
        this.createContainer(),
        this.render()
    },
    createContainer: function() {
        var e = document.createElement("div");
        e.id = this._config.containerId,
        PopIn5.$F.addClass(e, "_popIn_share_container");
        var t = PopIn5.$F.selector(this._config.selector);
        t && PopIn5.$F.insertAdjacentElement(t, this._config.position, e),
        this.container = e
    },
    render: function() {
        var e = this
          , t = PopIn5.$F.ce(this.container, "div", this._config.headerLabel);
        PopIn5.$F.addClass(t, "_popIn_share_header");
        for (var n = 0; n < this._config.items.length; n++) {
            var o = this._config.items[n]
              , i = PopIn5.$F.ce(this.container, "div");
            new PopIn5.Share.ItemRenderer(this._config,o,i).addEventListener("click", function() {
                PopIn5.Share.Log.clickLog(),
                e.fireEvent("click", [])
            })
        }
    }
}),
PopIn5.Class("Share", "Config", {
    init: function(e) {
        this.setDefaults(),
        PopIn5.$.Config.overrideAll(this, e),
        this.afterConfig()
    },
    setDefaults: function() {
        this.urlReplace = PopIn5.$.Config.urlReplace,
        this.selector = "#_popIn_share",
        this.position = "AfterBegin",
        this.css = "",
        this.containerId = "_popIn_share_container",
        this.headerLabel = "",
        this.items = [["twitter", "Twitter"], ["facebook", "Facebook"], ["google", "Google+"], ["hatena", "はてな"]]
    },
    afterConfig: function() {
        this.target = PopIn5.$F.replaceAll(window.location.href, this.urlReplace)
    }
}),
new PopIn5.Class("Share","FacebookHandler",{
    init: function(e) {
        PopIn5.$F.makeListener(this);
        var t = this;
        this.target = e,
        this.title = document.title;
        var n = new PopIn5.$.ProxyAjax("https://graph.facebook.com/?ids=" + encodeURIComponent(e));
        n.timeout = 500,
        n.setCallback(function(e) {
            var n = 0;
            try {
                for (var o in e)
                    n += e[o].share.share_count
            } catch (e) {}
            t.fireEvent("change", [n])
        }),
        n.load()
    },
    handleClick: function() {
        var e = PopIn5.$F.isMobileDevice() ? "https://m.facebook.com/sharer.php?u=" + this.target + "&t=" + this.title : "https://www.facebook.com/share.php?u=" + this.target + "&t=" + this.title;
        window.open(e, "facebookWindow", "width=400,height=300,menubar=no, toolbar=no, scrollbar=yes")
    }
}),
new PopIn5.Class("Share","GoogleHandler",{
    init: function(e) {
        PopIn5.$F.makeListener(this);
        var t = this;
        this.target = e,
        this.title = document.title,
        setTimeout(function() {
            t.fireEvent("change", [0])
        }, 0)
    },
    handleClick: function() {
        var e = "https://plus.google.com/share?url=" + this.target;
        window.open(e, "googleWindow", "width=400,height=300,menubar=no, toolbar=no, scrollbar=yes")
    }
}),
new PopIn5.Class("Share","HatenaHandler",{
    init: function(e) {
        PopIn5.$F.makeListener(this);
        var t = this;
        this.target = e,
        this.title = document.title,
        setTimeout(function() {
            t.fireEvent("change", [0])
        }, 0)
    },
    handleClick: function() {
        var e = "https://b.hatena.ne.jp/add?mode=confirm&url=" + this.target + "&t=" + this.title;
        window.open(e, "hatenaWindow", "width=400,height=300,menubar=no, toolbar=no, scrollbar=yes")
    }
}),
new PopIn5.Class("Share","TwitterHandler",{
    init: function(e) {
        PopIn5.$F.makeListener(this);
        var t = this;
        this.target = e,
        this.title = document.title,
        setTimeout(function() {
            t.fireEvent("change", [0])
        }, 0)
    },
    handleClick: function() {
        var e = "https://twitter.com/share?url=" + this.target + "&text=" + encodeURIComponent(this.title);
        window.open(e, "twitterWindow", "width=400,height=300,menubar=no, toolbar=no, scrollbar=yes")
    }
}),
PopIn5.StaticClass("Share", "Handlers", {
    init: function() {
        this.handlers = {
            twitter: "TwitterHandler",
            facebook: "FacebookHandler",
            google: "GoogleHandler",
            hatena: "HatenaHandler"
        },
        this.targets = {}
    },
    getInstance: function(e, t) {
        if (void 0 === t && (t = PopIn5.$.Global.target),
        void 0 !== this.handlers[e]) {
            void 0 === this.targets[t] && (this.targets[t] = {
                instances: {}
            });
            var n = this.targets[t].instances;
            return void 0 === n[e] && (n[e] = new PopIn5.Share[this.handlers[e]](t)),
            n[e]
        }
        return !1
    },
    start: function(e, t, n) {
        this.getInstance(e, n).addEventListener("change", function(e) {
            t(e)
        })
    },
    click: function(e, t) {
        this.getInstance(e, t).handleClick()
    }
}),
new PopIn5.Class("Share","ItemRenderer",{
    init: function(e, t, n) {
        this._config = e,
        this.container = n,
        this.itemId = t[0],
        this.itemLabel = t[1],
        PopIn5.$F.makeListener(this),
        this.render()
    },
    render: function() {
        PopIn5.$F.addClass(this.container, "_popIn_share_item _popIn_share_" + this.itemId);
        PopIn5.$F.ce(this.container, "span", this.itemLabel);
        var e = PopIn5.$F.ce(this.container, "span", "0");
        PopIn5.$F.cssSet(e, "display", "none"),
        PopIn5.$F.addClass(e, "counter");
        var t = this;
        PopIn5.Share.Handlers.start(this.itemId, function(t) {
            e.innerHTML = t,
            t > 0 && PopIn5.$F.cssSet(e, "display", "")
        }, t._config.target),
        PopIn5.$F.bind(this.container, "click", function() {
            PopIn5.Share.Handlers.click(t.itemId, t._config.target),
            t.fireEvent("click", [])
        })
    }
}),
PopIn5.StaticClass("Share", "Log", {
    init: function() {},
    clickLog: function() {
        var e = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/s.gif").add("url", encodeURIComponent(location.href)).add("uid", PopIn5.$.Global.uid).add("type", PopIn5.$.Global.device + "_share").add("nid", PopIn5.$.Global.device).add("media", location.host).add("t", (new Date).getTime()).build();
        PopIn5.$.Log.log(e, {})
    }
}),
PopIn5.Module("Share", {
    initModule: function() {
        var e = this;
        new PopIn5.Share.BoxRenderer(this._config).addEventListener("click", function() {
            e.handleClick()
        })
    },
    handleClick: function() {
        PopIn5.$.Global.event.fireEvent("share-click", [])
    }
}),
PopIn5.Class("Engagement", "Config", {
    init: function(e) {
        this.setDefaults(),
        PopIn5.$.Config.overrideAll(this, e),
        this.afterConfig()
    },
    setDefaults: function() {
        this.time = 5e3,
        this.logInterval = 1e4,
        this.useParts = !1,
        this.format = "_empty",
        this.bid = "_empty",
        this.pid = "_empty"
    },
    afterConfig: function() {
        PopIn5.$.Global.nid = PopIn5.$F.digest(window.location.host) + PopIn5.$F.digest(PopIn5.$.Config.target),
        PopIn5.$.Config.overrideAll(PopIn5.Engagement.Global, this)
    }
}),
PopIn5.StaticClass("Engagement", "Global", {
    init: function() {}
}),
PopIn5.StaticClass("Engagement", "Log", {
    init: function() {},
    basicLog: function(e, t) {
        var n = PopIn5.$.Global
          , o = PopIn5.Engagement.Global
          , i = n.uid
          , a = encodeURIComponent(PopIn5.$.Config.target);
        if (PopIn5.$F.notEmpty(i)) {
            var r = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/e.gif");
            if (r.add("url", a),
            r.add("uid", n.uid),
            r.add("nid", n.nid),
            r.add("format", o.format),
            r.add("type", e),
            r.add("bid", o.bid),
            r.add("pid", o.pid),
            r.add("value", t),
            r.add("device", PopIn5.$.Global.device),
            r.add("t", (new Date).getTime()),
            PopIn5.$.Log.log(r.build()),
            n.uid.indexOf("%") > -1) {
                var s = PopIn5.$.Log.logBuilder(PopIn5.$.Global.protocol + "//rlog.popin.cc/e.gif");
                s.add("url", a),
                s.add("uid", n.uid),
                s.add("type", "uidcheck"),
                s.add("device", PopIn5.$.Global.device),
                s.add("browser", PopIn5.$F.browserType),
                s.add("ua", encodeURIComponent(PopIn5.$F.nua)),
                s.add("t", (new Date).getTime()),
                PopIn5.$.Log.log(s.build())
            }
        }
    }
}),
new PopIn5.Module("Engagement",{
    initModule: function() {
        this.engagementLeft = this._config.time,
        this.totalEngagement = 0,
        this.lastTime = (new Date).getTime(),
        this.lastLog = 0;
        var e = this;
        PopIn5.$.User.getUser(function(t) {
            e.sessionLog(),
            e.logReferrer()
        }),
        this.addEngagementEvents(),
        this._config.useParts && (this.parts = new PopIn5.Engagement.Parts),
        setInterval(function() {
            e.oneStep()
        }, 250)
    },
    oneStep: function() {
        var e = (new Date).getTime()
          , t = e - this.lastTime;
        this.engagementLeft > 0 && (t = Math.min(this.engagementLeft, t),
        this._config.useParts && this.parts.elapsed(t),
        this.totalEngagement += t,
        this.totalEngagement - this.lastLog > this._config.logInterval && PopIn5.$F.notEmpty(PopIn5.$.Global.uid) && (this.writeLog(),
        this.lastLog = this.totalEngagement)),
        this.lastTime = e,
        this.engagementLeft -= t
    },
    addEngagementEvents: function() {
        for (var e = this, t = ["focus", "click", "mousemove", "scroll"], n = 0; n < t.length; n++)
            PopIn5.$F.bind(window, t[n], function(t) {
                e.engagementLeft = e._config.time
            })
    },
    sessionLog: function() {
        if ("undefined" != typeof sessionStorage) {
            var e = sessionStorage.getItem("__engagement_session");
            PopIn5.$F.notEmpty(e) || (sessionStorage.setItem("__engagement_session", 1),
            PopIn5.Engagement.Log.basicLog("e_session", 1))
        }
    },
    writeLog: function() {
        this.totalEngagement > 6e5 || (PopIn5.$.Global.event.fireEvent("engagementChange", [this.totalEngagement]),
        PopIn5.Engagement.Log.basicLog("e_time", Math.round((this.totalEngagement - this.lastLog) / 1e3)))
    },
    logReferrer: function() {
        var e = document.referrer;
        if (PopIn5.$F.notEmpty(e)) {
            var t = PopIn5.$F.parseUri(e);
            t.host.indexOf(location.host) < 0 && PopIn5.Engagement.Log.basicLog("e_ref_" + t.host, 1)
        }
    }
}),
new PopIn5.Class("Engagement","Parts",{
    init: function() {
        this.parts = [],
        this.chunkSize = 100,
        this.logCount = 0
    },
    elapsed: function(e) {
        var t = PopIn5.$F.pageScrollTop()
          , n = PopIn5.$F.getWindowHeight();
        if (320 == PopIn5.$F.getWindowWidth()) {
            this.logCount++;
            for (var o = Math.round(t / this.chunkSize), i = Math.round((t + n) / this.chunkSize), a = o; a <= i; a++) {
                for (; this.parts.length <= a; )
                    this.parts.push(0);
                this.parts[a] += e
            }
            this.logCount >= 20 && (this.sendLog(),
            this.logCount = 0,
            this.parts = [])
        }
    },
    sendLog: function() {
        for (var e = [], t = 0; t < this.parts.length; t++)
            e.push(Math.round(this.parts[t] / 100) / 10);
        PopIn5.Engagement.Log.basicLog("e_ptime", e.join("|"))
    }
});
