(function() {
    var g, h = this;

    function l(a) {
        a = a.split(".");
        for (var b = h, c; c = a.shift();)
            if (null != b[c]) b = b[c];
            else return null;
        return b
    }

    function aa() {}

    function m(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    }

    function n(a) {
        return "string" == typeof a
    }

    function ba(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
    var p = "closure_uid_" + (1E9 * Math.random() >>> 0),
        ca = 0;

    function da(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function ea(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }

    function q(a, b, c) {
        q = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? da : ea;
        return q.apply(null, arguments)
    }

    function r(a, b) {
        var c = a.split("."),
            d = h;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) c.length || void 0 === b ? d[e] ? d = d[e] : d = d[e] = {} : d[e] = b
    }

    function t(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.A = b.prototype;
        a.prototype = new c;
        a.V = function(a, c, f) {
            return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2))
        }
    }
    Function.prototype.bind = Function.prototype.bind || function(a, b) {
        if (1 < arguments.length) {
            var c = Array.prototype.slice.call(arguments, 1);
            c.unshift(this, a);
            return q.apply(null, c)
        }
        return q(this, a)
    };

    function u(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    var v = Array.prototype,
        fa = v.indexOf ? function(a, b, c) {
            return v.indexOf.call(a, b, c)
        } : function(a, b, c) {
            c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (n(a)) return n(b) && 1 == b.length ? a.indexOf(b, c) : -1;
            for (; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        }, w = v.forEach ? function(a, b, c) {
            v.forEach.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = n(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
        };

    function ga(a, b) {
        var c;
        t: {
            c = a.length;
            for (var d = n(a) ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                    c = e;
                    break t
                }
            c = -1
        }
        return 0 > c ? null : n(a) ? a.charAt(c) : a[c]
    }

    function ha(a) {
        return v.concat.apply(v, arguments)
    }

    function ia(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    }

    function ja(a, b, c) {
        return 2 >= arguments.length ? v.slice.call(a, b) : v.slice.call(a, b, c)
    };

    function ka(a) {
        var b = x,
            c;
        for (c in b)
            if (a.call(void 0, b[c], c, b)) return c
    };
    var y;
    t: {
        var la = h.navigator;
        if (la) {
            var ma = la.userAgent;
            if (ma) {
                y = ma;
                break t
            }
        }
        y = ""
    };
    var na = -1 != y.indexOf("Opera") || -1 != y.indexOf("OPR"),
        z = -1 != y.indexOf("Trident") || -1 != y.indexOf("MSIE"),
        A = -1 != y.indexOf("Gecko") && -1 == y.toLowerCase().indexOf("webkit") && !(-1 != y.indexOf("Trident") || -1 != y.indexOf("MSIE")),
        oa = -1 != y.toLowerCase().indexOf("webkit");

    function pa() {
        var a = h.document;
        return a ? a.documentMode : void 0
    }
    var qa = function() {
        var a = "",
            b;
        if (na && h.opera) return a = h.opera.version, "function" == m(a) ? a() : a;
        A ? b = /rv\:([^\);]+)(\)|;)/ : z ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : oa && (b = /WebKit\/(\S+)/);
        b && (a = (a = b.exec(y)) ? a[1] : "");
        return z && (b = pa(), b > parseFloat(a)) ? String(b) : a
    }(),
        ra = {};

    function sa(a) {
        if (!ra[a]) {
            for (var b = 0, c = String(qa).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                var k = c[f] || "",
                    s = d[f] || "",
                    cb = RegExp("(\\d*)(\\D*)", "g"),
                    db = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var J = cb.exec(k) || ["", "", ""],
                        K = db.exec(s) || ["", "", ""];
                    if (0 == J[0].length && 0 == K[0].length) break;
                    b = u(0 == J[1].length ? 0 : parseInt(J[1], 10), 0 == K[1].length ? 0 : parseInt(K[1], 10)) || u(0 == J[2].length, 0 == K[2].length) ||
                        u(J[2], K[2])
                } while (0 == b)
            }
            ra[a] = 0 <= b
        }
    }
    var ta = h.document,
        ua = ta && z ? pa() || ("CSS1Compat" == ta.compatMode ? parseInt(qa, 10) : 5) : void 0;
    var B;
    if (!(B = !A && !z)) {
        var C;
        if (C = z) C = z && 9 <= ua;
        B = C
    }
    B || A && sa("1.9.1");
    z && sa("9");

    function va(a) {
        var b, c, d, e;
        b = document;
        if (b.querySelectorAll && b.querySelector && a) return b.querySelectorAll("" + (a ? "." + a : ""));
        if (a && b.getElementsByClassName) {
            var f = b.getElementsByClassName(a);
            return f
        }
        f = b.getElementsByTagName("*");
        if (a) {
            e = {};
            for (c = d = 0; b = f[c]; c++) {
                var k = b.className,
                    s;
                if (s = "function" == typeof k.split) s = 0 <= fa(k.split(/\s+/), a);
                s && (e[d++] = b)
            }
            e.length = d;
            return e
        }
        return f
    }

    function wa(a, b) {
        for (var c = 0; a;) {
            if (b(a)) return a;
            a = a.parentNode;
            c++
        }
        return null
    };

    function xa(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
            return eval("(" + a + ")")
        } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    }

    function ya() {}

    function D(a, b, c) {
        switch (typeof b) {
            case "string":
                za(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) {
                    c.push("null");
                    break
                }
                if ("array" == m(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++) c.push(e), D(a, b[f], c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (e in b) Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), za(e, c), c.push(":"), D(a, f, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }
    var E = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }, Aa = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function za(a, b) {
        b.push('"', a.replace(Aa, function(a) {
            if (a in E) return E[a];
            var b = a.charCodeAt(0),
                e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return E[a] = e + b.toString(16)
        }), '"')
    };

    function F() {}
    F.prototype.g = !1;
    F.prototype.dispose = function() {
        this.g || (this.g = !0, this.v())
    };
    F.prototype.v = function() {
        if (this.j)
            for (; this.j.length;) this.j.shift()()
    };

    function G() {
        this.a = [];
        this.b = {}
    }
    t(G, F);
    g = G.prototype;
    g.H = 1;
    g.p = 0;
    g.subscribe = function(a, b, c) {
        var d = this.b[a];
        d || (d = this.b[a] = []);
        var e = this.H;
        this.a[e] = a;
        this.a[e + 1] = b;
        this.a[e + 2] = c;
        this.H = e + 3;
        d.push(e);
        return e
    };

    function Ba(a, b, c) {
        var d = H;
        if (a = d.b[a]) {
            var e = d.a;
            (a = ga(a, function(a) {
                return e[a + 1] == b && e[a + 2] == c
            })) && Ca(d, a)
        }
    }

    function Ca(a, b) {
        if (0 != a.p) a.d || (a.d = []), a.d.push(b);
        else {
            var c = a.a[b];
            if (c) {
                if (c = a.b[c]) {
                    var d = fa(c, b);
                    0 <= d && v.splice.call(c, d, 1)
                }
                delete a.a[b];
                delete a.a[b + 1];
                delete a.a[b + 2]
            }
        }
    }
    g.I = function(a, b) {
        var c = this.b[a];
        if (c) {
            this.p++;
            for (var d = ja(arguments, 1), e = 0, f = c.length; e < f; e++) {
                var k = c[e];
                this.a[k + 1].apply(this.a[k + 2], d)
            }
            this.p--;
            if (this.d && 0 == this.p)
                for (; c = this.d.pop();) Ca(this, c);
            return 0 != e
        }
        return !1
    };
    g.v = function() {
        G.A.v.call(this);
        delete this.a;
        delete this.b;
        delete this.d
    };
    var Da = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;

    function Ea(a) {
        if (I) {
            I = !1;
            var b = h.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = Ea(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname) throw I = !0, Error();
            }
        }
        return a.match(Da)
    }
    var I = oa;

    function Fa(a, b, c) {
        if ("array" == m(b))
            for (var d = 0; d < b.length; d++) Fa(a, String(b[d]), c);
        else null != b && c.push("&", a, "" === b ? "" : "=", encodeURIComponent(String(b)))
    }
    var Ga = /#|$/;
    var Ha = {};

    function Ia(a) {
        return Ha[a] || (Ha[a] = String(a).replace(/\-([a-z])/g, function(a, c) {
            return c.toUpperCase()
        }))
    };
    var L = l("yt.dom.getNextId_");
    if (!L) {
        L = function() {
            return ++Ja
        };
        r("yt.dom.getNextId_", L);
        var Ja = 0
    };
    var M = window.yt && window.yt.config_ || {};
    r("yt.config_", M);
    r("yt.tokens_", window.yt && window.yt.tokens_ || {});
    r("yt.msgs_", window.yt && window.yt.msgs_ || {});

    function Ka(a) {
        var b = arguments;
        if (1 < b.length) {
            var c = b[0];
            M[c] = b[1]
        } else
            for (c in b = b[0], b) M[c] = b[c]
    }

    function La(a) {
        "function" == m(a) && (a = Ma(a));
        return window.setInterval(a, 250)
    }

    function Ma(a) {
        return a && window.yterr ? function() {
            try {
                return a.apply(this, arguments)
            } catch (b) {
                var c = b;
                if (window && window.yterr) {
                    var d = l("yt.www.errors.log");
                    d ? d(c, void 0) : (d = ("ERRORS" in M ? M.ERRORS : void 0) || [], d.push([c, void 0]), Ka("ERRORS", d))
                }
                throw b;
            }
        } : a
    };

    function N(a) {
        if (a = a || window.event) {
            for (var b in a) b in Na || (this[b] = a[b]);
            (b = a.target || a.srcElement) && 3 == b.nodeType && (b = b.parentNode);
            this.target = b;
            if (b = a.relatedTarget) try {
                b = b.nodeName && b
            } catch (c) {
                b = null
            } else "mouseover" == this.type ? b = a.fromElement : "mouseout" == this.type && (b = a.toElement);
            this.relatedTarget = b;
            this.clientX = void 0 != a.clientX ? a.clientX : a.pageX;
            this.clientY = void 0 != a.clientY ? a.clientY : a.pageY;
            this.keyCode = a.keyCode ? a.keyCode : a.which;
            this.charCode = a.charCode || ("keypress" == this.type ? this.keyCode :
                0);
            this.altKey = a.altKey;
            this.ctrlKey = a.ctrlKey;
            this.shiftKey = a.shiftKey;
            "MozMousePixelScroll" == this.type ? (this.wheelDeltaX = a.axis == a.HORIZONTAL_AXIS ? a.detail : 0, this.wheelDeltaY = a.axis == a.HORIZONTAL_AXIS ? 0 : a.detail) : window.opera ? (this.wheelDeltaX = 0, this.wheelDeltaY = a.detail) : 0 == a.wheelDelta % 120 ? "WebkitTransform" in document.documentElement.style ? window.chrome && 0 == navigator.platform.indexOf("Mac") ? (this.wheelDeltaX = a.wheelDeltaX / -30, this.wheelDeltaY = a.wheelDeltaY / -30) : (this.wheelDeltaX = a.wheelDeltaX / -1.2, this.wheelDeltaY = a.wheelDeltaY / -1.2) : (this.wheelDeltaX = 0, this.wheelDeltaY = a.wheelDelta / -1.6) : (this.wheelDeltaX = a.wheelDeltaX / -3, this.wheelDeltaY = a.wheelDeltaY / -3)
        }
    }
    g = N.prototype;
    g.type = "";
    g.target = null;
    g.relatedTarget = null;
    g.currentTarget = null;
    g.data = null;
    g.keyCode = 0;
    g.charCode = 0;
    g.altKey = !1;
    g.ctrlKey = !1;
    g.shiftKey = !1;
    g.clientX = 0;
    g.clientY = 0;
    g.wheelDeltaX = 0;
    g.wheelDeltaY = 0;
    var Na = {
        stopImmediatePropagation: 1,
        stopPropagation: 1,
        preventMouseEvent: 1,
        preventManipulation: 1,
        preventDefault: 1,
        layerX: 1,
        layerY: 1,
        scale: 1,
        rotation: 1
    };
    var x = l("yt.events.listeners_") || {};
    r("yt.events.listeners_", x);
    var Oa = l("yt.events.counter_") || {
        count: 0
    };
    r("yt.events.counter_", Oa);

    function Pa(a, b, c) {
        return ka(function(d) {
            return d[0] == a && d[1] == b && d[2] == c && !1 == d[4]
        })
    }

    function Qa(a, b, c) {
        if (a && (a.addEventListener || a.attachEvent)) {
            var d = Pa(a, b, c);
            if (!d) {
                var d = ++Oa.count + "",
                    e = !("mouseenter" != b && "mouseleave" != b || !a.addEventListener || "onmouseenter" in document),
                    f;
                f = e ? function(d) {
                    d = new N(d);
                    if (!wa(d.relatedTarget, function(b) {
                        return b == a
                    })) return d.currentTarget = a, d.type = b, c.call(a, d)
                } : function(b) {
                    b = new N(b);
                    b.currentTarget = a;
                    return c.call(a, b)
                };
                f = Ma(f);
                x[d] = [a, b, c, f, !1];
                a.addEventListener ? "mouseenter" == b && e ? a.addEventListener("mouseover", f, !1) : "mouseleave" == b && e ? a.addEventListener("mouseout",
                    f, !1) : "mousewheel" == b && "MozBoxSizing" in document.documentElement.style ? a.addEventListener("MozMousePixelScroll", f, !1) : a.addEventListener(b, f, !1) : a.attachEvent("on" + b, f)
            }
        }
    }

    function Ra(a) {
        a && ("string" == typeof a && (a = [a]), w(a, function(a) {
            if (a in x) {
                var c = x[a],
                    d = c[0],
                    e = c[1],
                    f = c[3],
                    c = c[4];
                d.removeEventListener ? d.removeEventListener(e, f, c) : d.detachEvent && d.detachEvent("on" + e, f);
                delete x[a]
            }
        }))
    };

    function Sa(a) {
        var b = [],
            c;
        for (c in a) Fa(c, a[c], b);
        b[0] = "";
        return b.join("")
    };
    var O = {}, Ta = [],
        H = new G,
        Ua = {};

    function Va() {
        w(Ta, function(a) {
            a()
        })
    }

    function Wa(a) {
        var b = ia(document.getElementsByTagName("yt:" + a));
        a = "yt-" + a;
        var c = document;
        a = c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : va(a);
        a = ia(a);
        return ha(b, a)
    }

    function P(a, b) {
        return "yt:" == a.tagName.toLowerCase().substr(0, 3) ? a.getAttribute(b) : a ? a.dataset ? a.dataset[Ia(b)] : a.getAttribute("data-" + b) : null
    }

    function Xa(a, b) {
        H.I.apply(H, arguments)
    };

    function Q(a, b, c) {
        this.b = b;
        this.j = this.a = null;
        this.s = this[p] || (this[p] = ++ca);
        this.d = 0;
        this.u = !1;
        this.t = [];
        this.g = null;
        this.D = c;
        this.F = {};
        b = document;
        if (a = n(a) ? b.getElementById(a) : a)
            if ("iframe" != a.tagName.toLowerCase() && (b = Ya(this, a), this.j = a, (c = a.parentNode) && c.replaceChild(b, a), a = b), this.a = a, this.a.id || (b = a = this.a, b = b[p] || (b[p] = ++ca), a.id = "widget" + b), O[this.a.id] = this, window.postMessage) {
                this.g = new G;
                Za(this);
                a = R(this.b, "events");
                for (var d in a) a.hasOwnProperty(d) && this.addEventListener(d, a[d]);
                for (var e in Ua) $a(this,
                    e)
            }
    }
    g = Q.prototype;
    g.R = function(a, b) {
        this.a.width = a;
        this.a.height = b;
        return this
    };
    g.P = function() {
        return this.a
    };
    g.J = function(a) {
        this.k(a.event, a)
    };
    g.addEventListener = function(a, b) {
        var c = b;
        "string" == typeof b && (c = function() {
            window[b].apply(window, arguments)
        });
        this.g.subscribe(a, c);
        ab(this, a);
        return this
    };

    function $a(a, b) {
        var c = b.split(".");
        if (2 != !c.length) {
            var d = c[1];
            a.D == c[0] && ab(a, d)
        }
    }
    g.destroy = function() {
        this.a.id && (O[this.a.id] = null);
        var a = this.g;
        a && "function" == typeof a.dispose && a.dispose();
        if (this.j) {
            var a = this.a,
                b = a.parentNode;
            b && b.replaceChild(this.j, a)
        } else(a = this.a) && a.parentNode && a.parentNode.removeChild(a);
        S && (S[this.s] = null);
        this.b = null;
        var a = this.a,
            c;
        for (c in x) x[c][0] == a && Ra(c);
        this.j = this.a = null
    };
    g.q = function() {
        return {}
    };

    function T(a, b, c) {
        c = c || [];
        c = Array.prototype.slice.call(c);
        b = {
            event: "command",
            func: b,
            args: c
        };
        a.u ? a.B(b) : a.t.push(b)
    }
    g.k = function(a, b) {
        if (!this.g.g) {
            var c = {
                target: this,
                data: b
            };
            this.g.I(a, c);
            Xa(this.D + "." + a, c)
        }
    };

    function Ya(a, b) {
        for (var c = document.createElement("iframe"), d = b.attributes, e = 0, f = d.length; e < f; e++) {
            var k = d[e].value;
            null != k && "" != k && "null" != k && c.setAttribute(d[e].name, k)
        }
        c.setAttribute("frameBorder", 0);
        c.setAttribute("allowfullscreen", 1);
        c.setAttribute("title", "YouTube " + R(a.b, "title"));
        (d = R(a.b, "width")) && c.setAttribute("width", d);
        (d = R(a.b, "height")) && c.setAttribute("height", d);
        var s = a.q();
        s.enablejsapi = window.postMessage ? 1 : 0;
        window.location.host && (s.origin = window.location.protocol + "//" + window.location.host);
        window.location.href && w(["debugjs", "debugcss"], function(a) {
            var b;
            b = window.location.href;
            var c = b.search(Ga),
                d;
            i: {
                d = 0;
                for (var e = a.length; 0 <= (d = b.indexOf(a, d)) && d < c;) {
                    var f = b.charCodeAt(d - 1);
                    if (38 == f || 63 == f)
                        if (f = b.charCodeAt(d + e), !f || 61 == f || 38 == f || 35 == f) break i;
                    d += e + 1
                }
                d = -1
            }
            if (0 > d) b = null;
            else {
                e = b.indexOf("&", d);
                if (0 > e || e > c) e = c;
                d += a.length + 1;
                b = decodeURIComponent(b.substr(d, e - d).replace(/\+/g, " "))
            }
            null === b || (s[a] = b)
        });
        c.src = R(a.b, "host") + a.C() + "?" + Sa(s);
        return c
    }
    g.G = function() {
        this.a && this.a.contentWindow ? this.B({
            event: "listening"
        }) : window.clearInterval(this.d)
    };

    function Za(a) {
        bb(a.b, a, a.s);
        a.d = La(q(a.G, a));
        Qa(a.a, "load", q(function() {
            window.clearInterval(this.d);
            this.d = La(q(this.G, this))
        }, a))
    }

    function ab(a, b) {
        a.F[b] || (a.F[b] = !0, T(a, "addEventListener", [b]))
    }
    g.B = function(a) {
        a.id = this.s;
        var b = [];
        D(new ya, a, b);
        a = b.join("");
        var b = this.b,
            c, d = Ea(this.a.src);
        c = d[1];
        var e = d[2],
            f = d[3],
            d = d[4],
            k = "";
        c && (k += c + ":");
        f && (k += "//", e && (k += e + "@"), k += f, d && (k += ":" + d));
        c = k;
        b.a && 0 == c.indexOf("http:") && (c = c.replace("http:", "https:"));
        this.a.contentWindow.postMessage(a, c)
    };
    var eb = "StopIteration" in h ? h.StopIteration : Error("StopIteration");

    function fb() {}
    fb.prototype.next = function() {
        throw eb;
    };
    fb.prototype.b = function() {
        return this
    };
    var gb = "corp.google.com googleplex.com youtube.com youtube-nocookie.com youtubeeducation.com prod.google.com sandbox.google.com docs.google.com drive.google.com mail.google.com plus.google.com play.google.com googlevideo.com talkgadget.google.com 101epmpngvqtgfsf73utp3aomcvh4be6-a-hangout-opensocial.googleusercontent.com mb33edaaot4tnevadfqhve4857kpq1rs-a-hangout-opensocial.googleusercontent.com ot5106nq9r49sc62k7h52rtfngv5j94j-a-hangout-opensocial.googleusercontent.com survey.g.doubleclick.net".split(" "),
        hb = "";

    function ib() {}
    new ib;
    new ib;
    var U = y,
        U = U.toLowerCase();
    if (-1 != U.indexOf("android") && !U.match(/android\D*(\d\.\d)[^\;|\)]*[\;\)]/)) {
        var jb = {
            cupcake: 1.5,
            donut: 1.6,
            eclair: 2,
            froyo: 2.2,
            gingerbread: 2.3,
            honeycomb: 3,
            "ice cream sandwich": 4,
            jellybean: 4.1
        }, kb = [],
            lb = 0,
            mb;
        for (mb in jb) kb[lb++] = mb;
        U.match("(" + kb.join("|") + ")")
    };
    var nb = l("yt.net.ping.workerUrl_") || null;
    r("yt.net.ping.workerUrl_", nb);
    var V = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
    q(V.clearResourceTimings || V.webkitClearResourceTimings || V.mozClearResourceTimings || V.msClearResourceTimings || V.oClearResourceTimings || aa, V);
    "https:" === window.location.protocol && m(V.getEntriesByType);
    var ob;
    var pb = y,
        qb = pb.match(/\((iPad|iPhone|iPod)( Simulator)?;/);
    if (!qb || 2 > qb.length) ob = void 0;
    else {
        var rb = pb.match(/\((iPad|iPhone|iPod)( Simulator)?; (U; )?CPU (iPhone )?OS (\d_\d)[_ ]/);
        ob = rb && 6 == rb.length ? Number(rb[5].replace("_", ".")) : 0
    }
    0 <= ob && 0 <= y.search("Safari") && y.search("Version");

    function sb() {};

    function tb() {}
    t(tb, sb);

    function W(a) {
        this.a = a
    }
    t(W, tb);
    W.prototype.isAvailable = function() {
        if (!this.a) return !1;
        try {
            return this.a.setItem("__sak", "1"), this.a.removeItem("__sak"), !0
        } catch (a) {
            return !1
        }
    };
    W.prototype.b = function(a) {
        var b = 0,
            c = this.a,
            d = new fb;
        d.next = function() {
            if (b >= c.length) throw eb;
            var d;
            d = c.key(b++);
            if (a) return d;
            d = c.getItem(d);
            if (!n(d)) throw "Storage mechanism: Invalid value was encountered";
            return d
        };
        return d
    };
    W.prototype.key = function(a) {
        return this.a.key(a)
    };

    function ub() {
        var a = null;
        try {
            a = window.localStorage || null
        } catch (b) {}
        this.a = a
    }
    t(ub, W);

    function vb() {
        var a = null;
        try {
            a = window.sessionStorage || null
        } catch (b) {}
        this.a = a
    }
    t(vb, W);
    (new ub).isAvailable();
    (new vb).isAvailable();

    function wb(a) {
        return (0 == a.search("cue") || 0 == a.search("load")) && "loadModule" != a
    }

    function xb(a) {
        return 0 == a.search("get") || 0 == a.search("is")
    };

    function X(a) {
        this.b = a || {};
        this.defaults = {};
        this.defaults.host = "http://www.youtube.com";
        this.defaults.title = "";
        this.a = !1;
        a = document.getElementById("www-widgetapi-script");
        if (this.a = !! ("https:" == document.location.protocol || a && 0 == a.src.indexOf("https:"))) {
            a = [this.b, window.YTConfig || {},
                this.defaults
            ];
            for (var b = 0; b < a.length; b++) a[b].host && (a[b].host = a[b].host.replace("http://", "https://"))
        }
    }
    var S = null;

    function R(a, b) {
        for (var c = [a.b, window.YTConfig || {},
            a.defaults
        ], d = 0; d < c.length; d++) {
            var e = c[d][b];
            if (void 0 != e) return e
        }
        return null
    }

    function bb(a, b, c) {
        S || (S = {}, Qa(window, "message", q(a.d, a)));
        S[c] = b
    }
    X.prototype.d = function(a) {
        var b;
        (b = a.origin == R(this, "host")) || ((b = a.origin) && b == hb ? b = !0 : (new RegExp("^(https?:)?//([a-z0-9-]{1,63}\\.)*(" + gb.join("|").replace(/\./g, ".") + ")(:[0-9]+)?([/?#]|$)", "i")).test(b) ? (hb = b, b = !0) : b = !1);
        if (b) {
            var c;
            try {
                c = xa(a.data)
            } catch (d) {
                return
            }
            if (a = S[c.id]) a.u = !0, a.u && (w(a.t, a.B, a), a.t.length = 0), a.J(c)
        }
    };

    function yb(a) {
        X.call(this, a);
        this.defaults.title = "video player";
        this.defaults.videoId = "";
        this.defaults.width = 640;
        this.defaults.height = 360
    }
    t(yb, X);

    function Y(a, b) {
        var c = new yb(b);
        Q.call(this, a, c, "player");
        this.o = {};
        this.i = {}
    }
    t(Y, Q);

    function zb(a) {
        if ("iframe" != a.tagName.toLowerCase()) {
            var b = P(a, "videoid");
            if (b) {
                var c = P(a, "width"),
                    d = P(a, "height");
                new Y(a, {
                    videoId: b,
                    width: c,
                    height: d
                })
            }
        }
    }
    g = Y.prototype;
    g.C = function() {
        return "/embed/" + R(this.b, "videoId")
    };
    g.q = function() {
        var a;
        if (R(this.b, "playerVars")) {
            a = R(this.b, "playerVars");
            var b = {}, c;
            for (c in a) b[c] = a[c];
            a = b
        } else a = {};
        return a
    };
    g.J = function(a) {
        var b = a.event;
        a = a.info;
        switch (b) {
            case "apiInfoDelivery":
                if (ba(a))
                    for (var c in a) this.i[c] = a[c];
                break;
            case "infoDelivery":
                Ab(this, a);
                break;
            case "initialDelivery":
                window.clearInterval(this.d);
                this.o = {};
                this.i = {};
                Bb(this, a.apiInterface);
                Ab(this, a);
                break;
            default:
                this.k(b, a)
        }
    };

    function Ab(a, b) {
        if (ba(b))
            for (var c in b) a.o[c] = b[c]
    }

    function Bb(a, b) {
        w(b, function(a) {
            this[a] || (wb(a) ? this[a] = function() {
                this.o = {};
                this.i = {};
                T(this, a, arguments);
                return this
            } : xb(a) ? this[a] = function() {
                var b = 0;
                0 == a.search("get") ? b = 3 : 0 == a.search("is") && (b = 2);
                return this.o[a.charAt(b).toLowerCase() + a.substr(b + 1)]
            } : this[a] = function() {
                T(this, a, arguments);
                return this
            })
        }, a)
    }
    g.U = function() {
        var a = this.a.cloneNode(!1),
            b = this.o.videoData,
            c = R(this.b, "host");
        a.src = b && b.video_id ? c + "/embed/" + b.video_id : a.src;
        b = document.createElement("div");
        b.appendChild(a);
        return b.innerHTML
    };
    g.T = function(a) {
        return this.i.namespaces ? a ? this.i[a].options || [] : this.i.namespaces || [] : []
    };
    g.S = function(a, b) {
        if (this.i.namespaces && a && b) return this.i[a][b]
    };

    function Cb(a) {
        X.call(this, a);
        this.defaults.title = "Thumbnail";
        this.defaults.videoId = "";
        this.defaults.width = 120;
        this.defaults.height = 68
    }
    t(Cb, X);

    function Z(a, b) {
        var c = new Cb(b);
        Q.call(this, a, c, "thumbnail")
    }
    t(Z, Q);

    function Db(a) {
        if ("iframe" != a.tagName.toLowerCase()) {
            var b = P(a, "videoid");
            if (b) {
                b = {
                    videoId: b,
                    events: {}
                };
                b.width = P(a, "width");
                b.height = P(a, "height");
                b.thumbWidth = P(a, "thumb-width");
                b.thumbHeight = P(a, "thumb-height");
                b.thumbAlign = P(a, "thumb-align");
                var c = P(a, "onclick");
                c && (b.events.onClick = c);
                new Z(a, b)
            }
        }
    }
    Z.prototype.C = function() {
        return "/embed/" + R(this.b, "videoId")
    };
    Z.prototype.q = function() {
        return {
            player: 0,
            thumb_width: R(this.b, "thumbWidth"),
            thumb_height: R(this.b, "thumbHeight"),
            thumb_align: R(this.b, "thumbAlign")
        }
    };
    Z.prototype.k = function(a, b) {
        Z.A.k.call(this, a, b ? b.info : void 0)
    };

    function Eb(a) {
        X.call(this, a);
        this.defaults.host = "https://www.youtube.com";
        this.defaults.title = "upload widget";
        this.defaults.width = 640;
        this.defaults.height = .67 * R(this, "width")
    }
    t(Eb, X);

    function $(a, b) {
        var c = new Eb(b);
        Q.call(this, a, c, "upload")
    }
    t($, Q);
    g = $.prototype;
    g.C = function() {
        return "/upload_embed"
    };
    g.q = function() {
        var a = {}, b = R(this.b, "webcamOnly");
        null != b && (a.webcam_only = b);
        return a
    };
    g.k = function(a, b) {
        $.A.k.call(this, a, b);
        "onApiReady" == a && T(this, "hostWindowReady")
    };
    g.K = function(a) {
        T(this, "setVideoDescription", arguments)
    };
    g.M = function(a) {
        T(this, "setVideoKeywords", arguments)
    };
    g.N = function(a) {
        T(this, "setVideoPrivacy", arguments)
    };
    g.L = function(a) {
        T(this, "setVideoDraftPrivacy", arguments)
    };
    g.O = function(a) {
        T(this, "setVideoTitle", arguments)
    };
    r("YT.PlayerState.UNSTARTED", -1);
    r("YT.PlayerState.ENDED", 0);
    r("YT.PlayerState.PLAYING", 1);
    r("YT.PlayerState.PAUSED", 2);
    r("YT.PlayerState.BUFFERING", 3);
    r("YT.PlayerState.CUED", 5);
    r("YT.UploadWidgetEvent.API_READY", "onApiReady");
    r("YT.UploadWidgetEvent.UPLOAD_SUCCESS", "onUploadSuccess");
    r("YT.UploadWidgetEvent.PROCESSING_COMPLETE", "onProcessingComplete");
    r("YT.UploadWidgetEvent.STATE_CHANGE", "onStateChange");
    r("YT.UploadWidgetState.IDLE", 0);
    r("YT.UploadWidgetState.PENDING", 1);
    r("YT.UploadWidgetState.ERROR", 2);
    r("YT.UploadWidgetState.PLAYBACK", 3);
    r("YT.UploadWidgetState.RECORDING", 4);
    r("YT.UploadWidgetState.STOPPED", 5);
    r("YT.get", function(a) {
        return O[a]
    });
    r("YT.scan", Va);
    r("YT.subscribe", function(a, b, c) {
        H.subscribe(a, b, c);
        Ua[a] = !0;
        for (var d in O) $a(O[d], a)
    });
    r("YT.unsubscribe", function(a, b, c) {
        Ba(a, b, c)
    });
    r("YT.Player", Y);
    r("YT.Thumbnail", Z);
    r("YT.UploadWidget", $);
    Q.prototype.destroy = Q.prototype.destroy;
    Q.prototype.setSize = Q.prototype.R;
    Q.prototype.getIframe = Q.prototype.P;
    Q.prototype.addEventListener = Q.prototype.addEventListener;
    Y.prototype.getVideoEmbedCode = Y.prototype.U;
    Y.prototype.getOptions = Y.prototype.T;
    Y.prototype.getOption = Y.prototype.S;
    $.prototype.setVideoDescription = $.prototype.K;
    $.prototype.setVideoKeywords = $.prototype.M;
    $.prototype.setVideoPrivacy = $.prototype.N;
    $.prototype.setVideoTitle = $.prototype.O;
    $.prototype.setVideoDraftPrivacy = $.prototype.L;
    Ta.push(function() {
        var a = Wa("player");
        w(a, zb)
    });
    Ta.push(function() {
        var a = Wa("thumbnail");
        w(a, Db)
    });
    YTConfig.parsetags && "onload" != YTConfig.parsetags || Va();
    var Fb = l("onYTReady");
    Fb && Fb();
    var Gb = l("onYouTubeIframeAPIReady");
    Gb && Gb();
    var Hb = l("onYouTubePlayerAPIReady");
    Hb && Hb();
})();
