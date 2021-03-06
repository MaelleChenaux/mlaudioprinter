/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("@tensorflow/tfjs")) : "function" == typeof define && define.amd ? define(["exports", "@tensorflow/tfjs"], t) : t(e.speechCommands = {}, e.tf)
}(this, function(e, t) {
    "use strict";
    var r = function(e, t) {
        return (r = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
            })(e, t)
    };

    function n(e, t, r, n) {
        return new(r || (r = Promise))(function(s, a) {
            function o(e) {
                try {
                    l(n.next(e))
                } catch (e) {
                    a(e)
                }
            }

            function i(e) {
                try {
                    l(n.throw(e))
                } catch (e) {
                    a(e)
                }
            }

            function l(e) {
                e.done ? s(e.value) : new r(function(t) {
                    t(e.value)
                }).then(o, i)
            }
            l((n = n.apply(e, t || [])).next())
        })
    }

    function s(e, t) {
        var r, n, s, a, o = {
            label: 0,
            sent: function() {
                if (1 & s[0]) throw s[1];
                return s[1]
            },
            trys: [],
            ops: []
        };
        return a = {
            next: i(0),
            throw: i(1),
            return: i(2)
        }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this
        }), a;

        function i(a) {
            return function(i) {
                return function(a) {
                    if (r) throw new TypeError("Generator is already executing.");
                    for (; o;) try {
                        if (r = 1, n && (s = 2 & a[0] ? n.return : a[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, a[1])).done) return s;
                        switch (n = 0, s && (a = [2 & a[0], s.value]), a[0]) {
                            case 0:
                            case 1:
                                s = a;
                                break;
                            case 4:
                                return o.label++, {
                                    value: a[1],
                                    done: !1
                                };
                            case 5:
                                o.label++, n = a[1], a = [0];
                                continue;
                            case 7:
                                a = o.ops.pop(), o.trys.pop();
                                continue;
                            default:
                                if (!(s = (s = o.trys).length > 0 && s[s.length - 1]) && (6 === a[0] || 2 === a[0])) {
                                    o = 0;
                                    continue
                                }
                                if (3 === a[0] && (!s || a[1] > s[0] && a[1] < s[3])) {
                                    o.label = a[1];
                                    break
                                }
                                if (6 === a[0] && o.label < s[1]) {
                                    o.label = s[1], s = a;
                                    break
                                }
                                if (s && o.label < s[2]) {
                                    o.label = s[2], o.ops.push(a);
                                    break
                                }
                                s[2] && o.ops.pop(), o.trys.pop();
                                continue
                        }
                        a = t.call(e, o)
                    } catch (e) {
                        a = [6, e], n = 0
                    } finally {
                        r = s = 0
                    }
                    if (5 & a[0]) throw a[1];
                    return {
                        value: a[0] ? a[1] : void 0,
                        done: !0
                    }
                }([a, i])
            }
        }
    }

    function a(e, t) {
        var r = "function" == typeof Symbol && e[Symbol.iterator];
        if (!r) return e;
        var n, s, a = r.call(e),
            o = [];
        try {
            for (;
                (void 0 === t || t-- > 0) && !(n = a.next()).done;) o.push(n.value)
        } catch (e) {
            s = {
                error: e
            }
        } finally {
            try {
                n && !n.done && (r = a.return) && r.call(a)
            } finally {
                if (s) throw s.error
            }
        }
        return o
    }

    function o(e) {
        return t.tidy(function() {
            var r = t.moments(e),
                n = r.mean,
                s = r.variance;
            return e.sub(n).div(s.sqrt())
        })
    }
    var i = function() {
        function e(e) {
            if (null == e) throw new Error("Required configuration object is missing for BrowserFftFeatureExtractor constructor");
            if (null == e.spectrogramCallback) throw new Error("spectrogramCallback cannot be null or undefined");
            if (!(e.numFramesPerSpectrogram > 0)) throw new Error("Invalid value in numFramesPerSpectrogram: " + e.numFramesPerSpectrogram);
            if (e.suppressionTimeMillis < 0) throw new Error("Expected suppressionTimeMillis to be >= 0, but got " + e.suppressionTimeMillis);
            if (this.suppressionTimeMillis = e.suppressionTimeMillis, this.spectrogramCallback = e.spectrogramCallback, this.numFrames = e.numFramesPerSpectrogram, this.sampleRateHz = e.sampleRateHz || 44100, this.fftSize = e.fftSize || 1024, this.frameDurationMillis = this.fftSize / this.sampleRateHz * 1e3, this.columnTruncateLength = e.columnTruncateLength || this.fftSize, this.overlapFactor = e.overlapFactor, t.util.assert(this.overlapFactor >= 0 && this.overlapFactor < 1, "Expected overlapFactor to be >= 0 and < 1, but got " + this.overlapFactor), this.columnTruncateLength > this.fftSize) throw new Error("columnTruncateLength " + this.columnTruncateLength + " exceeds fftSize (" + this.fftSize + ").");
            this.audioContextConstructor = window.AudioContext || window.webkitAudioContext
        }
        return e.prototype.start = function() {
            return n(this, void 0, void 0, function() {
                var e, t, r;
                return s(this, function(a) {
                    switch (a.label) {
                        case 0:
                            if (null != this.frameIntervalTask) throw new Error("Cannot start already-started BrowserFftFeatureExtractor");
                            return e = this, [4, function() {
                                return n(this, void 0, void 0, function() {
                                    return s(this, function(e) {
                                        switch (e.label) {
                                            case 0:
                                                return [4, navigator.mediaDevices.getUserMedia({
                                                    audio: !0,
                                                    video: !1
                                                })];
                                            case 1:
                                                return [2, e.sent()]
                                        }
                                    })
                                })
                            }()];
                        case 1:
                            return e.stream = a.sent(), this.audioContext = new this.audioContextConstructor, this.audioContext.sampleRate !== this.sampleRateHz && console.warn("Mismatch in sampling rate: Expected: " + this.sampleRateHz + "; Actual: " + this.audioContext.sampleRate), t = this.audioContext.createMediaStreamSource(this.stream), this.analyser = this.audioContext.createAnalyser(), this.analyser.fftSize = 2 * this.fftSize, this.analyser.smoothingTimeConstant = 0, t.connect(this.analyser), this.freqDataQueue = [], this.freqData = new Float32Array(this.fftSize), r = Math.max(1, Math.round(this.numFrames * (1 - this.overlapFactor))), this.tracker = new l(r, Math.round(this.suppressionTimeMillis / this.frameDurationMillis)), this.frameIntervalTask = setInterval(this.onAudioFrame.bind(this), this.fftSize / this.sampleRateHz * 1e3), [2]
                    }
                })
            })
        }, e.prototype.onAudioFrame = function() {
            return n(this, void 0, void 0, function() {
                var e, r;
                return s(this, function(n) {
                    switch (n.label) {
                        case 0:
                            return this.analyser.getFloatFrequencyData(this.freqData), this.freqData[0] === -1 / 0 ? [2] : (this.freqDataQueue.push(this.freqData.slice(0, this.columnTruncateLength)), this.freqDataQueue.length > this.numFrames && this.freqDataQueue.shift(), this.tracker.tick() ? (e = function(e) {
                                var t = e[0].length,
                                    r = new Float32Array(e.length * t);
                                return e.forEach(function(e, n) {
                                    return r.set(e, n * t)
                                }), r
                            }(this.freqDataQueue), r = function(e, r) {
                                var n = new Float32Array(t.util.sizeFromShape(r));
                                return n.set(e, n.length - e.length), t.tensor(n, r)
                            }(e, [1, this.numFrames, this.columnTruncateLength, 1]), [4, this.spectrogramCallback(r)]) : [3, 2]);
                        case 1:
                            n.sent() && this.tracker.suppress(), r.dispose(), n.label = 2;
                        case 2:
                            return [2]
                    }
                })
            })
        }, e.prototype.stop = function() {
            return n(this, void 0, void 0, function() {
                return s(this, function(e) {
                    if (null == this.frameIntervalTask) throw new Error("Cannot stop because there is no ongoing streaming activity.");
                    return clearInterval(this.frameIntervalTask), this.frameIntervalTask = null, this.analyser.disconnect(), this.audioContext.close(), null != this.stream && this.stream.getTracks().length > 0 && this.stream.getTracks()[0].stop(), [2]
                })
            })
        }, e.prototype.setConfig = function(e) {
            throw new Error("setConfig() is not implemented for BrowserFftFeatureExtractor.")
        }, e.prototype.getFeatures = function() {
            throw new Error("getFeatures() is not implemented for BrowserFftFeatureExtractor. Use the spectrogramCallback field of the constructor config instead.")
        }, e
    }();
    var l = function() {
            function e(e, r) {
                this.period = e, this.suppressionTime = null == r ? 0 : r, this.counter = 0, t.util.assert(this.period > 0, "Expected period to be positive, but got " + this.period)
            }
            return e.prototype.tick = function() {
                return this.counter++, this.counter % this.period == 0 && (null == this.suppressionOnset || this.counter - this.suppressionOnset > this.suppressionTime)
            }, e.prototype.suppress = function() {
                this.suppressionOnset = this.counter
            }, e
        }(),
        u = "0.2.2",
        c = !1;
    var h = function() {
            function e(r, n, s) {
                this.MODEL_URL_PREFIX = "https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v" + u.split(".").slice(0, 2).join(".") + "/browser_fft", this.SAMPLE_RATE_HZ = 44100, this.FFT_SIZE = 1024, this.DEFAULT_SUPPRESSION_TIME_MILLIS = 0, this.transferRecognizers = {}, t.util.assert(null == n && null == s || null != n && null != s, "modelURL and metadataURL must be both provided or both not provided."), null == n ? (null == r ? r = e.DEFAULT_VOCABULARY_NAME : t.util.assert(-1 !== e.VALID_VOCABULARY_NAMES.indexOf(r), "Invalid vocabulary name: '" + r + "'"), this.vocabulary = r, this.modelURL = this.MODEL_URL_PREFIX + "/" + this.vocabulary + "/model.json", this.metadataURL = this.MODEL_URL_PREFIX + "/" + this.vocabulary + "/metadata.json") : (t.util.assert(null == r, "vocabulary name must be null or undefined when modelURL is provided"), this.modelURL = n, this.metadataURL = s), this.parameters = {
                    sampleRateHz: this.SAMPLE_RATE_HZ,
                    fftSize: this.FFT_SIZE
                }
            }
            return e.prototype.listen = function(e, r) {
                return n(this, void 0, void 0, function() {
                    var l, u, h, p, d, f = this;
                    return s(this, function(m) {
                        switch (m.label) {
                            case 0:
                                if (c) throw new Error("Cannot start streaming again when streaming is ongoing.");
                                return [4, this.ensureModelLoaded()];
                            case 1:
                                if (m.sent(), null == r && (r = {}), l = null == r.probabilityThreshold ? 0 : r.probabilityThreshold, r.includeEmbedding && (l = 0), t.util.assert(l >= 0 && l <= 1, "Invalid probabilityThreshold value: " + l), u = null != r.invokeCallbackOnNoiseAndUnknown && r.invokeCallbackOnNoiseAndUnknown, r.includeEmbedding && (u = !0), r.suppressionTimeMillis < 0) throw new Error("suppressionTimeMillis is expected to be >= 0, but got " + r.suppressionTimeMillis);
                                return h = null == r.overlapFactor ? .5 : r.overlapFactor, t.util.assert(h >= 0 && h < 1, "Expected overlapFactor to be >= 0 and < 1, but got " + h), p = function(i) {
                                    return n(f, void 0, void 0, function() {
                                        var n, c, h, p, d, f, m, g, v, w, b;
                                        return s(this, function(s) {
                                            switch (s.label) {
                                                case 0:
                                                    return c = o(i), r.includeEmbedding ? [4, this.ensureModelWithEmbeddingOutputCreated()] : [3, 2];
                                                case 1:
                                                    return s.sent(), n = a(this.modelWithEmbeddingOutput.predict(c), 2), h = n[0], p = n[1], [3, 3];
                                                case 2:
                                                    h = this.model.predict(c), s.label = 3;
                                                case 3:
                                                    return [4, h.data()];
                                                case 4:
                                                    return d = s.sent(), [4, (f = h.argMax(-1)).data()];
                                                case 5:
                                                    return m = s.sent()[0], g = Math.max.apply(Math, function() {
                                                        for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(a(arguments[t]));
                                                        return e
                                                    }(d)), t.dispose([h, f, c]), g < l ? [2, !1] : [3, 6];
                                                case 6:
                                                    return v = void 0, r.includeSpectrogram ? (w = {}, [4, i.data()]) : [3, 8];
                                                case 7:
                                                    w.data = s.sent(), w.frameSize = this.nonBatchInputShape[1], v = w, s.label = 8;
                                                case 8:
                                                    return b = !0, u || "_background_noise_" !== this.words[m] && "_unknown_" !== this.words[m] || (b = !1), b && e({
                                                        scores: d,
                                                        spectrogram: v,
                                                        embedding: p
                                                    }), [2, b]
                                            }
                                        })
                                    })
                                }, d = null == r.suppressionTimeMillis ? this.DEFAULT_SUPPRESSION_TIME_MILLIS : r.suppressionTimeMillis, this.audioDataExtractor = new i({
                                    sampleRateHz: this.parameters.sampleRateHz,
                                    numFramesPerSpectrogram: this.nonBatchInputShape[0],
                                    columnTruncateLength: this.nonBatchInputShape[1],
                                    suppressionTimeMillis: d,
                                    spectrogramCallback: p,
                                    overlapFactor: h
                                }), [4, this.audioDataExtractor.start()];
                            case 2:
                                return m.sent(), c = !0, [2]
                        }
                    })
                })
            }, e.prototype.ensureModelLoaded = function() {
                return n(this, void 0, void 0, function() {
                    var e, r, n, a, o = this;
                    return s(this, function(s) {
                        switch (s.label) {
                            case 0:
                                return null != this.model ? [2] : [4, this.ensureMetadataLoaded()];
                            case 1:
                                return s.sent(), [4, t.loadModel(this.modelURL)];
                            case 2:
                                if (1 !== (e = s.sent()).inputs.length) throw new Error("Expected model to have 1 input, but got a model with " + e.inputs.length + " inputs");
                                if (4 !== e.inputs[0].shape.length) throw new Error("Expected model to have an input shape of rank 4, but got an input shape of rank " + e.inputs[0].shape.length);
                                if (1 !== e.inputs[0].shape[3]) throw new Error("Expected model to have an input shape with 1 as the last dimension, but got input shape" + JSON.stringify(e.inputs[0].shape[3]) + "}");
                                if (2 !== (r = e.outputShape).length) throw new Error("Expected loaded model to have an output shape of rank 2,but received shape " + JSON.stringify(r));
                                if (r[1] !== this.words.length) throw new Error("Mismatch between the last dimension of model's output shape (" + r[1] + ") and number of words (" + this.words.length + ").");
                                return this.model = e, this.freezeModel(), this.nonBatchInputShape = e.inputs[0].shape.slice(1), this.elementsPerExample = 1, e.inputs[0].shape.slice(1).forEach(function(e) {
                                    return o.elementsPerExample *= e
                                }), this.warmUpModel(), n = this.parameters.fftSize / this.parameters.sampleRateHz * 1e3, a = e.inputs[0].shape[1], this.parameters.spectrogramDurationMillis = a * n, [2]
                        }
                    })
                })
            }, e.prototype.ensureModelWithEmbeddingOutputCreated = function() {
                return n(this, void 0, void 0, function() {
                    var e, r;
                    return s(this, function(n) {
                        switch (n.label) {
                            case 0:
                                return null != this.modelWithEmbeddingOutput ? [2] : [4, this.ensureModelLoaded()];
                            case 1:
                                for (n.sent(), r = this.model.layers.length - 2; r >= 0; --r)
                                    if ("Dense" === this.model.layers[r].getClassName()) {
                                        e = this.model.layers[r];
                                        break
                                    }
                                if (null == e) throw new Error("Failed to find second last dense layer in the original model.");
                                return this.modelWithEmbeddingOutput = t.model({
                                    inputs: this.model.inputs,
                                    outputs: [this.model.outputs[0], e.output]
                                }), [2]
                        }
                    })
                })
            }, e.prototype.warmUpModel = function() {
                var e = this;
                t.tidy(function() {
                    for (var r = t.zeros([1].concat(e.nonBatchInputShape)), n = 0; n < 3; ++n) e.model.predict(r)
                })
            }, e.prototype.ensureMetadataLoaded = function() {
                return n(this, void 0, void 0, function() {
                    var e;
                    return s(this, function(t) {
                        switch (t.label) {
                            case 0:
                                return null != this.words ? [2] : [4, function(e) {
                                    return n(this, void 0, void 0, function() {
                                        var t, r, n, a;
                                        return s(this, function(s) {
                                            switch (s.label) {
                                                case 0:
                                                    return t = "http://", r = "https://", n = "file://", 0 !== e.indexOf(t) && 0 !== e.indexOf(r) ? [3, 3] : [4, fetch(e)];
                                                case 1:
                                                    return [4, s.sent().json()];
                                                case 2:
                                                    return [2, s.sent()];
                                                case 3:
                                                    if (0 === e.indexOf(n)) return a = require("fs"), [2, JSON.parse(a.readFileSync(e.slice(n.length), {
                                                        encoding: "utf-8"
                                                    }))];
                                                    throw new Error("Unsupported URL scheme in metadata URL: " + e + ". Supported schemes are: http://, https://, and (node.js-only) file://");
                                                case 4:
                                                    return [2]
                                            }
                                        })
                                    })
                                }(this.metadataURL)];
                            case 1:
                                return e = t.sent(), this.words = e.words, [2]
                        }
                    })
                })
            }, e.prototype.stopListening = function() {
                return n(this, void 0, void 0, function() {
                    return s(this, function(e) {
                        switch (e.label) {
                            case 0:
                                if (!c) throw new Error("Cannot stop streaming when streaming is not ongoing.");
                                return [4, this.audioDataExtractor.stop()];
                            case 1:
                                return e.sent(), c = !1, [2]
                        }
                    })
                })
            }, e.prototype.isListening = function() {
                return c
            }, e.prototype.wordLabels = function() {
                return this.words
            }, e.prototype.params = function() {
                return this.parameters
            }, e.prototype.modelInputShape = function() {
                if (null == this.model) throw new Error("Model has not been loaded yet. Load model by calling ensureModelLoaded(), recognize(), or listen().");
                return this.model.inputs[0].shape
            }, e.prototype.recognize = function(e, r) {
                return n(this, void 0, void 0, function() {
                    var n, a, o, i, l, u, c, h, p, d, f, m, g;
                    return s(this, function(s) {
                        switch (s.label) {
                            case 0:
                                return null == r && (r = {}), [4, this.ensureModelLoaded()];
                            case 1:
                                return s.sent(), null != e ? [3, 3] : [4, this.recognizeOnline()];
                            case 2:
                                n = s.sent(), e = n.data, s.label = 3;
                            case 3:
                                if (e instanceof t.Tensor) this.checkInputTensorShape(e), o = e, a = e.shape[0];
                                else {
                                    if ((e = e).length % this.elementsPerExample) throw new Error("The length of the input Float32Array " + e.length + " is not divisible by the number of tensor elements per per example expected by the model " + this.elementsPerExample + ".");
                                    a = e.length / this.elementsPerExample, o = t.tensor4d(e, [a].concat(this.nonBatchInputShape))
                                }
                                return l = {
                                    scores: null
                                }, r.includeEmbedding ? [4, this.ensureModelWithEmbeddingOutputCreated()] : [3, 5];
                            case 4:
                                return s.sent(), u = this.modelWithEmbeddingOutput.predict(o), i = u[0], l.embedding = u[1], [3, 6];
                            case 5:
                                i = this.model.predict(o), s.label = 6;
                            case 6:
                                return 1 !== a ? [3, 8] : (c = l, [4, i.data()]);
                            case 7:
                                return c.scores = s.sent(), [3, 10];
                            case 8:
                                return h = t.unstack(i), p = h.map(function(e) {
                                    return e.data()
                                }), d = l, [4, Promise.all(p)];
                            case 9:
                                d.scores = s.sent(), t.dispose(h), s.label = 10;
                            case 10:
                                return r.includeSpectrogram ? (f = l, m = {}, e instanceof t.Tensor ? [4, e.data()] : [3, 12]) : [3, 14];
                            case 11:
                                return g = s.sent(), [3, 13];
                            case 12:
                                g = e, s.label = 13;
                            case 13:
                                f.spectrogram = (m.data = g, m.frameSize = this.nonBatchInputShape[1], m), s.label = 14;
                            case 14:
                                return [2, l]
                        }
                    })
                })
            }, e.prototype.recognizeOnline = function() {
                return n(this, void 0, void 0, function() {
                    var e = this;
                    return s(this, function(t) {
                        return [2, new Promise(function(t, r) {
                            e.audioDataExtractor = new i({
                                sampleRateHz: e.parameters.sampleRateHz,
                                numFramesPerSpectrogram: e.nonBatchInputShape[0],
                                columnTruncateLength: e.nonBatchInputShape[1],
                                suppressionTimeMillis: 0,
                                spectrogramCallback: function(r) {
                                    return n(e, void 0, void 0, function() {
                                        var e, n, a;
                                        return s(this, function(s) {
                                            switch (s.label) {
                                                case 0:
                                                    return e = o(r), [4, this.audioDataExtractor.stop()];
                                                case 1:
                                                    return s.sent(), n = t, a = {}, [4, e.data()];
                                                case 2:
                                                    return n.apply(void 0, [(a.data = s.sent(), a.frameSize = this.nonBatchInputShape[1], a)]), e.dispose(), [2, !1]
                                            }
                                        })
                                    })
                                },
                                overlapFactor: 0
                            }), e.audioDataExtractor.start()
                        })]
                    })
                })
            }, e.prototype.createTransfer = function(e) {
                if (null == this.model) throw new Error("Model has not been loaded yet. Load model by calling ensureModelLoaded(), recognizer(), or listen().");
                t.util.assert(null != e && "string" == typeof e && e.length > 1, "Expected the name for a transfer-learning recognized to be a non-empty string, but got " + JSON.stringify(e)), t.util.assert(null == this.transferRecognizers[e], "There is already a transfer-learning model named '" + e + "'");
                var r = new p(e, this.parameters, this.model);
                return this.transferRecognizers[e] = r, r
            }, e.prototype.freezeModel = function() {
                var e, t;
                try {
                    for (var r = function(e) {
                            var t = "function" == typeof Symbol && e[Symbol.iterator],
                                r = 0;
                            return t ? t.call(e) : {
                                next: function() {
                                    return e && r >= e.length && (e = void 0), {
                                        value: e && e[r++],
                                        done: !e
                                    }
                                }
                            }
                        }(this.model.layers), n = r.next(); !n.done; n = r.next()) {
                        n.value.trainable = !1
                    }
                } catch (t) {
                    e = {
                        error: t
                    }
                } finally {
                    try {
                        n && !n.done && (t = r.return) && t.call(r)
                    } finally {
                        if (e) throw e.error
                    }
                }
            }, e.prototype.checkInputTensorShape = function(e) {
                var r = this.model.inputs[0].shape.length;
                if (e.shape.length !== r) throw new Error("Expected input Tensor to have rank " + r + ", but got rank " + e.shape.length + " that differs ");
                var n = e.shape.slice(1),
                    s = this.model.inputs[0].shape.slice(1);
                if (!t.util.arraysEqual(n, s)) throw new Error("Expected input to have shape [null," + s + "], but got shape [null," + n + "]")
            }, e.VALID_VOCABULARY_NAMES = ["18w", "directional4w"], e.DEFAULT_VOCABULARY_NAME = "18w", e
        }(),
        p = function(e) {
            function a(r, n, s) {
                var a = e.call(this) || this;
                return a.name = r, a.parameters = n, a.baseModel = s, t.util.assert(null != r && "string" == typeof r && r.length > 0, "The name of a transfer model must be a non-empty string, but got " + JSON.stringify(r)), a.nonBatchInputShape = a.baseModel.inputs[0].shape.slice(1), a.words = [], a
            }
            return function(e, t) {
                function n() {
                    this.constructor = e
                }
                r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }(a, e), a.prototype.collectExample = function(e) {
                return n(this, void 0, void 0, function() {
                    var r = this;
                    return s(this, function(a) {
                        return t.util.assert(!c, "Cannot start collection of transfer-learning example because a streaming recognition or transfer-learning example collection is ongoing"), t.util.assert(null != e && "string" == typeof e && e.length > 0, "Must provide a non-empty string when collecting transfer-learning example"), c = !0, [2, new Promise(function(t) {
                            r.audioDataExtractor = new i({
                                sampleRateHz: r.parameters.sampleRateHz,
                                numFramesPerSpectrogram: r.nonBatchInputShape[0],
                                columnTruncateLength: r.nonBatchInputShape[1],
                                suppressionTimeMillis: 0,
                                spectrogramCallback: function(a) {
                                    return n(r, void 0, void 0, function() {
                                        var r, n, i;
                                        return s(this, function(s) {
                                            switch (s.label) {
                                                case 0:
                                                    return null == this.transferExamples && (this.transferExamples = {}), null == this.transferExamples[e] && (this.transferExamples[e] = []), r = o(a), this.transferExamples[e].push(r.clone()), r.dispose(), [4, this.audioDataExtractor.stop()];
                                                case 1:
                                                    return s.sent(), c = !1, this.collateTransferWords(), n = t, i = {}, [4, a.data()];
                                                case 2:
                                                    return n.apply(void 0, [(i.data = s.sent(), i.frameSize = this.nonBatchInputShape[1], i)]), [2, !1]
                                            }
                                        })
                                    })
                                },
                                overlapFactor: 0
                            }), r.audioDataExtractor.start()
                        })]
                    })
                })
            }, a.prototype.clearExamples = function() {
                t.util.assert(null != this.words && this.words.length > 0 && null != this.transferExamples, "No transfer learning examples exist for model name " + this.name), t.dispose(this.transferExamples), this.transferExamples = null, this.words = null
            }, a.prototype.countExamples = function() {
                if (null == this.transferExamples) throw new Error("No examples have been collected for transfer-learning model named '" + this.name + "' yet.");
                var e = {};
                for (var t in this.transferExamples) e[t] = this.transferExamples[t].length;
                return e
            }, a.prototype.collateTransferWords = function() {
                this.words = Object.keys(this.transferExamples).sort()
            }, a.prototype.collectTransferDataAsTensors = function(e) {
                var r = this;
                return t.util.assert(null != this.words && this.words.length > 0, "No word example is available for tranfer-learning model of name " + e), t.tidy(function() {
                    var e = [],
                        n = [];
                    return r.words.forEach(function(t, s) {
                        r.transferExamples[t].forEach(function(t) {
                            e.push(t), n.push(s)
                        })
                    }), {
                        xs: t.concat(e, 0),
                        ys: t.oneHot(t.tensor1d(n, "int32"), Object.keys(r.words).length)
                    }
                })
            }, a.prototype.train = function(e) {
                return n(this, void 0, void 0, function() {
                    var r, n, a, o, i, l, u;
                    return s(this, function(s) {
                        switch (s.label) {
                            case 0:
                                t.util.assert(null != this.words && this.words.length > 0, "Cannot train transfer-learning model '" + this.name + "' because no transfer learning example has been collected."), t.util.assert(this.words.length > 1, "Cannot train transfer-learning model '" + this.name + "' because only 1 word label ('" + JSON.stringify(this.words) + "') has been collected for transfer learning. Requires at least 2."), null == e && (e = {}), null == this.model && this.createTransferModelFromBaseModel(), r = e.optimizer || "sgd", this.model.compile({
                                    loss: "categoricalCrossentropy",
                                    optimizer: r,
                                    metrics: ["acc"]
                                }), n = this.collectTransferDataAsTensors(), a = n.xs, o = n.ys, i = null == e.epochs ? 20 : e.epochs, l = null == e.validationSplit ? 0 : e.validationSplit, s.label = 1;
                            case 1:
                                return s.trys.push([1, 3, , 4]), [4, this.model.fit(a, o, {
                                    epochs: i,
                                    validationSplit: l,
                                    batchSize: e.batchSize,
                                    callbacks: null == e.callback ? null : [e.callback]
                                })];
                            case 2:
                                return u = s.sent(), t.dispose([a, o]), [2, u];
                            case 3:
                                return s.sent(), t.dispose([a, o]), this.model = null, [2, null];
                            case 4:
                                return [2]
                        }
                    })
                })
            }, a.prototype.createTransferModelFromBaseModel = function() {
                t.util.assert(null != this.words, "No word example is available for tranfer-learning model of name " + this.name);
                for (var e = this.baseModel.layers, r = e.length - 2; r >= 0 && "dense" !== e[r].getClassName().toLowerCase();) r--;
                if (r < 0) throw new Error("Cannot find a hidden dense layer in the base model.");
                var n = e[r].output;
                this.transferHead = t.sequential(), this.transferHead.add(t.layers.dense({
                    units: this.words.length,
                    activation: "softmax",
                    inputShape: n.shape.slice(1)
                }));
                var s = this.transferHead.apply(n);
                this.model = t.model({
                    inputs: this.baseModel.inputs,
                    outputs: s
                })
            }, a.prototype.modelInputShape = function() {
                return this.baseModel.inputs[0].shape
            }, a.prototype.createTransfer = function(e) {
                throw new Error("Creating transfer-learned recognizer from a transfer-learned recognizer is not supported.")
            }, a
        }(h);
    e.create = function(e, r, n, s) {
        if (t.util.assert(null == n && null == s || null != n && null != s, "customModelURL and customMetadataURL must be both provided or both not provided."), null != n && t.util.assert(null == r, "vocabulary name must be null or undefined when modelURL is provided"), "BROWSER_FFT" === e) return new h(r, n, s);
        throw "SOFT_FFT" === e ? new Error("SOFT_FFT SpeechCommandRecognizer has not been implemented yet.") : new Error("Invalid fftType: '" + e + "'")
    }, e.BACKGROUND_NOISE_TAG = "_background_noise_", e.UNKNOWN_TAG = "_unknown_", e.version = u, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});

//# sourceMappingURL=speech-commands.min.js.map
