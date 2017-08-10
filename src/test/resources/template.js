;
/* module-key = 'com.atlassian.tutorial.dianrong.plugin:dianrong.plugin-resources', location = '/js/Chart.js' */
/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
(function () {
    var A = this, J = A.Chart;
    var G = function (X) {
        var Z = this;
        this.canvas = X.canvas;
        this.ctx = X;
        var W = function (aa, ab) {
            if (aa["offset" + ab]) {
                return aa["offset" + ab]
            } else {
                return document.defaultView.getComputedStyle(aa).getPropertyValue(ab)
            }
        };
        var Y = this.width = W(X.canvas, "Width");
        var V = this.height = W(X.canvas, "Height");
        X.canvas.width = Y;
        X.canvas.height = V;
        var Y = this.width = X.canvas.width;
        var V = this.height = X.canvas.height;
        this.aspectRatio = this.width / this.height;
        H.retinaScale(this);
        return this
    };
    G.defaults = {
        global: {
            animation: true,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            showScale: true,
            scaleOverride: false,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: true,
            scaleLabel: "<%=value%>",
            scaleIntegersOnly: true,
            scaleBeginAtZero: false,
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            responsive: false,
            maintainAspectRatio: true,
            showTooltips: true,
            customTooltips: false,
            tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],
            tooltipFillColor: "rgba(0,0,0,0.8)",
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipFontSize: 14,
            tooltipFontStyle: "normal",
            tooltipFontColor: "#fff",
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 14,
            tooltipTitleFontStyle: "bold",
            tooltipTitleFontColor: "#fff",
            tooltipYPadding: 6,
            tooltipXPadding: 6,
            tooltipCaretSize: 8,
            tooltipCornerRadius: 6,
            tooltipXOffset: 10,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            multiTooltipTemplate: "<%= value %>",
            multiTooltipKeyBackground: "#fff",
            onAnimationProgress: function () {
            },
            onAnimationComplete: function () {
            }
        }
    };
    G.types = {};
    var H = G.helpers = {};
    var M = H.each = function (Y, aa, W) {
        var V = Array.prototype.slice.call(arguments, 3);
        if (Y) {
            if (Y.length === +Y.length) {
                var X;
                for (X = 0; X < Y.length; X++) {
                    aa.apply(W, [Y[X], X].concat(V))
                }
            } else {
                for (var Z in Y) {
                    aa.apply(W, [Y[Z], Z].concat(V))
                }
            }
        }
    }, y = H.clone = function (W) {
        var V = {};
        M(W, function (Y, X) {
            if (W.hasOwnProperty(X)) {
                V[X] = Y
            }
        });
        return V
    }, s = H.extend = function (V) {
        M(Array.prototype.slice.call(arguments, 1), function (W) {
            M(W, function (Y, X) {
                if (W.hasOwnProperty(X)) {
                    V[X] = Y
                }
            })
        });
        return V
    }, K = H.merge = function (X, W) {
        var V = Array.prototype.slice.call(arguments, 0);
        V.unshift({});
        return s.apply(null, V)
    }, v = H.indexOf = function (V, X) {
        if (Array.prototype.indexOf) {
            return V.indexOf(X)
        } else {
            for (var W = 0; W < V.length; W++) {
                if (V[W] === X) {
                    return W
                }
            }
            return -1
        }
    }, m = H.where = function (X, W) {
        var V = [];
        H.each(X, function (Y) {
            if (W(Y)) {
                V.push(Y)
            }
        });
        return V
    }, e = H.findNextWhere = function (V, Z, Y) {
        if (!Y) {
            Y = -1
        }
        for (var X = Y + 1; X < V.length; X++) {
            var W = V[X];
            if (Z(W)) {
                return W
            }
        }
    }, D = H.findPreviousWhere = function (V, Z, Y) {
        if (!Y) {
            Y = V.length
        }
        for (var X = Y - 1; X >= 0; X--) {
            var W = V[X];
            if (Z(W)) {
                return W
            }
        }
    }, h = H.inherits = function (W) {
        var V = this;
        var X = (W && W.hasOwnProperty("constructor")) ? W.constructor : function () {
                return V.apply(this, arguments)
            };
        var Y = function () {
            this.constructor = X
        };
        Y.prototype = V.prototype;
        X.prototype = new Y();
        X.extend = h;
        if (W) {
            s(X.prototype, W)
        }
        X.__super__ = V.prototype;
        return X
    }, P = H.noop = function () {
    }, j = H.uid = (function () {
        var V = 0;
        return function () {
            return "chart-" + V++
        }
    })(), r = H.warn = function (V) {
        if (window.console && typeof window.console.warn == "function") {
            console.warn(V)
        }
    }, k = H.amd = (typeof define == "function" && define.amd), T = H.isNumber = function (V) {
        return !isNaN(parseFloat(V)) && isFinite(V)
    }, z = H.max = function (V) {
        return Math.max.apply(Math, V)
    }, S = H.min = function (V) {
        return Math.min.apply(Math, V)
    }, I = H.cap = function (V, X, W) {
        if (T(X)) {
            if (V > X) {
                return X
            }
        } else {
            if (T(W)) {
                if (V < W) {
                    return W
                }
            }
        }
        return V
    }, F = H.getDecimalPlaces = function (V) {
        if (V % 1 !== 0 && T(V)) {
            return V.toString().split(".")[1].length
        } else {
            return 0
        }
    }, L = H.radians = function (V) {
        return V * (Math.PI / 180)
    }, a = H.getAngleFromPoint = function (Y, W) {
        var Z = W.x - Y.x, V = W.y - Y.y, X = Math.sqrt(Z * Z + V * V);
        var aa = Math.PI * 2 + Math.atan2(V, Z);
        if (Z < 0 && V < 0) {
            aa += Math.PI * 2
        }
        return {angle: aa, distance: X}
    }, q = H.aliasPixel = function (V) {
        return (V % 2 === 0) ? 0 : 0.5
    }, b = H.splineCurve = function (W, Z, ab, V) {
        var aa = Math.sqrt(Math.pow(Z.x - W.x, 2) + Math.pow(Z.y - W.y, 2)), ac = Math.sqrt(Math.pow(ab.x - Z.x, 2) + Math.pow(ab.y - Z.y, 2)), Y = V * aa / (aa + ac), X = V * ac / (aa + ac);
        return {
            inner: {x: Z.x - Y * (ab.x - W.x), y: Z.y - Y * (ab.y - W.y)},
            outer: {x: Z.x + X * (ab.x - W.x), y: Z.y + X * (ab.y - W.y)}
        }
    }, R = H.calculateOrderOfMagnitude = function (V) {
        return Math.floor(Math.log(V) / Math.LN10)
    }, n = H.calculateScaleRange = function (W, ab, V, X, aa) {
        var ah = 2, ac = Math.floor(ab / (V * 1.5)), al = (ah >= ac);
        var ad = z(W), aj = S(W);
        if (ad === aj) {
            ad += 0.5;
            if (aj >= 0.5 && !X) {
                aj -= 0.5
            } else {
                ad += 0.5
            }
        }
        var af = Math.abs(ad - aj), ag = R(af), Y = Math.ceil(ad / (1 * Math.pow(10, ag))) * Math.pow(10, ag), ai = (X) ? 0 : Math.floor(aj / (1 * Math.pow(10, ag))) * Math.pow(10, ag), Z = Y - ai, ae = Math.pow(10, ag), ak = Math.round(Z / ae);
        while ((ak > ac || (ak * 2) < ac) && !al) {
            if (ak > ac) {
                ae *= 2;
                ak = Math.round(Z / ae);
                if (ak % 1 !== 0) {
                    al = true
                }
            } else {
                if (aa && ag >= 0) {
                    if (ae / 2 % 1 === 0) {
                        ae /= 2;
                        ak = Math.round(Z / ae)
                    } else {
                        break
                    }
                } else {
                    ae /= 2;
                    ak = Math.round(Z / ae)
                }
            }
        }
        if (al) {
            ak = ah;
            ae = Z / ak
        }
        return {steps: ak, stepValue: ae, min: ai, max: ai + (ak * ae)}
    }, i = H.template = function (Y, X) {
        if (Y instanceof Function) {
            return Y(X)
        }
        var W = {};

        function V(ab, aa) {
            var Z = !/\W/.test(ab) ? W[ab] = W[ab] : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + ab.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
            return aa ? Z(aa) : Z
        }

        return V(Y, X)
    }, u = H.generateLabels = function (Y, W, Z, V) {
        var X = new Array(W);
        if (labelTemplateString) {
            M(X, function (ab, aa) {
                X[aa] = i(Y, {value: (Z + (V * (aa + 1)))})
            })
        }
        return X
    }, N = H.easingEffects = {
        linear: function (V) {
            return V
        }, easeInQuad: function (V) {
            return V * V
        }, easeOutQuad: function (V) {
            return -1 * V * (V - 2)
        }, easeInOutQuad: function (V) {
            if ((V /= 1 / 2) < 1) {
                return 1 / 2 * V * V
            }
            return -1 / 2 * ((--V) * (V - 2) - 1)
        }, easeInCubic: function (V) {
            return V * V * V
        }, easeOutCubic: function (V) {
            return 1 * ((V = V / 1 - 1) * V * V + 1)
        }, easeInOutCubic: function (V) {
            if ((V /= 1 / 2) < 1) {
                return 1 / 2 * V * V * V
            }
            return 1 / 2 * ((V -= 2) * V * V + 2)
        }, easeInQuart: function (V) {
            return V * V * V * V
        }, easeOutQuart: function (V) {
            return -1 * ((V = V / 1 - 1) * V * V * V - 1)
        }, easeInOutQuart: function (V) {
            if ((V /= 1 / 2) < 1) {
                return 1 / 2 * V * V * V * V
            }
            return -1 / 2 * ((V -= 2) * V * V * V - 2)
        }, easeInQuint: function (V) {
            return 1 * (V /= 1) * V * V * V * V
        }, easeOutQuint: function (V) {
            return 1 * ((V = V / 1 - 1) * V * V * V * V + 1)
        }, easeInOutQuint: function (V) {
            if ((V /= 1 / 2) < 1) {
                return 1 / 2 * V * V * V * V * V
            }
            return 1 / 2 * ((V -= 2) * V * V * V * V + 2)
        }, easeInSine: function (V) {
            return -1 * Math.cos(V / 1 * (Math.PI / 2)) + 1
        }, easeOutSine: function (V) {
            return 1 * Math.sin(V / 1 * (Math.PI / 2))
        }, easeInOutSine: function (V) {
            return -1 / 2 * (Math.cos(Math.PI * V / 1) - 1)
        }, easeInExpo: function (V) {
            return (V === 0) ? 1 : 1 * Math.pow(2, 10 * (V / 1 - 1))
        }, easeOutExpo: function (V) {
            return (V === 1) ? 1 : 1 * (-Math.pow(2, -10 * V / 1) + 1)
        }, easeInOutExpo: function (V) {
            if (V === 0) {
                return 0
            }
            if (V === 1) {
                return 1
            }
            if ((V /= 1 / 2) < 1) {
                return 1 / 2 * Math.pow(2, 10 * (V - 1))
            }
            return 1 / 2 * (-Math.pow(2, -10 * --V) + 2)
        }, easeInCirc: function (V) {
            if (V >= 1) {
                return V
            }
            return -1 * (Math.sqrt(1 - (V /= 1) * V) - 1)
        }, easeOutCirc: function (V) {
            return 1 * Math.sqrt(1 - (V = V / 1 - 1) * V)
        }, easeInOutCirc: function (V) {
            if ((V /= 1 / 2) < 1) {
                return -1 / 2 * (Math.sqrt(1 - V * V) - 1)
            }
            return 1 / 2 * (Math.sqrt(1 - (V -= 2) * V) + 1)
        }, easeInElastic: function (W) {
            var X = 1.70158;
            var Y = 0;
            var V = 1;
            if (W === 0) {
                return 0
            }
            if ((W /= 1) == 1) {
                return 1
            }
            if (!Y) {
                Y = 1 * 0.3
            }
            if (V < Math.abs(1)) {
                V = 1;
                X = Y / 4
            } else {
                X = Y / (2 * Math.PI) * Math.asin(1 / V)
            }
            return -(V * Math.pow(2, 10 * (W -= 1)) * Math.sin((W * 1 - X) * (2 * Math.PI) / Y))
        }, easeOutElastic: function (W) {
            var X = 1.70158;
            var Y = 0;
            var V = 1;
            if (W === 0) {
                return 0
            }
            if ((W /= 1) == 1) {
                return 1
            }
            if (!Y) {
                Y = 1 * 0.3
            }
            if (V < Math.abs(1)) {
                V = 1;
                X = Y / 4
            } else {
                X = Y / (2 * Math.PI) * Math.asin(1 / V)
            }
            return V * Math.pow(2, -10 * W) * Math.sin((W * 1 - X) * (2 * Math.PI) / Y) + 1
        }, easeInOutElastic: function (W) {
            var X = 1.70158;
            var Y = 0;
            var V = 1;
            if (W === 0) {
                return 0
            }
            if ((W /= 1 / 2) == 2) {
                return 1
            }
            if (!Y) {
                Y = 1 * (0.3 * 1.5)
            }
            if (V < Math.abs(1)) {
                V = 1;
                X = Y / 4
            } else {
                X = Y / (2 * Math.PI) * Math.asin(1 / V)
            }
            if (W < 1) {
                return -0.5 * (V * Math.pow(2, 10 * (W -= 1)) * Math.sin((W * 1 - X) * (2 * Math.PI) / Y))
            }
            return V * Math.pow(2, -10 * (W -= 1)) * Math.sin((W * 1 - X) * (2 * Math.PI) / Y) * 0.5 + 1
        }, easeInBack: function (V) {
            var W = 1.70158;
            return 1 * (V /= 1) * V * ((W + 1) * V - W)
        }, easeOutBack: function (V) {
            var W = 1.70158;
            return 1 * ((V = V / 1 - 1) * V * ((W + 1) * V + W) + 1)
        }, easeInOutBack: function (V) {
            var W = 1.70158;
            if ((V /= 1 / 2) < 1) {
                return 1 / 2 * (V * V * (((W *= (1.525)) + 1) * V - W))
            }
            return 1 / 2 * ((V -= 2) * V * (((W *= (1.525)) + 1) * V + W) + 2)
        }, easeInBounce: function (V) {
            return 1 - N.easeOutBounce(1 - V)
        }, easeOutBounce: function (V) {
            if ((V /= 1) < (1 / 2.75)) {
                return 1 * (7.5625 * V * V)
            } else {
                if (V < (2 / 2.75)) {
                    return 1 * (7.5625 * (V -= (1.5 / 2.75)) * V + 0.75)
                } else {
                    if (V < (2.5 / 2.75)) {
                        return 1 * (7.5625 * (V -= (2.25 / 2.75)) * V + 0.9375)
                    } else {
                        return 1 * (7.5625 * (V -= (2.625 / 2.75)) * V + 0.984375)
                    }
                }
            }
        }, easeInOutBounce: function (V) {
            if (V < 1 / 2) {
                return N.easeInBounce(V * 2) * 0.5
            }
            return N.easeOutBounce(V * 2 - 1) * 0.5 + 1 * 0.5
        }
    }, d = H.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (V) {
                return window.setTimeout(V, 1000 / 60)
            }
    })(), O = H.cancelAnimFrame = (function () {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (V) {
                return window.clearTimeout(V, 1000 / 60)
            }
    })(), B = H.animationLoop = function (aa, V, Z, ab, Y, ad) {
        var W = 0, ac = N[Z] || N.linear;
        var X = function () {
            W++;
            var af = W / V;
            var ae = ac(af);
            aa.call(ad, ae, af, W);
            ab.call(ad, ae, af);
            if (W < V) {
                ad.animationFrame = d(X)
            } else {
                Y.apply(ad)
            }
        };
        d(X)
    }, C = H.getRelativePosition = function (V) {
        var Z, Y;
        var aa = V.originalEvent || V, X = V.currentTarget || V.srcElement, W = X.getBoundingClientRect();
        if (aa.touches) {
            Z = aa.touches[0].clientX - W.left;
            Y = aa.touches[0].clientY - W.top
        } else {
            Z = aa.clientX - W.left;
            Y = aa.clientY - W.top
        }
        return {x: Z, y: Y}
    }, p = H.addEvent = function (W, V, X) {
        if (W.addEventListener) {
            W.addEventListener(V, X)
        } else {
            if (W.attachEvent) {
                W.attachEvent("on" + V, X)
            } else {
                W["on" + V] = X
            }
        }
    }, c = H.removeEvent = function (X, V, W) {
        if (X.removeEventListener) {
            X.removeEventListener(V, W, false)
        } else {
            if (X.detachEvent) {
                X.detachEvent("on" + V, W)
            } else {
                X["on" + V] = P
            }
        }
    }, Q = H.bindEvents = function (V, X, W) {
        if (!V.events) {
            V.events = {}
        }
        M(X, function (Y) {
            V.events[Y] = function () {
                W.apply(V, arguments)
            };
            p(V.chart.canvas, Y, V.events[Y])
        })
    }, U = H.unbindEvents = function (V, W) {
        M(W, function (Y, X) {
            c(V.chart.canvas, X, Y)
        })
    }, t = H.getMaximumWidth = function (W) {
        var V = W.parentNode;
        return V.clientWidth
    }, o = H.getMaximumHeight = function (W) {
        var V = W.parentNode;
        return V.clientHeight
    }, x = H.getMaximumSize = H.getMaximumWidth, g = H.retinaScale = function (Y) {
        var W = Y.ctx, X = Y.canvas.width, V = Y.canvas.height;
        if (window.devicePixelRatio) {
            W.canvas.style.width = X + "px";
            W.canvas.style.height = V + "px";
            W.canvas.height = V * window.devicePixelRatio;
            W.canvas.width = X * window.devicePixelRatio;
            W.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
    }, E = H.clear = function (V) {
        V.ctx.clearRect(0, 0, V.width, V.height)
    }, f = H.fontString = function (W, X, V) {
        return X + " " + W + "px " + V
    }, w = H.longestText = function (V, W, Y) {
        V.font = W;
        var X = 0;
        M(Y, function (Z) {
            var aa = V.measureText(Z).width;
            X = (aa > X) ? aa : X
        });
        return X
    }, l = H.drawRoundedRectangle = function (Y, X, aa, Z, W, V) {
        Y.beginPath();
        Y.moveTo(X + V, aa);
        Y.lineTo(X + Z - V, aa);
        Y.quadraticCurveTo(X + Z, aa, X + Z, aa + V);
        Y.lineTo(X + Z, aa + W - V);
        Y.quadraticCurveTo(X + Z, aa + W, X + Z - V, aa + W);
        Y.lineTo(X + V, aa + W);
        Y.quadraticCurveTo(X, aa + W, X, aa + W - V);
        Y.lineTo(X, aa + V);
        Y.quadraticCurveTo(X, aa, X + V, aa);
        Y.closePath()
    };
    G.instances = {};
    G.Type = function (X, V, W) {
        this.options = V;
        this.chart = W;
        this.id = j();
        G.instances[this.id] = this;
        if (V.responsive) {
            this.resize()
        }
        this.initialize.call(this, X)
    };
    s(G.Type.prototype, {
        initialize: function () {
            return this
        }, clear: function () {
            E(this.chart);
            return this
        }, stop: function () {
            O(this.animationFrame);
            return this
        }, resize: function (Y) {
            this.stop();
            var W = this.chart.canvas, X = t(this.chart.canvas), V = this.options.maintainAspectRatio ? X / this.chart.aspectRatio : o(this.chart.canvas);
            W.width = this.chart.width = X;
            W.height = this.chart.height = V;
            g(this.chart);
            if (typeof Y === "function") {
                Y.apply(this, Array.prototype.slice.call(arguments, 1))
            }
            return this
        }, reflow: P, render: function (V) {
            if (V) {
                this.reflow()
            }
            if (this.options.animation && !V) {
                H.animationLoop(this.draw, this.options.animationSteps, this.options.animationEasing, this.options.onAnimationProgress, this.options.onAnimationComplete, this)
            } else {
                this.draw();
                this.options.onAnimationComplete.call(this)
            }
            return this
        }, generateLegend: function () {
            return i(this.options.legendTemplate, this)
        }, destroy: function () {
            this.clear();
            U(this, this.events);
            var V = this.chart.canvas;
            V.width = this.chart.width;
            V.height = this.chart.height;
            if (V.style.removeProperty) {
                V.style.removeProperty("width");
                V.style.removeProperty("height")
            } else {
                V.style.removeAttribute("width");
                V.style.removeAttribute("height")
            }
            delete G.instances[this.id]
        }, showTooltip: function (W, X) {
            if (typeof this.activeElements === "undefined") {
                this.activeElements = []
            }
            var ac = (function (af) {
                var ae = false;
                if (af.length !== this.activeElements.length) {
                    ae = true;
                    return ae
                }
                M(af, function (ah, ag) {
                    if (ah !== this.activeElements[ag]) {
                        ae = true
                    }
                }, this);
                return ae
            }).call(this, W);
            if (!ac && !X) {
                return
            } else {
                this.activeElements = W
            }
            this.draw();
            if (this.options.customTooltips) {
                this.options.customTooltips(false)
            }
            if (W.length > 0) {
                if (this.datasets && this.datasets.length > 1) {
                    var ab, aa;
                    for (var Y = this.datasets.length - 1; Y >= 0; Y--) {
                        ab = this.datasets[Y].points || this.datasets[Y].bars || this.datasets[Y].segments;
                        aa = v(ab, W[0]);
                        if (aa !== -1) {
                            break
                        }
                    }
                    var Z = [], V = [], ad = (function (aj) {
                        var ae = [], ak, am = [], ah = [], ai, ag, af, al;
                        H.each(this.datasets, function (an) {
                            ak = an.points || an.bars || an.segments;
                            if (ak[aa] && ak[aa].hasValue()) {
                                ae.push(ak[aa])
                            }
                        });
                        H.each(ae, function (an) {
                            am.push(an.x);
                            ah.push(an.y);
                            Z.push(H.template(this.options.multiTooltipTemplate, an));
                            V.push({
                                fill: an._saved.fillColor || an.fillColor,
                                stroke: an._saved.strokeColor || an.strokeColor
                            })
                        }, this);
                        al = S(ah);
                        ag = z(ah);
                        af = S(am);
                        ai = z(am);
                        return {x: (af > this.chart.width / 2) ? af : ai, y: (al + ag) / 2}
                    }).call(this, aa);
                    new G.MultiTooltip({
                        x: ad.x,
                        y: ad.y,
                        xPadding: this.options.tooltipXPadding,
                        yPadding: this.options.tooltipYPadding,
                        xOffset: this.options.tooltipXOffset,
                        fillColor: this.options.tooltipFillColor,
                        textColor: this.options.tooltipFontColor,
                        fontFamily: this.options.tooltipFontFamily,
                        fontStyle: this.options.tooltipFontStyle,
                        fontSize: this.options.tooltipFontSize,
                        titleTextColor: this.options.tooltipTitleFontColor,
                        titleFontFamily: this.options.tooltipTitleFontFamily,
                        titleFontStyle: this.options.tooltipTitleFontStyle,
                        titleFontSize: this.options.tooltipTitleFontSize,
                        cornerRadius: this.options.tooltipCornerRadius,
                        labels: Z,
                        legendColors: V,
                        legendColorBackground: this.options.multiTooltipKeyBackground,
                        title: W[0].label,
                        chart: this.chart,
                        ctx: this.chart.ctx,
                        custom: this.options.customTooltips
                    }).draw()
                } else {
                    M(W, function (ae) {
                        var af = ae.tooltipPosition();
                        new G.Tooltip({
                            x: Math.round(af.x),
                            y: Math.round(af.y),
                            xPadding: this.options.tooltipXPadding,
                            yPadding: this.options.tooltipYPadding,
                            fillColor: this.options.tooltipFillColor,
                            textColor: this.options.tooltipFontColor,
                            fontFamily: this.options.tooltipFontFamily,
                            fontStyle: this.options.tooltipFontStyle,
                            fontSize: this.options.tooltipFontSize,
                            caretHeight: this.options.tooltipCaretSize,
                            cornerRadius: this.options.tooltipCornerRadius,
                            text: i(this.options.tooltipTemplate, ae),
                            chart: this.chart,
                            custom: this.options.customTooltips
                        }).draw()
                    }, this)
                }
            }
            return this
        }, toBase64Image: function () {
            return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
        }
    });
    G.Type.extend = function (Z) {
        var Y = this;
        var X = function () {
            return Y.apply(this, arguments)
        };
        X.prototype = y(Y.prototype);
        s(X.prototype, Z);
        X.extend = G.Type.extend;
        if (Z.name || Y.prototype.name) {
            var W = Z.name || Y.prototype.name;
            var V = (G.defaults[Y.prototype.name]) ? y(G.defaults[Y.prototype.name]) : {};
            G.defaults[W] = s(V, Z.defaults);
            G.types[W] = X;
            G.prototype[W] = function (ac, ab) {
                var aa = K(G.defaults.global, G.defaults[W], ab || {});
                return new X(ac, aa, this)
            }
        } else {
            r("Name not provided for this chart, so it hasn't been registered")
        }
        return Y
    };
    G.Element = function (V) {
        s(this, V);
        this.initialize.apply(this, arguments);
        this.save()
    };
    s(G.Element.prototype, {
        initialize: function () {
        }, restore: function (V) {
            if (!V) {
                s(this, this._saved)
            } else {
                M(V, function (W) {
                    this[W] = this._saved[W]
                }, this)
            }
            return this
        }, save: function () {
            this._saved = y(this);
            delete this._saved._saved;
            return this
        }, update: function (V) {
            M(V, function (X, W) {
                this._saved[W] = this[W];
                this[W] = X
            }, this);
            return this
        }, transition: function (V, W) {
            M(V, function (Y, X) {
                this[X] = ((Y - this._saved[X]) * W) + this._saved[X]
            }, this);
            return this
        }, tooltipPosition: function () {
            return {x: this.x, y: this.y}
        }, hasValue: function () {
            return T(this.value)
        }
    });
    G.Element.extend = h;
    G.Point = G.Element.extend({
        display: true, inRange: function (V, X) {
            var W = this.hitDetectionRadius + this.radius;
            return ((Math.pow(V - this.x, 2) + Math.pow(X - this.y, 2)) < Math.pow(W, 2))
        }, draw: function () {
            if (this.display) {
                var V = this.ctx;
                V.beginPath();
                V.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                V.closePath();
                V.strokeStyle = this.strokeColor;
                V.lineWidth = this.strokeWidth;
                V.fillStyle = this.fillColor;
                V.fill();
                V.stroke()
            }
        }
    });
    G.Arc = G.Element.extend({
        inRange: function (W, Z) {
            var V = H.getAngleFromPoint(this, {x: W, y: Z});
            var Y = (V.angle >= this.startAngle && V.angle <= this.endAngle), X = (V.distance >= this.innerRadius && V.distance <= this.outerRadius);
            return (Y && X)
        }, tooltipPosition: function () {
            var V = this.startAngle + ((this.endAngle - this.startAngle) / 2), W = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
            return {x: this.x + (Math.cos(V) * W), y: this.y + (Math.sin(V) * W)}
        }, draw: function (X) {
            var W = X || 1;
            var V = this.ctx;
            V.beginPath();
            V.arc(this.x, this.y, this.outerRadius, this.startAngle, this.endAngle);
            V.arc(this.x, this.y, this.innerRadius, this.endAngle, this.startAngle, true);
            V.closePath();
            V.strokeStyle = this.strokeColor;
            V.lineWidth = this.strokeWidth;
            V.fillStyle = this.fillColor;
            V.fill();
            V.lineJoin = "bevel";
            if (this.showStroke) {
                V.stroke()
            }
        }
    });
    G.Rectangle = G.Element.extend({
        draw: function () {
            var V = this.ctx, aa = this.width / 2, X = this.x - aa, W = this.x + aa, Z = this.base - (this.base - this.y), Y = this.strokeWidth / 2;
            if (this.showStroke) {
                X += Y;
                W -= Y;
                Z += Y
            }
            V.beginPath();
            V.fillStyle = this.fillColor;
            V.strokeStyle = this.strokeColor;
            V.lineWidth = this.strokeWidth;
            V.moveTo(X, this.base);
            V.lineTo(X, Z);
            V.lineTo(W, Z);
            V.lineTo(W, this.base);
            V.fill();
            if (this.showStroke) {
                V.stroke()
            }
        }, height: function () {
            return this.base - this.y
        }, inRange: function (V, W) {
            return (V >= this.x - this.width / 2 && V <= this.x + this.width / 2) && (W >= this.y && W <= this.base)
        }
    });
    G.Tooltip = G.Element.extend({
        draw: function () {
            var Y = this.chart.ctx;
            Y.font = f(this.fontSize, this.fontStyle, this.fontFamily);
            this.xAlign = "center";
            this.yAlign = "above";
            var X = this.caretPadding = 2;
            var Z = Y.measureText(this.text).width + 2 * this.xPadding, W = this.fontSize + 2 * this.yPadding, aa = W + this.caretHeight + X;
            if (this.x + Z / 2 > this.chart.width) {
                this.xAlign = "left"
            } else {
                if (this.x - Z / 2 < 0) {
                    this.xAlign = "right"
                }
            }
            if (this.y - aa < 0) {
                this.yAlign = "below"
            }
            var V = this.x - Z / 2, ab = this.y - aa;
            Y.fillStyle = this.fillColor;
            if (this.custom) {
                this.custom(this)
            } else {
                switch (this.yAlign) {
                    case"above":
                        Y.beginPath();
                        Y.moveTo(this.x, this.y - X);
                        Y.lineTo(this.x + this.caretHeight, this.y - (X + this.caretHeight));
                        Y.lineTo(this.x - this.caretHeight, this.y - (X + this.caretHeight));
                        Y.closePath();
                        Y.fill();
                        break;
                    case"below":
                        ab = this.y + X + this.caretHeight;
                        Y.beginPath();
                        Y.moveTo(this.x, this.y + X);
                        Y.lineTo(this.x + this.caretHeight, this.y + X + this.caretHeight);
                        Y.lineTo(this.x - this.caretHeight, this.y + X + this.caretHeight);
                        Y.closePath();
                        Y.fill();
                        break
                }
                switch (this.xAlign) {
                    case"left":
                        V = this.x - Z + (this.cornerRadius + this.caretHeight);
                        break;
                    case"right":
                        V = this.x - (this.cornerRadius + this.caretHeight);
                        break
                }
                l(Y, V, ab, Z, W, this.cornerRadius);
                Y.fill();
                Y.fillStyle = this.textColor;
                Y.textAlign = "center";
                Y.textBaseline = "middle";
                Y.fillText(this.text, V + Z / 2, ab + W / 2)
            }
        }
    });
    G.MultiTooltip = G.Element.extend({
        initialize: function () {
            this.font = f(this.fontSize, this.fontStyle, this.fontFamily);
            this.titleFont = f(this.titleFontSize, this.titleFontStyle, this.titleFontFamily);
            this.height = (this.labels.length * this.fontSize) + ((this.labels.length - 1) * (this.fontSize / 2)) + (this.yPadding * 2) + this.titleFontSize * 1.5;
            this.ctx.font = this.titleFont;
            var Y = this.ctx.measureText(this.title).width, W = w(this.ctx, this.font, this.labels) + this.fontSize + 3, X = z([W, Y]);
            this.width = X + (this.xPadding * 2);
            var V = this.height / 2;
            if (this.y - V < 0) {
                this.y = V
            } else {
                if (this.y + V > this.chart.height) {
                    this.y = this.chart.height - V
                }
            }
            if (this.x > this.chart.width / 2) {
                this.x -= this.xOffset + this.width
            } else {
                this.x += this.xOffset
            }
        }, getLineHeight: function (V) {
            var X = this.y - (this.height / 2) + this.yPadding, W = V - 1;
            if (V === 0) {
                return X + this.titleFontSize / 2
            } else {
                return X + ((this.fontSize * 1.5 * W) + this.fontSize / 2) + this.titleFontSize * 1.5
            }
        }, draw: function () {
            if (this.custom) {
                this.custom(this)
            } else {
                l(this.ctx, this.x, this.y - this.height / 2, this.width, this.height, this.cornerRadius);
                var V = this.ctx;
                V.fillStyle = this.fillColor;
                V.fill();
                V.closePath();
                V.textAlign = "left";
                V.textBaseline = "middle";
                V.fillStyle = this.titleTextColor;
                V.font = this.titleFont;
                V.fillText(this.title, this.x + this.xPadding, this.getLineHeight(0));
                V.font = this.font;
                H.each(this.labels, function (X, W) {
                    V.fillStyle = this.textColor;
                    V.fillText(X, this.x + this.xPadding + this.fontSize + 3, this.getLineHeight(W + 1));
                    V.fillStyle = this.legendColorBackground;
                    V.fillRect(this.x + this.xPadding, this.getLineHeight(W + 1) - this.fontSize / 2, this.fontSize, this.fontSize);
                    V.fillStyle = this.legendColors[W].fill;
                    V.fillRect(this.x + this.xPadding, this.getLineHeight(W + 1) - this.fontSize / 2, this.fontSize, this.fontSize)
                }, this)
            }
        }
    });
    G.Scale = G.Element.extend({
        initialize: function () {
            this.fit()
        }, buildYLabels: function () {
            this.yLabels = [];
            var W = F(this.stepValue);
            for (var V = 0; V <= this.steps; V++) {
                this.yLabels.push(i(this.templateString, {value: (this.min + (V * this.stepValue)).toFixed(W)}))
            }
            this.yLabelWidth = (this.display && this.showLabels) ? w(this.ctx, this.font, this.yLabels) : 0
        }, addXLabel: function (V) {
            this.xLabels.push(V);
            this.valuesCount++;
            this.fit()
        }, removeXLabel: function () {
            this.xLabels.shift();
            this.valuesCount--;
            this.fit()
        }, fit: function () {
            this.startPoint = (this.display) ? this.fontSize : 0;
            this.endPoint = (this.display) ? this.height - (this.fontSize * 1.5) - 5 : this.height;
            this.startPoint += this.padding;
            this.endPoint -= this.padding;
            var W = this.endPoint - this.startPoint, V;
            this.calculateYRange(W);
            this.buildYLabels();
            this.calculateXLabelRotation();
            while ((W > this.endPoint - this.startPoint)) {
                W = this.endPoint - this.startPoint;
                V = this.yLabelWidth;
                this.calculateYRange(W);
                this.buildYLabels();
                if (V < this.yLabelWidth) {
                    this.calculateXLabelRotation()
                }
            }
        }, calculateXLabelRotation: function () {
            this.ctx.font = this.font;
            var X = this.ctx.measureText(this.xLabels[0]).width, V = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width, W, ac;
            this.xScalePaddingRight = V / 2 + 3;
            this.xScalePaddingLeft = (X / 2 > this.yLabelWidth + 10) ? X / 2 : this.yLabelWidth + 10;
            this.xLabelRotation = 0;
            if (this.display) {
                var Y = w(this.ctx, this.font, this.xLabels), ab, Z;
                this.xLabelWidth = Y;
                var aa = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6;
                while ((this.xLabelWidth > aa && this.xLabelRotation === 0) || (this.xLabelWidth > aa && this.xLabelRotation <= 90 && this.xLabelRotation > 0)) {
                    ab = Math.cos(L(this.xLabelRotation));
                    W = ab * X;
                    ac = ab * V;
                    if (W + this.fontSize / 2 > this.yLabelWidth + 8) {
                        this.xScalePaddingLeft = W + this.fontSize / 2
                    }
                    this.xScalePaddingRight = this.fontSize / 2;
                    this.xLabelRotation++;
                    this.xLabelWidth = ab * Y
                }
                if (this.xLabelRotation > 0) {
                    this.endPoint -= Math.sin(L(this.xLabelRotation)) * Y + 3
                }
            } else {
                this.xLabelWidth = 0;
                this.xScalePaddingRight = this.padding;
                this.xScalePaddingLeft = this.padding
            }
        }, calculateYRange: P, drawingArea: function () {
            return this.startPoint - this.endPoint
        }, calculateY: function (W) {
            var V = this.drawingArea() / (this.min - this.max);
            return this.endPoint - (V * (W - this.min))
        }, calculateX: function (X) {
            var Y = (this.xLabelRotation > 0), W = this.width - (this.xScalePaddingLeft + this.xScalePaddingRight), V = W / Math.max((this.valuesCount - ((this.offsetGridLines) ? 0 : 1)), 1), Z = (V * X) + this.xScalePaddingLeft;
            if (this.offsetGridLines) {
                Z += (V / 2)
            }
            return Math.round(Z)
        }, update: function (V) {
            H.extend(this, V);
            this.fit()
        }, draw: function () {
            var V = this.ctx, W = (this.endPoint - this.startPoint) / this.steps, X = Math.round(this.xScalePaddingLeft);
            if (this.display) {
                V.fillStyle = this.textColor;
                V.font = this.font;
                M(this.yLabels, function (aa, Z) {
                    var ab = this.endPoint - (W * Z), ac = Math.round(ab), Y = this.showHorizontalLines;
                    V.textAlign = "right";
                    V.textBaseline = "middle";
                    if (this.showLabels) {
                        V.fillText(aa, X - 10, ab)
                    }
                    if (Z === 0 && !Y) {
                        Y = true
                    }
                    if (Y) {
                        V.beginPath()
                    }
                    if (Z > 0) {
                        V.lineWidth = this.gridLineWidth;
                        V.strokeStyle = this.gridLineColor
                    } else {
                        V.lineWidth = this.lineWidth;
                        V.strokeStyle = this.lineColor
                    }
                    ac += H.aliasPixel(V.lineWidth);
                    if (Y) {
                        V.moveTo(X, ac);
                        V.lineTo(this.width, ac);
                        V.stroke();
                        V.closePath()
                    }
                    V.lineWidth = this.lineWidth;
                    V.strokeStyle = this.lineColor;
                    V.beginPath();
                    V.moveTo(X - 5, ac);
                    V.lineTo(X, ac);
                    V.stroke();
                    V.closePath()
                }, this);
                M(this.xLabels, function (Z, Y) {
                    var ac = this.calculateX(Y) + q(this.lineWidth), aa = this.calculateX(Y - (this.offsetGridLines ? 0.5 : 0)) + q(this.lineWidth), ab = (this.xLabelRotation > 0), ad = this.showVerticalLines;
                    if (Y === 0 && !ad) {
                        ad = true
                    }
                    if (ad) {
                        V.beginPath()
                    }
                    if (Y > 0) {
                        V.lineWidth = this.gridLineWidth;
                        V.strokeStyle = this.gridLineColor
                    } else {
                        V.lineWidth = this.lineWidth;
                        V.strokeStyle = this.lineColor
                    }
                    if (ad) {
                        V.moveTo(aa, this.endPoint);
                        V.lineTo(aa, this.startPoint - 3);
                        V.stroke();
                        V.closePath()
                    }
                    V.lineWidth = this.lineWidth;
                    V.strokeStyle = this.lineColor;
                    V.beginPath();
                    V.moveTo(aa, this.endPoint);
                    V.lineTo(aa, this.endPoint + 5);
                    V.stroke();
                    V.closePath();
                    V.save();
                    V.translate(ac, (ab) ? this.endPoint + 12 : this.endPoint + 8);
                    V.rotate(L(this.xLabelRotation) * -1);
                    V.font = this.font;
                    V.textAlign = (ab) ? "right" : "center";
                    V.textBaseline = (ab) ? "middle" : "top";
                    V.fillText(Z, 0, 0);
                    V.restore()
                }, this)
            }
        }
    });
    G.RadialScale = G.Element.extend({
        initialize: function () {
            this.size = S([this.height, this.width]);
            this.drawingArea = (this.display) ? (this.size / 2) - (this.fontSize / 2 + this.backdropPaddingY) : (this.size / 2)
        }, calculateCenterOffset: function (W) {
            var V = this.drawingArea / (this.max - this.min);
            return (W - this.min) * V
        }, update: function () {
            if (!this.lineArc) {
                this.setScaleSize()
            } else {
                this.drawingArea = (this.display) ? (this.size / 2) - (this.fontSize / 2 + this.backdropPaddingY) : (this.size / 2)
            }
            this.buildYLabels()
        }, buildYLabels: function () {
            this.yLabels = [];
            var W = F(this.stepValue);
            for (var V = 0; V <= this.steps; V++) {
                this.yLabels.push(i(this.templateString, {value: (this.min + (V * this.stepValue)).toFixed(W)}))
            }
        }, getCircumference: function () {
            return ((Math.PI * 2) / this.valuesCount)
        }, setScaleSize: function () {
            var V = S([(this.height / 2 - this.pointLabelFontSize - 5), this.width / 2]), aj, Z, ag, Y, ak = this.width, ai, ac, ab = 0, af, X, ah, ae, aa, W, ad;
            this.ctx.font = f(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily);
            for (Z = 0; Z < this.valuesCount; Z++) {
                aj = this.getPointPosition(Z, V);
                ag = this.ctx.measureText(i(this.templateString, {value: this.labels[Z]})).width + 5;
                if (Z === 0 || Z === this.valuesCount / 2) {
                    Y = ag / 2;
                    if (aj.x + Y > ak) {
                        ak = aj.x + Y;
                        ai = Z
                    }
                    if (aj.x - Y < ab) {
                        ab = aj.x - Y;
                        af = Z
                    }
                } else {
                    if (Z < this.valuesCount / 2) {
                        if (aj.x + ag > ak) {
                            ak = aj.x + ag;
                            ai = Z
                        }
                    } else {
                        if (Z > this.valuesCount / 2) {
                            if (aj.x - ag < ab) {
                                ab = aj.x - ag;
                                af = Z
                            }
                        }
                    }
                }
            }
            ah = ab;
            ae = Math.ceil(ak - this.width);
            ac = this.getIndexAngle(ai);
            X = this.getIndexAngle(af);
            aa = ae / Math.sin(ac + Math.PI / 2);
            W = ah / Math.sin(X + Math.PI / 2);
            aa = (T(aa)) ? aa : 0;
            W = (T(W)) ? W : 0;
            this.drawingArea = V - (W + aa) / 2;
            this.setCenterPoint(W, aa)
        }, setCenterPoint: function (Y, V) {
            var X = this.width - V - this.drawingArea, W = Y + this.drawingArea;
            this.xCenter = (W + X) / 2;
            this.yCenter = (this.height / 2)
        }, getIndexAngle: function (W) {
            var V = (Math.PI * 2) / this.valuesCount;
            return W * V - (Math.PI / 2)
        }, getPointPosition: function (W, X) {
            var V = this.getIndexAngle(W);
            return {x: (Math.cos(V) * X) + this.xCenter, y: (Math.sin(V) * X) + this.yCenter}
        }, draw: function () {
            if (this.display) {
                var ad = this.ctx;
                M(this.yLabels, function (ai, ah) {
                    if (ah > 0) {
                        var ag = ah * (this.drawingArea / this.steps), af = this.yCenter - ag, ak;
                        if (this.lineWidth > 0) {
                            ad.strokeStyle = this.lineColor;
                            ad.lineWidth = this.lineWidth;
                            if (this.lineArc) {
                                ad.beginPath();
                                ad.arc(this.xCenter, this.yCenter, ag, 0, Math.PI * 2);
                                ad.closePath();
                                ad.stroke()
                            } else {
                                ad.beginPath();
                                for (var aj = 0; aj < this.valuesCount; aj++) {
                                    ak = this.getPointPosition(aj, this.calculateCenterOffset(this.min + (ah * this.stepValue)));
                                    if (aj === 0) {
                                        ad.moveTo(ak.x, ak.y)
                                    } else {
                                        ad.lineTo(ak.x, ak.y)
                                    }
                                }
                                ad.closePath();
                                ad.stroke()
                            }
                        }
                        if (this.showLabels) {
                            ad.font = f(this.fontSize, this.fontStyle, this.fontFamily);
                            if (this.showLabelBackdrop) {
                                var ae = ad.measureText(ai).width;
                                ad.fillStyle = this.backdropColor;
                                ad.fillRect(this.xCenter - ae / 2 - this.backdropPaddingX, af - this.fontSize / 2 - this.backdropPaddingY, ae + this.backdropPaddingX * 2, this.fontSize + this.backdropPaddingY * 2)
                            }
                            ad.textAlign = "center";
                            ad.textBaseline = "middle";
                            ad.fillStyle = this.fontColor;
                            ad.fillText(ai, this.xCenter, af)
                        }
                    }
                }, this);
                if (!this.lineArc) {
                    ad.lineWidth = this.angleLineWidth;
                    ad.strokeStyle = this.angleLineColor;
                    for (var X = this.valuesCount - 1; X >= 0; X--) {
                        if (this.angleLineWidth > 0) {
                            var W = this.getPointPosition(X, this.calculateCenterOffset(this.max));
                            ad.beginPath();
                            ad.moveTo(this.xCenter, this.yCenter);
                            ad.lineTo(W.x, W.y);
                            ad.stroke();
                            ad.closePath()
                        }
                        var aa = this.getPointPosition(X, this.calculateCenterOffset(this.max) + 5);
                        ad.font = f(this.pointLabelFontSize, this.pointLabelFontStyle, this.pointLabelFontFamily);
                        ad.fillStyle = this.pointLabelFontColor;
                        var V = this.labels.length, Y = this.labels.length / 2, ac = Y / 2, ab = (X < ac || X > V - ac), Z = (X === ac || X === V - ac);
                        if (X === 0) {
                            ad.textAlign = "center"
                        } else {
                            if (X === Y) {
                                ad.textAlign = "center"
                            } else {
                                if (X < Y) {
                                    ad.textAlign = "left"
                                } else {
                                    ad.textAlign = "right"
                                }
                            }
                        }
                        if (Z) {
                            ad.textBaseline = "middle"
                        } else {
                            if (ab) {
                                ad.textBaseline = "bottom"
                            } else {
                                ad.textBaseline = "top"
                            }
                        }
                        ad.fillText(this.labels[X], aa.x, aa.y)
                    }
                }
            }
        }
    });
    H.addEvent(window, "resize", (function () {
        var V;
        return function () {
            clearTimeout(V);
            V = setTimeout(function () {
                M(G.instances, function (W) {
                    if (W.options.responsive) {
                        W.resize(W.render, true)
                    }
                })
            }, 50)
        }
    })());
    if (k) {
        define(function () {
            return G
        })
    } else {
        if (typeof module === "object" && module.exports) {
            module.exports = G
        }
    }
    A.Chart = G;
    G.noConflict = function () {
        A.Chart = J;
        return G
    }
}).call(this);
(function () {
    var c = this, b = c.Chart, d = b.helpers;
    var a = {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
    b.Type.extend({
        name: "Bar", defaults: a, initialize: function (f) {
            var e = this.options;
            this.ScaleClass = b.Scale.extend({
                offsetGridLines: true, calculateBarX: function (g, l, i) {
                    var h = this.calculateBaseWidth(), k = this.calculateX(i) - (h / 2), j = this.calculateBarWidth(g);
                    return k + (j * l) + (l * e.barDatasetSpacing) + j / 2
                }, calculateBaseWidth: function () {
                    return (this.calculateX(1) - this.calculateX(0)) - (2 * e.barValueSpacing)
                }, calculateBarWidth: function (h) {
                    var g = this.calculateBaseWidth() - ((h - 1) * e.barDatasetSpacing);
                    return (g / h)
                }
            });
            this.datasets = [];
            if (this.options.showTooltips) {
                d.bindEvents(this, this.options.tooltipEvents, function (g) {
                    var h = (g.type !== "mouseout") ? this.getBarsAtEvent(g) : [];
                    this.eachBars(function (i) {
                        i.restore(["fillColor", "strokeColor"])
                    });
                    d.each(h, function (i) {
                        i.fillColor = i.highlightFill;
                        i.strokeColor = i.highlightStroke
                    });
                    this.showTooltip(h)
                })
            }
            this.BarClass = b.Rectangle.extend({
                strokeWidth: this.options.barStrokeWidth,
                showStroke: this.options.barShowStroke,
                ctx: this.chart.ctx
            });
            d.each(f.datasets, function (h, i) {
                var g = {label: h.label || null, fillColor: h.fillColor, strokeColor: h.strokeColor, bars: []};
                this.datasets.push(g);
                d.each(h.data, function (j, k) {
                    g.bars.push(new this.BarClass({
                        value: j,
                        label: f.labels[k],
                        datasetLabel: h.label,
                        strokeColor: h.strokeColor,
                        fillColor: h.fillColor,
                        highlightFill: h.highlightFill || h.fillColor,
                        highlightStroke: h.highlightStroke || h.strokeColor
                    }))
                }, this)
            }, this);
            this.buildScale(f.labels);
            this.BarClass.prototype.base = this.scale.endPoint;
            this.eachBars(function (h, g, i) {
                d.extend(h, {
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    x: this.scale.calculateBarX(this.datasets.length, i, g),
                    y: this.scale.endPoint
                });
                h.save()
            }, this);
            this.render()
        }, update: function () {
            this.scale.update();
            d.each(this.activeElements, function (e) {
                e.restore(["fillColor", "strokeColor"])
            });
            this.eachBars(function (e) {
                e.save()
            });
            this.render()
        }, eachBars: function (e) {
            d.each(this.datasets, function (f, g) {
                d.each(f.bars, e, this, g)
            }, this)
        }, getBarsAtEvent: function (j) {
            var g = [], i = d.getRelativePosition(j), f = function (e) {
                g.push(e.bars[h])
            }, h;
            for (var k = 0; k < this.datasets.length; k++) {
                for (h = 0; h < this.datasets[k].bars.length; h++) {
                    if (this.datasets[k].bars[h].inRange(i.x, i.y)) {
                        d.each(this.datasets, f);
                        return g
                    }
                }
            }
            return g
        }, buildScale: function (h) {
            var f = this;
            var g = function () {
                var i = [];
                f.eachBars(function (j) {
                    i.push(j.value)
                });
                return i
            };
            var e = {
                templateString: this.options.scaleLabel,
                height: this.chart.height,
                width: this.chart.width,
                ctx: this.chart.ctx,
                textColor: this.options.scaleFontColor,
                fontSize: this.options.scaleFontSize,
                fontStyle: this.options.scaleFontStyle,
                fontFamily: this.options.scaleFontFamily,
                valuesCount: h.length,
                beginAtZero: this.options.scaleBeginAtZero,
                integersOnly: this.options.scaleIntegersOnly,
                calculateYRange: function (j) {
                    var i = d.calculateScaleRange(g(), j, this.fontSize, this.beginAtZero, this.integersOnly);
                    d.extend(this, i)
                },
                xLabels: h,
                font: d.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth: this.options.scaleLineWidth,
                lineColor: this.options.scaleLineColor,
                showHorizontalLines: this.options.scaleShowHorizontalLines,
                showVerticalLines: this.options.scaleShowVerticalLines,
                gridLineWidth: (this.options.scaleShowGridLines) ? this.options.scaleGridLineWidth : 0,
                gridLineColor: (this.options.scaleShowGridLines) ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                padding: (this.options.showScale) ? 0 : (this.options.barShowStroke) ? this.options.barStrokeWidth : 0,
                showLabels: this.options.scaleShowLabels,
                display: this.options.showScale
            };
            if (this.options.scaleOverride) {
                d.extend(e, {
                    calculateYRange: d.noop,
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
                })
            }
            this.scale = new this.ScaleClass(e)
        }, addData: function (f, e) {
            d.each(f, function (g, h) {
                this.datasets[h].bars.push(new this.BarClass({
                    value: g,
                    label: e,
                    x: this.scale.calculateBarX(this.datasets.length, h, this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    width: this.scale.calculateBarWidth(this.datasets.length),
                    base: this.scale.endPoint,
                    strokeColor: this.datasets[h].strokeColor,
                    fillColor: this.datasets[h].fillColor
                }))
            }, this);
            this.scale.addXLabel(e);
            this.update()
        }, removeData: function () {
            this.scale.removeXLabel();
            d.each(this.datasets, function (e) {
                e.bars.shift()
            }, this);
            this.update()
        }, reflow: function () {
            d.extend(this.BarClass.prototype, {y: this.scale.endPoint, base: this.scale.endPoint});
            var e = d.extend({height: this.chart.height, width: this.chart.width});
            this.scale.update(e)
        }, draw: function (g) {
            var f = g || 1;
            this.clear();
            var e = this.chart.ctx;
            this.scale.draw(f);
            d.each(this.datasets, function (h, i) {
                d.each(h.bars, function (k, j) {
                    if (k.hasValue()) {
                        k.base = this.scale.endPoint;
                        k.transition({
                            x: this.scale.calculateBarX(this.datasets.length, i, j),
                            y: this.scale.calculateY(k.value),
                            width: this.scale.calculateBarWidth(this.datasets.length)
                        }, f).draw()
                    }
                }, this)
            }, this)
        }
    })
}).call(this);
(function () {
    var c = this, b = c.Chart, d = b.helpers;
    var a = {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 50,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    };
    b.Type.extend({
        name: "Doughnut", defaults: a, initialize: function (e) {
            this.segments = [];
            this.outerRadius = (d.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2;
            this.SegmentArc = b.Arc.extend({ctx: this.chart.ctx, x: this.chart.width / 2, y: this.chart.height / 2});
            if (this.options.showTooltips) {
                d.bindEvents(this, this.options.tooltipEvents, function (f) {
                    var g = (f.type !== "mouseout") ? this.getSegmentsAtEvent(f) : [];
                    d.each(this.segments, function (h) {
                        h.restore(["fillColor"])
                    });
                    d.each(g, function (h) {
                        h.fillColor = h.highlightColor
                    });
                    this.showTooltip(g)
                })
            }
            this.calculateTotal(e);
            d.each(e, function (g, f) {
                this.addData(g, f, true)
            }, this);
            this.render()
        }, getSegmentsAtEvent: function (h) {
            var g = [];
            var f = d.getRelativePosition(h);
            d.each(this.segments, function (e) {
                if (e.inRange(f.x, f.y)) {
                    g.push(e)
                }
            }, this);
            return g
        }, addData: function (h, g, e) {
            var f = g || this.segments.length;
            this.segments.splice(f, 0, new this.SegmentArc({
                value: h.value,
                outerRadius: (this.options.animateScale) ? 0 : this.outerRadius,
                innerRadius: (this.options.animateScale) ? 0 : (this.outerRadius / 100) * this.options.percentageInnerCutout,
                fillColor: h.color,
                highlightColor: h.highlight || h.color,
                showStroke: this.options.segmentShowStroke,
                strokeWidth: this.options.segmentStrokeWidth,
                strokeColor: this.options.segmentStrokeColor,
                startAngle: Math.PI * 1.5,
                circumference: (this.options.animateRotate) ? 0 : this.calculateCircumference(h.value),
                label: h.label
            }));
            if (!e) {
                this.reflow();
                this.update()
            }
        }, calculateCircumference: function (e) {
            return (Math.PI * 2) * (Math.abs(e) / this.total)
        }, calculateTotal: function (e) {
            this.total = 0;
            d.each(e, function (f) {
                this.total += Math.abs(f.value)
            }, this)
        }, update: function () {
            this.calculateTotal(this.segments);
            d.each(this.activeElements, function (e) {
                e.restore(["fillColor"])
            });
            d.each(this.segments, function (e) {
                e.save()
            });
            this.render()
        }, removeData: function (f) {
            var e = (d.isNumber(f)) ? f : this.segments.length - 1;
            this.segments.splice(e, 1);
            this.reflow();
            this.update()
        }, reflow: function () {
            d.extend(this.SegmentArc.prototype, {x: this.chart.width / 2, y: this.chart.height / 2});
            this.outerRadius = (d.min([this.chart.width, this.chart.height]) - this.options.segmentStrokeWidth / 2) / 2;
            d.each(this.segments, function (e) {
                e.update({
                    outerRadius: this.outerRadius,
                    innerRadius: (this.outerRadius / 100) * this.options.percentageInnerCutout
                })
            }, this)
        }, draw: function (e) {
            var f = (e) ? e : 1;
            this.clear();
            d.each(this.segments, function (h, g) {
                h.transition({
                    circumference: this.calculateCircumference(h.value),
                    outerRadius: this.outerRadius,
                    innerRadius: (this.outerRadius / 100) * this.options.percentageInnerCutout
                }, f);
                h.endAngle = h.startAngle + h.circumference;
                h.draw();
                if (g === 0) {
                    h.startAngle = Math.PI * 1.5
                }
                if (g < this.segments.length - 1) {
                    this.segments[g + 1].startAngle = h.endAngle
                }
            }, this)
        }
    });
    b.types.Doughnut.extend({name: "Pie", defaults: d.merge(a, {percentageInnerCutout: 0})})
}).call(this);
(function () {
    var c = this, b = c.Chart, d = b.helpers;
    var a = {
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
    b.Type.extend({
        name: "Line", defaults: a, initialize: function (e) {
            this.PointClass = b.Point.extend({
                strokeWidth: this.options.pointDotStrokeWidth,
                radius: this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius: this.options.pointHitDetectionRadius,
                ctx: this.chart.ctx,
                inRange: function (f) {
                    return (Math.pow(f - this.x, 2) < Math.pow(this.radius + this.hitDetectionRadius, 2))
                }
            });
            this.datasets = [];
            if (this.options.showTooltips) {
                d.bindEvents(this, this.options.tooltipEvents, function (f) {
                    var g = (f.type !== "mouseout") ? this.getPointsAtEvent(f) : [];
                    this.eachPoints(function (h) {
                        h.restore(["fillColor", "strokeColor"])
                    });
                    d.each(g, function (h) {
                        h.fillColor = h.highlightFill;
                        h.strokeColor = h.highlightStroke
                    });
                    this.showTooltip(g)
                })
            }
            d.each(e.datasets, function (g) {
                var f = {
                    label: g.label || null,
                    fillColor: g.fillColor,
                    strokeColor: g.strokeColor,
                    pointColor: g.pointColor,
                    pointStrokeColor: g.pointStrokeColor,
                    points: []
                };
                this.datasets.push(f);
                d.each(g.data, function (h, i) {
                    f.points.push(new this.PointClass({
                        value: h,
                        label: e.labels[i],
                        datasetLabel: g.label,
                        strokeColor: g.pointStrokeColor,
                        fillColor: g.pointColor,
                        highlightFill: g.pointHighlightFill || g.pointColor,
                        highlightStroke: g.pointHighlightStroke || g.pointStrokeColor
                    }))
                }, this);
                this.buildScale(e.labels);
                this.eachPoints(function (h, i) {
                    d.extend(h, {x: this.scale.calculateX(i), y: this.scale.endPoint});
                    h.save()
                }, this)
            }, this);
            this.render()
        }, update: function () {
            this.scale.update();
            d.each(this.activeElements, function (e) {
                e.restore(["fillColor", "strokeColor"])
            });
            this.eachPoints(function (e) {
                e.save()
            });
            this.render()
        }, eachPoints: function (e) {
            d.each(this.datasets, function (f) {
                d.each(f.points, e, this)
            }, this)
        }, getPointsAtEvent: function (g) {
            var h = [], f = d.getRelativePosition(g);
            d.each(this.datasets, function (e) {
                d.each(e.points, function (i) {
                    if (i.inRange(f.x, f.y)) {
                        h.push(i)
                    }
                })
            }, this);
            return h
        }, buildScale: function (h) {
            var f = this;
            var g = function () {
                var i = [];
                f.eachPoints(function (j) {
                    i.push(j.value)
                });
                return i
            };
            var e = {
                templateString: this.options.scaleLabel,
                height: this.chart.height,
                width: this.chart.width,
                ctx: this.chart.ctx,
                textColor: this.options.scaleFontColor,
                fontSize: this.options.scaleFontSize,
                fontStyle: this.options.scaleFontStyle,
                fontFamily: this.options.scaleFontFamily,
                valuesCount: h.length,
                beginAtZero: this.options.scaleBeginAtZero,
                integersOnly: this.options.scaleIntegersOnly,
                calculateYRange: function (j) {
                    var i = d.calculateScaleRange(g(), j, this.fontSize, this.beginAtZero, this.integersOnly);
                    d.extend(this, i)
                },
                xLabels: h,
                font: d.fontString(this.options.scaleFontSize, this.options.scaleFontStyle, this.options.scaleFontFamily),
                lineWidth: this.options.scaleLineWidth,
                lineColor: this.options.scaleLineColor,
                showHorizontalLines: this.options.scaleShowHorizontalLines,
                showVerticalLines: this.options.scaleShowVerticalLines,
                gridLineWidth: (this.options.scaleShowGridLines) ? this.options.scaleGridLineWidth : 0,
                gridLineColor: (this.options.scaleShowGridLines) ? this.options.scaleGridLineColor : "rgba(0,0,0,0)",
                padding: (this.options.showScale) ? 0 : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
                showLabels: this.options.scaleShowLabels,
                display: this.options.showScale
            };
            if (this.options.scaleOverride) {
                d.extend(e, {
                    calculateYRange: d.noop,
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
                })
            }
            this.scale = new b.Scale(e)
        }, addData: function (f, e) {
            d.each(f, function (g, h) {
                this.datasets[h].points.push(new this.PointClass({
                    value: g,
                    label: e,
                    x: this.scale.calculateX(this.scale.valuesCount + 1),
                    y: this.scale.endPoint,
                    strokeColor: this.datasets[h].pointStrokeColor,
                    fillColor: this.datasets[h].pointColor
                }))
            }, this);
            this.scale.addXLabel(e);
            this.update()
        }, removeData: function () {
            this.scale.removeXLabel();
            d.each(this.datasets, function (e) {
                e.points.shift()
            }, this);
            this.update()
        }, reflow: function () {
            var e = d.extend({height: this.chart.height, width: this.chart.width});
            this.scale.update(e)
        }, draw: function (j) {
            var f = j || 1;
            this.clear();
            var e = this.chart.ctx;
            var g = function (k) {
                return k.value !== null
            }, i = function (k, m, l) {
                return d.findNextWhere(m, g, l) || k
            }, h = function (k, m, l) {
                return d.findPreviousWhere(m, g, l) || k
            };
            this.scale.draw(f);
            d.each(this.datasets, function (l) {
                var k = d.where(l.points, g);
                d.each(l.points, function (m, n) {
                    if (m.hasValue()) {
                        m.transition({y: this.scale.calculateY(m.value), x: this.scale.calculateX(n)}, f)
                    }
                }, this);
                if (this.options.bezierCurve) {
                    d.each(k, function (m, n) {
                        var o = (n > 0 && n < k.length - 1) ? this.options.bezierCurveTension : 0;
                        m.controlPoints = d.splineCurve(h(m, k, n), m, i(m, k, n), o);
                        if (m.controlPoints.outer.y > this.scale.endPoint) {
                            m.controlPoints.outer.y = this.scale.endPoint
                        } else {
                            if (m.controlPoints.outer.y < this.scale.startPoint) {
                                m.controlPoints.outer.y = this.scale.startPoint
                            }
                        }
                        if (m.controlPoints.inner.y > this.scale.endPoint) {
                            m.controlPoints.inner.y = this.scale.endPoint
                        } else {
                            if (m.controlPoints.inner.y < this.scale.startPoint) {
                                m.controlPoints.inner.y = this.scale.startPoint
                            }
                        }
                    }, this)
                }
                e.lineWidth = this.options.datasetStrokeWidth;
                e.strokeStyle = l.strokeColor;
                e.beginPath();
                d.each(k, function (m, n) {
                    if (n === 0) {
                        e.moveTo(m.x, m.y)
                    } else {
                        if (this.options.bezierCurve) {
                            var o = h(m, k, n);
                            e.bezierCurveTo(o.controlPoints.outer.x, o.controlPoints.outer.y, m.controlPoints.inner.x, m.controlPoints.inner.y, m.x, m.y)
                        } else {
                            e.lineTo(m.x, m.y)
                        }
                    }
                }, this);
                e.stroke();
                if (this.options.datasetFill && k.length > 0) {
                    e.lineTo(k[k.length - 1].x, this.scale.endPoint);
                    e.lineTo(k[0].x, this.scale.endPoint);
                    e.fillStyle = l.fillColor;
                    e.closePath();
                    e.fill()
                }
                d.each(k, function (m) {
                    m.draw()
                })
            }, this)
        }
    })
}).call(this);
(function () {
    var c = this, b = c.Chart, d = b.helpers;
    var a = {
        scaleShowLabelBackdrop: true,
        scaleBackdropColor: "rgba(255,255,255,0.75)",
        scaleBeginAtZero: true,
        scaleBackdropPaddingY: 2,
        scaleBackdropPaddingX: 2,
        scaleShowLine: true,
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    };
    b.Type.extend({
        name: "PolarArea", defaults: a, initialize: function (e) {
            this.segments = [];
            this.SegmentArc = b.Arc.extend({
                showStroke: this.options.segmentShowStroke,
                strokeWidth: this.options.segmentStrokeWidth,
                strokeColor: this.options.segmentStrokeColor,
                ctx: this.chart.ctx,
                innerRadius: 0,
                x: this.chart.width / 2,
                y: this.chart.height / 2
            });
            this.scale = new b.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backdropPaddingY: this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: (this.options.scaleShowLine) ? this.options.scaleLineWidth : 0,
                lineColor: this.options.scaleLineColor,
                lineArc: true,
                width: this.chart.width,
                height: this.chart.height,
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2,
                ctx: this.chart.ctx,
                templateString: this.options.scaleLabel,
                valuesCount: e.length
            });
            this.updateScaleRange(e);
            this.scale.update();
            d.each(e, function (g, f) {
                this.addData(g, f, true)
            }, this);
            if (this.options.showTooltips) {
                d.bindEvents(this, this.options.tooltipEvents, function (f) {
                    var g = (f.type !== "mouseout") ? this.getSegmentsAtEvent(f) : [];
                    d.each(this.segments, function (h) {
                        h.restore(["fillColor"])
                    });
                    d.each(g, function (h) {
                        h.fillColor = h.highlightColor
                    });
                    this.showTooltip(g)
                })
            }
            this.render()
        }, getSegmentsAtEvent: function (h) {
            var g = [];
            var f = d.getRelativePosition(h);
            d.each(this.segments, function (e) {
                if (e.inRange(f.x, f.y)) {
                    g.push(e)
                }
            }, this);
            return g
        }, addData: function (h, g, e) {
            var f = g || this.segments.length;
            this.segments.splice(f, 0, new this.SegmentArc({
                fillColor: h.color,
                highlightColor: h.highlight || h.color,
                label: h.label,
                value: h.value,
                outerRadius: (this.options.animateScale) ? 0 : this.scale.calculateCenterOffset(h.value),
                circumference: (this.options.animateRotate) ? 0 : this.scale.getCircumference(),
                startAngle: Math.PI * 1.5
            }));
            if (!e) {
                this.reflow();
                this.update()
            }
        }, removeData: function (f) {
            var e = (d.isNumber(f)) ? f : this.segments.length - 1;
            this.segments.splice(e, 1);
            this.reflow();
            this.update()
        }, calculateTotal: function (e) {
            this.total = 0;
            d.each(e, function (f) {
                this.total += f.value
            }, this);
            this.scale.valuesCount = this.segments.length
        }, updateScaleRange: function (f) {
            var e = [];
            d.each(f, function (h) {
                e.push(h.value)
            });
            var g = (this.options.scaleOverride) ? {
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
                } : d.calculateScaleRange(e, d.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
            d.extend(this.scale, g, {
                size: d.min([this.chart.width, this.chart.height]),
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            })
        }, update: function () {
            this.calculateTotal(this.segments);
            d.each(this.segments, function (e) {
                e.save()
            });
            this.reflow();
            this.render()
        }, reflow: function () {
            d.extend(this.SegmentArc.prototype, {x: this.chart.width / 2, y: this.chart.height / 2});
            this.updateScaleRange(this.segments);
            this.scale.update();
            d.extend(this.scale, {xCenter: this.chart.width / 2, yCenter: this.chart.height / 2});
            d.each(this.segments, function (e) {
                e.update({outerRadius: this.scale.calculateCenterOffset(e.value)})
            }, this)
        }, draw: function (f) {
            var e = f || 1;
            this.clear();
            d.each(this.segments, function (h, g) {
                h.transition({
                    circumference: this.scale.getCircumference(),
                    outerRadius: this.scale.calculateCenterOffset(h.value)
                }, e);
                h.endAngle = h.startAngle + h.circumference;
                if (g === 0) {
                    h.startAngle = Math.PI * 1.5
                }
                if (g < this.segments.length - 1) {
                    this.segments[g + 1].startAngle = h.endAngle
                }
                h.draw()
            }, this);
            this.scale.draw()
        }
    })
}).call(this);
(function () {
    var b = this, a = b.Chart, c = a.helpers;
    a.Type.extend({
        name: "Radar",
        defaults: {
            scaleShowLine: true,
            angleShowLineOut: true,
            scaleShowLabels: false,
            scaleBeginAtZero: true,
            angleLineColor: "rgba(0,0,0,.1)",
            angleLineWidth: 1,
            pointLabelFontFamily: "'Arial'",
            pointLabelFontStyle: "normal",
            pointLabelFontSize: 10,
            pointLabelFontColor: "#666",
            pointDot: true,
            pointDotRadius: 3,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        },
        initialize: function (d) {
            this.PointClass = a.Point.extend({
                strokeWidth: this.options.pointDotStrokeWidth,
                radius: this.options.pointDotRadius,
                display: this.options.pointDot,
                hitDetectionRadius: this.options.pointHitDetectionRadius,
                ctx: this.chart.ctx
            });
            this.datasets = [];
            this.buildScale(d);
            if (this.options.showTooltips) {
                c.bindEvents(this, this.options.tooltipEvents, function (e) {
                    var f = (e.type !== "mouseout") ? this.getPointsAtEvent(e) : [];
                    this.eachPoints(function (g) {
                        g.restore(["fillColor", "strokeColor"])
                    });
                    c.each(f, function (g) {
                        g.fillColor = g.highlightFill;
                        g.strokeColor = g.highlightStroke
                    });
                    this.showTooltip(f)
                })
            }
            c.each(d.datasets, function (f) {
                var e = {
                    label: f.label || null,
                    fillColor: f.fillColor,
                    strokeColor: f.strokeColor,
                    pointColor: f.pointColor,
                    pointStrokeColor: f.pointStrokeColor,
                    points: []
                };
                this.datasets.push(e);
                c.each(f.data, function (g, h) {
                    var i;
                    if (!this.scale.animation) {
                        i = this.scale.getPointPosition(h, this.scale.calculateCenterOffset(g))
                    }
                    e.points.push(new this.PointClass({
                        value: g,
                        label: d.labels[h],
                        datasetLabel: f.label,
                        x: (this.options.animation) ? this.scale.xCenter : i.x,
                        y: (this.options.animation) ? this.scale.yCenter : i.y,
                        strokeColor: f.pointStrokeColor,
                        fillColor: f.pointColor,
                        highlightFill: f.pointHighlightFill || f.pointColor,
                        highlightStroke: f.pointHighlightStroke || f.pointStrokeColor
                    }))
                }, this)
            }, this);
            this.render()
        },
        eachPoints: function (d) {
            c.each(this.datasets, function (e) {
                c.each(e.points, d, this)
            }, this)
        },
        getPointsAtEvent: function (d) {
            var i = c.getRelativePosition(d), f = c.getAngleFromPoint({
                x: this.scale.xCenter,
                y: this.scale.yCenter
            }, i);
            var e = (Math.PI * 2) / this.scale.valuesCount, g = Math.round((f.angle - Math.PI * 1.5) / e), h = [];
            if (g >= this.scale.valuesCount || g < 0) {
                g = 0
            }
            if (f.distance <= this.scale.drawingArea) {
                c.each(this.datasets, function (j) {
                    h.push(j.points[g])
                })
            }
            return h
        },
        buildScale: function (d) {
            this.scale = new a.RadialScale({
                display: this.options.showScale,
                fontStyle: this.options.scaleFontStyle,
                fontSize: this.options.scaleFontSize,
                fontFamily: this.options.scaleFontFamily,
                fontColor: this.options.scaleFontColor,
                showLabels: this.options.scaleShowLabels,
                showLabelBackdrop: this.options.scaleShowLabelBackdrop,
                backdropColor: this.options.scaleBackdropColor,
                backdropPaddingY: this.options.scaleBackdropPaddingY,
                backdropPaddingX: this.options.scaleBackdropPaddingX,
                lineWidth: (this.options.scaleShowLine) ? this.options.scaleLineWidth : 0,
                lineColor: this.options.scaleLineColor,
                angleLineColor: this.options.angleLineColor,
                angleLineWidth: (this.options.angleShowLineOut) ? this.options.angleLineWidth : 0,
                pointLabelFontColor: this.options.pointLabelFontColor,
                pointLabelFontSize: this.options.pointLabelFontSize,
                pointLabelFontFamily: this.options.pointLabelFontFamily,
                pointLabelFontStyle: this.options.pointLabelFontStyle,
                height: this.chart.height,
                width: this.chart.width,
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2,
                ctx: this.chart.ctx,
                templateString: this.options.scaleLabel,
                labels: d.labels,
                valuesCount: d.datasets[0].data.length
            });
            this.scale.setScaleSize();
            this.updateScaleRange(d.datasets);
            this.scale.buildYLabels()
        },
        updateScaleRange: function (e) {
            var d = (function () {
                var g = [];
                c.each(e, function (h) {
                    if (h.data) {
                        g = g.concat(h.data)
                    } else {
                        c.each(h.points, function (i) {
                            g.push(i.value)
                        })
                    }
                });
                return g
            })();
            var f = (this.options.scaleOverride) ? {
                    steps: this.options.scaleSteps,
                    stepValue: this.options.scaleStepWidth,
                    min: this.options.scaleStartValue,
                    max: this.options.scaleStartValue + (this.options.scaleSteps * this.options.scaleStepWidth)
                } : c.calculateScaleRange(d, c.min([this.chart.width, this.chart.height]) / 2, this.options.scaleFontSize, this.options.scaleBeginAtZero, this.options.scaleIntegersOnly);
            c.extend(this.scale, f)
        },
        addData: function (e, d) {
            this.scale.valuesCount++;
            c.each(e, function (f, h) {
                var g = this.scale.getPointPosition(this.scale.valuesCount, this.scale.calculateCenterOffset(f));
                this.datasets[h].points.push(new this.PointClass({
                    value: f,
                    label: d,
                    x: g.x,
                    y: g.y,
                    strokeColor: this.datasets[h].pointStrokeColor,
                    fillColor: this.datasets[h].pointColor
                }))
            }, this);
            this.scale.labels.push(d);
            this.reflow();
            this.update()
        },
        removeData: function () {
            this.scale.valuesCount--;
            this.scale.labels.shift();
            c.each(this.datasets, function (d) {
                d.points.shift()
            }, this);
            this.reflow();
            this.update()
        },
        update: function () {
            this.eachPoints(function (d) {
                d.save()
            });
            this.reflow();
            this.render()
        },
        reflow: function () {
            c.extend(this.scale, {
                width: this.chart.width,
                height: this.chart.height,
                size: c.min([this.chart.width, this.chart.height]),
                xCenter: this.chart.width / 2,
                yCenter: this.chart.height / 2
            });
            this.updateScaleRange(this.datasets);
            this.scale.setScaleSize();
            this.scale.buildYLabels()
        },
        draw: function (f) {
            var e = f || 1, d = this.chart.ctx;
            this.clear();
            this.scale.draw();
            c.each(this.datasets, function (g) {
                c.each(g.points, function (h, i) {
                    if (h.hasValue()) {
                        h.transition(this.scale.getPointPosition(i, this.scale.calculateCenterOffset(h.value)), e)
                    }
                }, this);
                d.lineWidth = this.options.datasetStrokeWidth;
                d.strokeStyle = g.strokeColor;
                d.beginPath();
                c.each(g.points, function (h, i) {
                    if (i === 0) {
                        d.moveTo(h.x, h.y)
                    } else {
                        d.lineTo(h.x, h.y)
                    }
                }, this);
                d.closePath();
                d.stroke();
                d.fillStyle = g.fillColor;
                d.fill();
                c.each(g.points, function (h) {
                    if (h.hasValue()) {
                        h.draw()
                    }
                })
            }, this)
        }
    })
}).call(this);
;