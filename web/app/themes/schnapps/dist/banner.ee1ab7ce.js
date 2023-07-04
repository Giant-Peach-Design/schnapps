// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4DD4Y":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "57766a58ee1ab7ce";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"1xC6H":[function(require,module,exports) {
var Refresh = require("6d18d6bd340e7473");
var ErrorOverlay = require("74ad5ea14201648c");
Refresh.injectIntoGlobalHook(window);
window.$RefreshReg$ = function() {};
window.$RefreshSig$ = function() {
    return function(type) {
        return type;
    };
};
ErrorOverlay.setEditorHandler(function editorHandler(errorLocation) {
    let file = `${errorLocation.fileName}:${errorLocation.lineNumber || 1}:${errorLocation.colNumber || 1}`;
    fetch(`/__parcel_launch_editor?file=${encodeURIComponent(file)}`);
});
ErrorOverlay.startReportingRuntimeErrors({
    onError: function() {}
});
window.addEventListener("parcelhmraccept", ()=>{
    ErrorOverlay.dismissRuntimeErrors();
});

},{"6d18d6bd340e7473":"786KC","74ad5ea14201648c":"1dldy"}],"k4Kk6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _blazeSlider = require("blaze-slider");
var _blazeSliderDefault = parcelHelpers.interopDefault(_blazeSlider);
var _blazeCss = require("blaze-slider/dist/blaze.css");
const Banner = ()=>{
    const banner = document.querySelectorAll(".banner");
    if (banner.length) banner.forEach((item)=>{
        const slider = new (0, _blazeSliderDefault.default)(item, {
            all: {
                enableAutoplay: true,
                autoplayInterval: 2000,
                transitionDuration: 1000,
                transitionTimingFunction: "cubic-bezier(0.33, 1, 0.68, 1)",
                slidesToShow: 1
            }
        });
    });
};
_c = Banner;
exports.default = Banner;
var _c;
$RefreshReg$(_c, "Banner");

},{"blaze-slider":"5cnUt","blaze-slider/dist/blaze.css":"ccGw9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5cnUt":[function(require,module,exports) {
/* blaze-slider v1.9.3 by Manan Tank */ /**
 * calculate pages and return
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>BlazeSlider);
function calculatePages(slider) {
    const { slidesToShow , slidesToScroll , loop  } = slider.config;
    const { isStatic , totalSlides  } = slider;
    const pages = [];
    const lastIndex = totalSlides - 1;
    // start with index 0, keep adding slidesToScroll to get the new page
    for(let startIndex = 0; startIndex < totalSlides; startIndex += slidesToScroll){
        const _endIndex = startIndex + slidesToShow - 1;
        const overflow = _endIndex > lastIndex;
        if (overflow) {
            // if not looped
            if (!loop) {
                // adjust the startIndex
                const startIndex = lastIndex - slidesToShow + 1;
                const lastPageIndex = pages.length - 1;
                // create page only if adjusting the startIndex does not make it the same as previously saved page
                if (pages.length === 0 || pages.length > 0 && pages[lastPageIndex][0] !== startIndex) pages.push([
                    startIndex,
                    lastIndex
                ]);
                break;
            } else {
                // adjust the endIndex
                const endIndex = _endIndex - totalSlides;
                pages.push([
                    startIndex,
                    endIndex
                ]);
            }
        } else pages.push([
            startIndex,
            _endIndex
        ]);
        // if static, only allow 1 iteration
        if (isStatic) break;
    }
    return pages;
}
/**
 * calculate all possible states of given slider
 */ function calculateStates(slider) {
    const { totalSlides  } = slider;
    const { loop  } = slider.config;
    // get all possible pages
    const pages = calculatePages(slider);
    const states = [];
    const lastPageIndex = pages.length - 1;
    for(let pageIndex = 0; pageIndex < pages.length; pageIndex++){
        // calculate prev and next page index based on config
        let nextPageIndex, prevPageIndex;
        if (loop) {
            nextPageIndex = pageIndex === lastPageIndex ? 0 : pageIndex + 1;
            prevPageIndex = pageIndex === 0 ? lastPageIndex : pageIndex - 1;
        } else {
            nextPageIndex = pageIndex === lastPageIndex ? lastPageIndex : pageIndex + 1;
            prevPageIndex = pageIndex === 0 ? 0 : pageIndex - 1;
        }
        const currentPageStartIndex = pages[pageIndex][0];
        const nextPageStartIndex = pages[nextPageIndex][0];
        const prevPageStartIndex = pages[prevPageIndex][0];
        // calculate slides that need to be moved for transitioning to next and prev state from current state
        let nextDiff = nextPageStartIndex - currentPageStartIndex;
        if (nextPageStartIndex < currentPageStartIndex) nextDiff += totalSlides;
        let prevDiff = currentPageStartIndex - prevPageStartIndex;
        if (prevPageStartIndex > currentPageStartIndex) prevDiff += totalSlides;
        states.push({
            page: pages[pageIndex],
            next: {
                stateIndex: nextPageIndex,
                moveSlides: nextDiff
            },
            prev: {
                stateIndex: prevPageIndex,
                moveSlides: prevDiff
            }
        });
    }
    return states;
}
const START = "start";
const END = "end";
const DEV = true;
/**
 * it fixes below scenarios which are wrong (and adds a warning in console in development)
 * - config.slidesToShow greater than totalSlides
 * - config.slidesToScroll greater than config.slidesToShow which skips showing certain slides
 * - config.slidesToScroll too high such that it causes glitches
 */ function fixSliderConfig(slider) {
    const { slidesToScroll , slidesToShow  } = slider.config;
    const { totalSlides , config  } = slider;
    if (totalSlides < slidesToShow) {
        if (DEV) console.warn("slidesToShow can not be larger than number of slides. Setting slidesToShow = totalSlides instead.");
        config.slidesToShow = totalSlides;
    }
    if (totalSlides <= slidesToShow) // return because slidesToScroll does not need to be checked
    return;
    // detect slider skipping
    if (slidesToScroll > slidesToShow) {
        if (DEV) console.warn("slidesToScroll can not be greater than slidesToShow. Setting slidesToScroll = slidesToShow instead");
        config.slidesToScroll = slidesToShow;
    }
    // detect slider jumping glitch
    if (totalSlides < slidesToScroll + slidesToShow) {
        const properSlidesToScroll = totalSlides - slidesToShow;
        if (DEV) console.warn(`slidesToScroll = ${slidesToScroll} is too large for a slider with ${totalSlides} slides with slidesToShow=${slidesToShow}, setting max possible slidesToScroll = ${properSlidesToScroll} instead.`);
        config.slidesToScroll = properSlidesToScroll;
    }
}
class Automata {
    constructor(totalSlides, config){
        this.config = config;
        this.totalSlides = totalSlides;
        this.isTransitioning = false;
        constructAutomata(this, totalSlides, config);
    }
    next(pages = 1) {
        if (this.isTransitioning || this.isStatic) return;
        const { stateIndex  } = this;
        let slidesMoved = 0;
        let newStateIndex = stateIndex;
        for(let i = 0; i < pages; i++){
            const state = this.states[newStateIndex];
            slidesMoved += state.next.moveSlides;
            newStateIndex = state.next.stateIndex;
        }
        if (newStateIndex === stateIndex) return;
        this.stateIndex = newStateIndex;
        return [
            stateIndex,
            slidesMoved
        ];
    }
    prev(pages = 1) {
        if (this.isTransitioning || this.isStatic) return;
        const { stateIndex  } = this;
        let slidesMoved = 0;
        let newStateIndex = stateIndex;
        for(let i = 0; i < pages; i++){
            const state = this.states[newStateIndex];
            slidesMoved += state.prev.moveSlides;
            newStateIndex = state.prev.stateIndex;
        }
        if (newStateIndex === stateIndex) return;
        this.stateIndex = newStateIndex;
        return [
            stateIndex,
            slidesMoved
        ];
    }
}
// this will be called when slider is refreshed
function constructAutomata(automata, totalSlides, config) {
    automata.stateIndex = 0;
    fixSliderConfig(automata);
    automata.isStatic = totalSlides <= config.slidesToShow;
    automata.states = calculateStates(automata);
}
function scrollPrev(slider, slideCount) {
    const rAf = requestAnimationFrame;
    if (!slider.config.loop) noLoopScroll(slider);
    else {
        // shift elements and apply negative transform to make it look like nothing changed
        // disable transition
        disableTransition(slider);
        // apply negative transform
        slider.offset = -1 * slideCount;
        updateTransform(slider);
        // and move the elements
        wrapPrev(slider, slideCount);
        const reset = ()=>{
            rAf(()=>{
                enableTransition(slider);
                rAf(()=>{
                    slider.offset = 0;
                    updateTransform(slider);
                    onSlideEnd(slider);
                });
            });
        };
        // if the scroll was done as part of dragging
        // reset should be done after the dragging is completed
        if (slider.isDragging) {
            if (isTouch()) slider.track.addEventListener("touchend", reset, {
                once: true
            });
            else slider.track.addEventListener("pointerup", reset, {
                once: true
            });
        } else rAf(reset);
    }
}
// <--- move slider to left for showing content on right
function scrollNext(slider, slideCount) {
    const rAf = requestAnimationFrame;
    if (!slider.config.loop) noLoopScroll(slider);
    else {
        // apply offset and let the slider scroll from  <- (right to left)
        slider.offset = -1 * slideCount;
        updateTransform(slider);
        // once the transition is done
        setTimeout(()=>{
            // remove the elements from start that are no longer visible and put them at the end
            wrapNext(slider, slideCount);
            disableTransition(slider);
            // apply transform where the slider should go
            slider.offset = 0;
            updateTransform(slider);
            rAf(()=>{
                rAf(()=>{
                    enableTransition(slider);
                    onSlideEnd(slider);
                });
            });
        }, slider.config.transitionDuration);
    }
}
function onSlideEnd(slider) {
    if (slider.onSlideCbs) {
        const state = slider.states[slider.stateIndex];
        const [firstSlideIndex, lastSlideIndex] = state.page;
        slider.onSlideCbs.forEach((cb)=>cb(slider.stateIndex, firstSlideIndex, lastSlideIndex));
    }
}
// when loop is disabled, we must update the offset
function noLoopScroll(slider) {
    slider.offset = -1 * slider.states[slider.stateIndex].page[0];
    updateTransform(slider);
    onSlideEnd(slider);
}
function wrapPrev(slider, count) {
    const len = slider.slides.length;
    for(let i = 0; i < count; i++){
        // pick the last and move to first
        const slide = slider.slides[len - 1];
        // @ts-ignore
        slider.track.prepend(slide);
    }
}
function wrapNext(slider, count) {
    for(let i = 0; i < count; i++)slider.track.append(slider.slides[0]);
}
function updateTransform(slider) {
    const { track , offset , dragged  } = slider;
    if (offset === 0) track.style.transform = `translate3d(${dragged}px,0px,0px)`;
    else track.style.transform = `translate3d(  calc( ${dragged}px + ${offset} * (var(--slide-width) + ${slider.config.slideGap})),0px,0px)`;
}
function enableTransition(slider) {
    slider.track.style.transitionDuration = `${slider.config.transitionDuration}ms`;
}
function disableTransition(slider) {
    slider.track.style.transitionDuration = `0ms`;
}
const slideThreshold = 10;
const isTouch = ()=>"ontouchstart" in window;
function handlePointerDown(downEvent) {
    const track = this;
    const slider = track.slider;
    if (slider.isTransitioning) return;
    slider.dragged = 0;
    track.isScrolled = false;
    track.startMouseClientX = "touches" in downEvent ? downEvent.touches[0].clientX : downEvent.clientX;
    if (!("touches" in downEvent)) {
        // do not directly setPointerCapture on track - it blocks the click events
        // https://github.com/GoogleChromeLabs/pointer-tracker/issues/4
        const el = downEvent.target || track;
        el.setPointerCapture(downEvent.pointerId);
    }
    disableTransition(slider);
    updateEventListener(track, "addEventListener");
}
function handlePointerMove(moveEvent) {
    const track = this;
    const x = "touches" in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
    const dragged = track.slider.dragged = x - track.startMouseClientX;
    const draggedAbs = Math.abs(dragged);
    // consider dragging only if the user has dragged more than 5px
    if (draggedAbs > 5) // track.setAttribute('data-dragging', 'true')
    track.slider.isDragging = true;
    // prevent vertical scrolling if horizontal scrolling is happening
    if (draggedAbs > 15) moveEvent.preventDefault();
    track.slider.dragged = dragged;
    updateTransform(track.slider);
    if (!track.isScrolled && track.slider.config.loop) {
        if (dragged > slideThreshold) {
            track.isScrolled = true;
            track.slider.prev();
        }
    }
}
function handlePointerUp() {
    const track = this;
    const dragged = track.slider.dragged;
    track.slider.isDragging = false;
    updateEventListener(track, "removeEventListener");
    // reset drag
    track.slider.dragged = 0;
    updateTransform(track.slider);
    enableTransition(track.slider);
    if (!track.isScrolled) {
        if (dragged < -1 * slideThreshold) track.slider.next();
        else if (dragged > slideThreshold) track.slider.prev();
    }
}
const preventDefault = (event)=>event.preventDefault();
/**
 * drag based navigation for slider
 */ function dragSupport(slider) {
    // @ts-expect-error
    const track = slider.track;
    track.slider = slider;
    const event = isTouch() ? "touchstart" : "pointerdown";
    // @ts-expect-error
    track.addEventListener(event, handlePointerDown);
    // prevent click default when slider is being dragged or transitioning
    track.addEventListener("click", (event)=>{
        if (slider.isTransitioning || slider.isDragging) {
            event.preventDefault();
            event.stopImmediatePropagation();
            event.stopPropagation();
        }
    }, {
        capture: true
    });
    // prevent dragging of elements inside the slider
    track.addEventListener("dragstart", preventDefault);
}
function updateEventListener(track, method) {
    track[method]("contextmenu", handlePointerUp);
    if (isTouch()) {
        track[method]("touchend", handlePointerUp);
        // @ts-expect-error
        track[method]("touchmove", handlePointerMove);
    } else {
        track[method]("pointerup", handlePointerUp);
        // @ts-expect-error
        track[method]("pointermove", handlePointerMove);
    }
}
function handleAutoplay(slider) {
    const config = slider.config;
    if (!config.enableAutoplay) return;
    const dir = config.autoplayDirection === "to left" ? "next" : "prev";
    slider.autoplayTimer = setInterval(()=>{
        slider[dir]();
    }, config.autoplayInterval);
    if (config.stopAutoplayOnInteraction) slider.el.addEventListener(isTouch() ? "touchstart" : "mousedown", ()=>{
        clearInterval(slider.autoplayTimer);
    }, {
        once: true
    });
}
const defaultConfig = {
    // layout
    slideGap: "20px",
    slidesToScroll: 1,
    slidesToShow: 1,
    // behavior
    loop: true,
    // autoplay
    enableAutoplay: false,
    stopAutoplayOnInteraction: true,
    autoplayInterval: 3000,
    autoplayDirection: "to left",
    // pagination
    enablePagination: true,
    // transition
    transitionDuration: 300,
    transitionTimingFunction: "ease",
    draggable: true
};
function createConfig(blazeConfig) {
    // start with default config clone
    const config = {
        ...defaultConfig
    };
    for(const media in blazeConfig)// if the media matches, override the config with media config
    if (window.matchMedia(media).matches) {
        const mediaConfig = blazeConfig[media];
        for(const key in mediaConfig)// @ts-expect-error
        config[key] = mediaConfig[key];
    }
    return config;
}
function handleNavigation(slider) {
    const prev = slider.el.querySelector(".blaze-prev");
    const next = slider.el.querySelector(".blaze-next");
    if (prev) prev.onclick = ()=>{
        slider.prev();
    };
    if (next) next.onclick = ()=>{
        slider.next();
    };
}
function handlePagination(slider) {
    if (!slider.config.enablePagination || slider.isStatic) return;
    const paginationContainer = slider.el.querySelector(".blaze-pagination");
    if (!paginationContainer) return;
    slider.paginationButtons = [];
    const total = slider.states.length;
    for(let index = 0; index < total; index++){
        const button = document.createElement("button");
        slider.paginationButtons.push(button);
        button.textContent = 1 + index + "";
        button.ariaLabel = `${index + 1} of ${total}`;
        paginationContainer.append(button);
        // @ts-expect-error
        button.slider = slider;
        // @ts-expect-error
        button.index = index;
        // @ts-expect-error
        button.onclick = handlePaginationButtonClick;
    }
    // initially the first button is active
    slider.paginationButtons[0].classList.add("active");
}
function handlePaginationButtonClick() {
    const index = this.index;
    const slider = this.slider;
    const stateIndex = slider.stateIndex;
    const loop = slider.config.loop;
    const diff = Math.abs(index - stateIndex);
    const inverseDiff = slider.states.length - diff;
    const isDiffLargerThanHalf = diff > slider.states.length / 2;
    const scrollOpposite = isDiffLargerThanHalf && loop;
    // if target state is ahead of current state
    if (index > stateIndex) {
        // but the diff is too large
        if (scrollOpposite) // scroll in opposite direction to reduce scrolling
        slider.prev(inverseDiff);
        else // scroll normally
        slider.next(diff);
    } else // but the diff is too large
    if (scrollOpposite) // scroll in opposite direction
    slider.next(inverseDiff);
    else // scroll normally
    slider.prev(diff);
}
function isTransitioning(slider, time = slider.config.transitionDuration) {
    slider.isTransitioning = true;
    setTimeout(()=>{
        slider.isTransitioning = false;
    }, time);
}
class BlazeSlider extends Automata {
    constructor(blazeSliderEl, blazeConfig){
        const track = blazeSliderEl.querySelector(".blaze-track");
        const slides = track.children;
        const config = blazeConfig ? createConfig(blazeConfig) : {
            ...defaultConfig
        };
        super(slides.length, config);
        this.config = config;
        this.el = blazeSliderEl;
        this.track = track;
        this.slides = slides;
        this.offset = 0;
        this.dragged = 0;
        this.isDragging = false;
        // @ts-ignore - for debugging
        this.el.blazeSlider = this;
        this.passedConfig = blazeConfig;
        const slider = this;
        track.slider = slider;
        construct(config, slider);
        // throttled to refresh every 200ms when resizing
        let ignoreResize = false;
        let width = 0;
        window.addEventListener("resize", ()=>{
            if (width === 0) {
                width = window.innerWidth;
                return;
            }
            const newWidth = window.innerWidth;
            // ignore height change - only refresh if the width is changed
            if (width === newWidth) return;
            width = newWidth;
            if (!ignoreResize) {
                ignoreResize = true;
                setTimeout(()=>{
                    slider.refresh();
                    ignoreResize = false;
                }, 200);
            }
        });
    }
    next(count) {
        if (this.isTransitioning) return;
        const transition = super.next(count);
        if (!transition) {
            isTransitioning(this);
            return;
        }
        const [prevStateIndex, slideCount] = transition;
        handleStateChange(this, prevStateIndex);
        isTransitioning(this);
        scrollNext(this, slideCount);
    }
    prev(count) {
        if (this.isTransitioning) return;
        const transition = super.prev(count);
        if (!transition) {
            isTransitioning(this);
            return;
        }
        const [prevStateIndex, slideCount] = transition;
        handleStateChange(this, prevStateIndex);
        isTransitioning(this);
        scrollPrev(this, slideCount);
    }
    stopAutoplay() {
        clearInterval(this.autoplayTimer);
    }
    destroy() {
        // remove side effects that won't be overridden by construct()
        // remove old drag event handler
        this.track.removeEventListener(isTouch() ? "touchstart" : "pointerdown", // @ts-expect-error
        handlePointerDown);
        // stop autoplay
        this.stopAutoplay();
        // remove pagination buttons
        this.paginationButtons?.forEach((button)=>button.remove());
        // remove classes
        this.el.classList.remove("static");
        this.el.classList.remove(START);
    }
    refresh() {
        const newConfig = this.passedConfig ? createConfig(this.passedConfig) : {
            ...defaultConfig
        };
        this.destroy();
        construct(newConfig, this);
    }
    /**
     * Subscribe for slide change event
     * Returns a function to unsubscribe from slide change event
     */ onSlide(cb) {
        if (!this.onSlideCbs) this.onSlideCbs = new Set();
        this.onSlideCbs.add(cb);
        return ()=>this.onSlideCbs.delete(cb);
    }
}
function handleStateChange(slider, prevStateIndex) {
    const classList = slider.el.classList;
    const stateIndex = slider.stateIndex;
    const buttons = slider.paginationButtons;
    if (!slider.config.loop) {
        if (stateIndex === 0) classList.add(START);
        else classList.remove(START);
        if (stateIndex === slider.states.length - 1) classList.add(END);
        else classList.remove(END);
    }
    if (buttons && slider.config.enablePagination) {
        buttons[prevStateIndex].classList.remove("active");
        buttons[stateIndex].classList.add("active");
    }
}
function construct(config, slider) {
    const track = slider.track;
    slider.slides = track.children;
    slider.offset = 0;
    slider.config = config;
    constructAutomata(slider, slider.totalSlides, config);
    // if a side effect is in condition - make sure to add it for both conditions - so it gets cleaned up
    // when refresh is called
    if (!config.loop) slider.el.classList.add(START);
    if (config.enableAutoplay && !config.loop) {
        if (DEV) console.warn("enableAutoplay:true is not consistent with loop:false, auto-fixing with enableAutoplay:false");
        config.enableAutoplay = false;
    }
    track.style.transitionProperty = "transform";
    track.style.transitionTimingFunction = slider.config.transitionTimingFunction;
    track.style.transitionDuration = `${slider.config.transitionDuration}ms`;
    const { slidesToShow , slideGap  } = slider.config;
    slider.el.style.setProperty("--slides-to-show", slidesToShow + "");
    slider.el.style.setProperty("--slide-gap", slideGap);
    if (!slider.isStatic) {
        if (config.draggable) dragSupport(slider);
    } else slider.el.classList.add("static");
    handlePagination(slider);
    handleAutoplay(slider);
    handleNavigation(slider);
    updateTransform(slider);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ccGw9":[function() {},{}]},["4DD4Y","1xC6H"], null, "parcelRequire7ff4")

//# sourceMappingURL=banner.ee1ab7ce.js.map
