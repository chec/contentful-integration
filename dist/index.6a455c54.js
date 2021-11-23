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
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
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
})({"89B27":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "39b01ef36a455c54";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
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
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
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
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
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
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"68Aqm":[function(require,module,exports) {
var _integrationConfigurationSdk = require("@chec/integration-configuration-sdk");
(async ()=>{
    const sdk = await _integrationConfigurationSdk.createSDK();
    // Track changes over time to the API key and chosen organisation
    let existingKey = '';
    if (sdk.editMode) {
        // Check if the integration is still running
        // @ts-ignore
        if (!Object.hasOwnProperty.call(sdk.config, 'installed') || !sdk.config.installed) {
            sdk.setSchema([
                {
                    type: _integrationConfigurationSdk.SchemaFieldTypes.Html,
                    content: '<p>Please wait while the Commerce.js app is configured on contentful</p>'
                }
            ]);
            return;
        }
        // Fix dashboard to not have excessive spacing around p tags
        sdk.setSchema([
            {
                type: _integrationConfigurationSdk.SchemaFieldTypes.Html,
                content: `
<p>Your contentful app is configured. When you create "short_text" content models, "Commerce.js" will appear under the
appearance tab for your model.</p>
<p>For more details, use the "Learn more" link on the right.</p>
        `
            }
        ]);
        return;
    }
    const baseFields = [
        {
            type: _integrationConfigurationSdk.SchemaFieldTypes.Html,
            content: `
<p><strong>This integration requires a Contentful personal access token.</strong> You can issue an access token
<a href="https://app.contentful.com/account/profile/cma_tokens" target="_blank" rel="noopener noreferrer">here</a></p>
      `
        },
        {
            key: 'contentManagementApiKey',
            label: 'Personal access token',
            type: _integrationConfigurationSdk.SchemaFieldTypes.ApiKey
        },
        {
            key: 'environmentName',
            label: 'Environment name',
            type: _integrationConfigurationSdk.SchemaFieldTypes.ShortText,
            default: 'master',
            description: 'The "environment" to install the app to in Contentful. Currently only one shared environment name is supported across all spaces. You may create multiple integrations if more environments are required.'
        }
    ];
    const spacesField = {
        key: 'selectedSpaces',
        label: 'Contentful spaces to install to',
        type: _integrationConfigurationSdk.SchemaFieldTypes.Select,
        options: [],
        disabled: true,
        multiselect: true,
        required: true
    };
    const updateSpacesDropdown = async (accessToken)=>{
        // Load spaces from Contentful
        const response = await fetch('https://api.contentful.com/spaces', {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (response.status !== 200) return;
        const spaces = (await response.json()).items;
        // Asynchronously load organisations for the dropdown, and set the schema to have these new options
        sdk.setSchema([
            ...baseFields,
            {
                ...spacesField,
                disabled: false,
                options: spaces.map((space)=>({
                        value: `o:${space.sys.organization.sys.id}==s:${space.sys.id}`,
                        label: space.name
                    })
                )
            }
        ]);
    };
    const { contentManagementApiKey: initialKey  } = sdk.getConfig();
    if (initialKey && initialKey.length !== 0) updateSpacesDropdown(initialKey);
    sdk.setSchema([
        ...baseFields,
        spacesField
    ]);
    sdk.onConfigUpdate(({ contentManagementApiKey  })=>{
        // Check if the key has changed and we should reset everything
        if (existingKey === contentManagementApiKey) return;
        existingKey = contentManagementApiKey;
        // Reset the schema to a default state to remove existing space options
        sdk.setSchema([
            ...baseFields,
            spacesField
        ]);
        updateSpacesDropdown(existingKey);
    });
})();

},{"@chec/integration-configuration-sdk":"7CH2m"}],"7CH2m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SchemaFieldTypes", ()=>SchemaFieldTypes1
);
/**
 * Represents a connection with the Chec dashboard when this app is rendered within the Chec dashboard, and provides
 * API to community with the dashboard.
 */ parcelHelpers.export(exports, "ConfigSDK", ()=>ConfigSDK
);
parcelHelpers.export(exports, "createSDK", ()=>createSDK
);
var _postmate = require("postmate");
var _postmateDefault = parcelHelpers.interopDefault(_postmate);
var SchemaFieldTypes1;
(function(SchemaFieldTypes) {
    SchemaFieldTypes["ShortText"] = "short_text";
    SchemaFieldTypes["LongText"] = "long_text";
    SchemaFieldTypes["Number"] = "number";
    SchemaFieldTypes["Wysiwyg"] = "wysiwyg";
    SchemaFieldTypes["Boolean"] = "boolean";
    SchemaFieldTypes["Select"] = "select";
    SchemaFieldTypes["Button"] = "button";
    SchemaFieldTypes["Link"] = "link";
    SchemaFieldTypes["ApiKey"] = "api_key";
    SchemaFieldTypes["Html"] = "html";
    SchemaFieldTypes["Password"] = "Password";
})(SchemaFieldTypes1 || (SchemaFieldTypes1 = {
}));
/**
 * Manages events broadcast from the dashboard and allows for attaching handlers to trigger from those events
 */ class EventBus {
    constructor(){
        this.handlers = [];
    }
    pushHandler(handler1) {
        this.handlers.push(handler1);
    }
    trigger(event1) {
        this.handlers.forEach((handler)=>handler(event1)
        );
    }
}
class ConfigSDK {
    constructor(childApi, eventBus){
        this.parent = childApi;
        this.eventBus = eventBus;
        // @ts-ignore
        this.config = childApi.model.config || {
        };
        // @ts-ignore
        this.editMode = Boolean(childApi.model.editMode);
        this.configWatchers = [];
        this.eventBus.pushHandler((event)=>{
            if (event.event !== 'set-config') return;
            this.config = event.payload;
            this.configWatchers.forEach((watcher)=>watcher(this.config)
            );
        });
    }
    /**
     * Watches for changes to the content height of the app, and updates the Chec dashboard so that the frame height
     * will match the size of the content in the frame
     *
     * Returns a function that will disable the resize watcher for appropriate clean up.
     */ enableAutoResize() {
        if (!document || !document.body) throw new Error('Auto-resize can only be enabled when a document (and body) is present');
        // Extract height calculation logic into a reusable closure
        const calculateHeight = ()=>{
            const rect = document.body.getBoundingClientRect();
            return rect.y + rect.height;
        };
        // Create a resize observer to watch changes in body height
        const observer = new ResizeObserver(()=>{
            this.setHeight(calculateHeight());
        });
        observer.observe(document.body);
        // Broadcast an initial height
        this.setHeight(calculateHeight());
        // Return a cleanup function in-case for usage with APIs that support cleanup (eg. React useEffect)
        return ()=>{
            observer.disconnect();
        };
    }
    /**
     * Get the current config set by the user in the dashboard
     */ getConfig() {
        return this.config;
    }
    /**
     * Watch for events on fields that are rendered by the Chec dashboard. Right now this only supports buttons
     *
     * @param {string} event The event name to watch for (eg. "click")
     * @param {string} key The key of the field that the event will be triggered on (eg. "my_button")
     * @param {Function} handler The function to run when the given event is fired on the given field.
     */ on(event2, key, handler) {
        this.eventBus.pushHandler((candidateEvent)=>{
            if (candidateEvent.event === event2 && candidateEvent.field && candidateEvent.field.key === key) handler();
        });
    }
    /**
     * Register a function to run when configuration changes
     */ onConfigUpdate(handler2) {
        this.configWatchers.push(handler2);
    }
    /**
     * Set the height of the frame in the Chec dashboard so that it will display all the content rendered by the app
     */ setHeight(height) {
        this.parent.emit('set-height', height.toString());
    }
    /**
     * Update configuration of the integration by providing an object with values that will be merged with the existing
     * configuration.
     *
     * Note the configuration is not deeply merged.
     */ setConfig(config) {
        this.parent.emit('save', config);
    }
    /**
     * Update the form schema that the Chec dashboard will use to render a configuration form to the user.
     */ setSchema(schema) {
        this.parent.emit('set-schema', schema);
    }
}
const createSDK = async ()=>{
    // Create an event bus to handle events
    const bus = new EventBus();
    return new ConfigSDK(await new _postmateDefault.default.Model({
        // Declare the "event" API that the dashboard can call to register events
        event (event) {
            bus.trigger(event);
        }
    }), bus);
};

},{"postmate":"bvrfx","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bvrfx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
  postmate - A powerful, simple, promise-based postMessage library
  @version v1.5.2
  @link https://github.com/dollarshaveclub/postmate
  @author Jacob Kelley <jakie8@gmail.com>
  @license MIT
**/ /**
 * The type of messages our frames our sending
 * @type {String}
 */ var messageType = 'application/x-postmate-v1+json';
/**
 * The maximum number of attempts to send a handshake request to the parent
 * @type {Number}
 */ var maxHandshakeRequests = 5;
/**
 * A unique message ID that is used to ensure responses are sent to the correct requests
 * @type {Number}
 */ var _messageId = 0;
/**
 * Increments and returns a message ID
 * @return {Number} A unique ID for a message
 */ var generateNewMessageId = function generateNewMessageId() {
    return ++_messageId;
};
/**
 * Postmate logging function that enables/disables via config
 * @param  {Object} ...args Rest Arguments
 */ var log = function log() {
    var _console;
    return Postmate1.debug ? (_console = console).log.apply(_console, arguments) : null;
}; // eslint-disable-line no-console
/**
 * Takes a URL and returns the origin
 * @param  {String} url The full URL being requested
 * @return {String}     The URLs origin
 */ var resolveOrigin = function resolveOrigin(url) {
    var a = document.createElement('a');
    a.href = url;
    var protocol = a.protocol.length > 4 ? a.protocol : window.location.protocol;
    var host = a.host.length ? a.port === '80' || a.port === '443' ? a.hostname : a.host : window.location.host;
    return a.origin || protocol + "//" + host;
};
var messageTypes = {
    handshake: 1,
    'handshake-reply': 1,
    call: 1,
    emit: 1,
    reply: 1,
    request: 1
};
var sanitize = function sanitize(message, allowedOrigin) {
    if (typeof allowedOrigin === 'string' && message.origin !== allowedOrigin) return false;
    if (!message.data) return false;
    if (typeof message.data === 'object' && !('postmate' in message.data)) return false;
    if (message.data.type !== messageType) return false;
    if (!messageTypes[message.data.postmate]) return false;
    return true;
};
/**
 * Takes a model, and searches for a value by the property
 * @param  {Object} model     The dictionary to search against
 * @param  {String} property  A path within a dictionary (i.e. 'window.location.href')
 * @param  {Object} data      Additional information from the get request that is
 *                            passed to functions in the child model
 * @return {Promise}
 */ var resolveValue = function resolveValue(model, property) {
    var unwrappedContext = typeof model[property] === 'function' ? model[property]() : model[property];
    return Postmate1.Promise.resolve(unwrappedContext);
};
/**
 * Composes an API to be used by the parent
 * @param {Object} info Information on the consumer
 */ var ParentAPI1 = /*#__PURE__*/ function() {
    function ParentAPI(info) {
        var _this = this;
        this.parent = info.parent;
        this.frame = info.frame;
        this.child = info.child;
        this.childOrigin = info.childOrigin;
        this.events = {
        };
        log('Parent: Registering API');
        log('Parent: Awaiting messages...');
        this.listener = function(e) {
            if (!sanitize(e, _this.childOrigin)) return false;
            /**
       * the assignments below ensures that e, data, and value are all defined
       */ var _ref = ((e || {
            }).data || {
            }).value || {
            }, data = _ref.data, name = _ref.name;
            if (e.data.postmate === 'emit') {
                log("Parent: Received event emission: " + name);
                if (name in _this.events) _this.events[name].call(_this, data);
            }
        };
        this.parent.addEventListener('message', this.listener, false);
        log('Parent: Awaiting event emissions from Child');
    }
    var _proto = ParentAPI.prototype;
    _proto.get = function get(property) {
        var _this2 = this;
        return new Postmate1.Promise(function(resolve) {
            // Extract data from response and kill listeners
            var uid = generateNewMessageId();
            var transact1 = function transact(e) {
                if (e.data.uid === uid && e.data.postmate === 'reply') {
                    _this2.parent.removeEventListener('message', transact, false);
                    resolve(e.data.value);
                }
            }; // Prepare for response from Child...
            _this2.parent.addEventListener('message', transact1, false); // Then ask child for information
            _this2.child.postMessage({
                postmate: 'request',
                type: messageType,
                property: property,
                uid: uid
            }, _this2.childOrigin);
        });
    };
    _proto.call = function call(property, data) {
        // Send information to the child
        this.child.postMessage({
            postmate: 'call',
            type: messageType,
            property: property,
            data: data
        }, this.childOrigin);
    };
    _proto.on = function on(eventName, callback) {
        this.events[eventName] = callback;
    };
    _proto.destroy = function destroy() {
        log('Parent: Destroying Postmate instance');
        window.removeEventListener('message', this.listener, false);
        this.frame.parentNode.removeChild(this.frame);
    };
    return ParentAPI;
}();
/**
 * Composes an API to be used by the child
 * @param {Object} info Information on the consumer
 */ var ChildAPI1 = /*#__PURE__*/ function() {
    function ChildAPI(info) {
        var _this3 = this;
        this.model = info.model;
        this.parent = info.parent;
        this.parentOrigin = info.parentOrigin;
        this.child = info.child;
        log('Child: Registering API');
        log('Child: Awaiting messages...');
        this.child.addEventListener('message', function(e) {
            if (!sanitize(e, _this3.parentOrigin)) return;
            log('Child: Received request', e.data);
            var _e$data = e.data, property = _e$data.property, uid = _e$data.uid, data = _e$data.data;
            if (e.data.postmate === 'call') {
                if (property in _this3.model && typeof _this3.model[property] === 'function') _this3.model[property](data);
                return;
            } // Reply to Parent
            resolveValue(_this3.model, property).then(function(value) {
                return e.source.postMessage({
                    property: property,
                    postmate: 'reply',
                    type: messageType,
                    uid: uid,
                    value: value
                }, e.origin);
            });
        });
    }
    var _proto2 = ChildAPI.prototype;
    _proto2.emit = function emit(name, data) {
        log("Child: Emitting Event \"" + name + "\"", data);
        this.parent.postMessage({
            postmate: 'emit',
            type: messageType,
            value: {
                name: name,
                data: data
            }
        }, this.parentOrigin);
    };
    return ChildAPI;
}();
/**
  * The entry point of the Parent.
 * @type {Class}
 */ var Postmate1 = /*#__PURE__*/ function() {
    // eslint-disable-line no-undef
    // Internet Explorer craps itself
    /**
   * Sets options related to the Parent
   * @param {Object} object The element to inject the frame into, and the url
   * @return {Promise}
   */ function Postmate(_ref2) {
        var _ref2$container = _ref2.container, container = _ref2$container === void 0 ? typeof container !== 'undefined' ? container : document.body : _ref2$container, model = _ref2.model, url = _ref2.url, name = _ref2.name, _ref2$classListArray = _ref2.classListArray, classListArray = _ref2$classListArray === void 0 ? [] : _ref2$classListArray;
        // eslint-disable-line no-undef
        this.parent = window;
        this.frame = document.createElement('iframe');
        this.frame.name = name || '';
        this.frame.classList.add.apply(this.frame.classList, classListArray);
        container.appendChild(this.frame);
        this.child = this.frame.contentWindow || this.frame.contentDocument.parentWindow;
        this.model = model || {
        };
        return this.sendHandshake(url);
    }
    /**
   * Begins the handshake strategy
   * @param  {String} url The URL to send a handshake request to
   * @return {Promise}     Promise that resolves when the handshake is complete
   */ var _proto3 = Postmate.prototype;
    _proto3.sendHandshake = function sendHandshake(url) {
        var _this4 = this;
        var childOrigin = resolveOrigin(url);
        var attempt = 0;
        var responseInterval;
        return new Postmate.Promise(function(resolve, reject) {
            var reply1 = function reply(e) {
                if (!sanitize(e, childOrigin)) return false;
                if (e.data.postmate === 'handshake-reply') {
                    clearInterval(responseInterval);
                    log('Parent: Received handshake reply from Child');
                    _this4.parent.removeEventListener('message', reply, false);
                    _this4.childOrigin = e.origin;
                    log('Parent: Saving Child origin', _this4.childOrigin);
                    return resolve(new ParentAPI1(_this4));
                } // Might need to remove since parent might be receiving different messages
                log('Parent: Invalid handshake reply');
                return reject('Failed handshake');
            };
            _this4.parent.addEventListener('message', reply1, false);
            var doSend = function doSend() {
                attempt++;
                log("Parent: Sending handshake attempt " + attempt, {
                    childOrigin: childOrigin
                });
                _this4.child.postMessage({
                    postmate: 'handshake',
                    type: messageType,
                    model: _this4.model
                }, childOrigin);
                if (attempt === maxHandshakeRequests) clearInterval(responseInterval);
            };
            var loaded = function loaded() {
                doSend();
                responseInterval = setInterval(doSend, 500);
            };
            if (_this4.frame.attachEvent) _this4.frame.attachEvent('onload', loaded);
            else _this4.frame.onload = loaded;
            log('Parent: Loading frame', {
                url: url
            });
            _this4.frame.src = url;
        });
    };
    return Postmate;
}();
/**
 * The entry point of the Child
 * @type {Class}
 */ Postmate1.debug = false;
Postmate1.Promise = (function() {
    try {
        return window ? window.Promise : Promise;
    } catch (e) {
        return null;
    }
})();
Postmate1.Model = /*#__PURE__*/ (function() {
    /**
   * Initializes the child, model, parent, and responds to the Parents handshake
   * @param {Object} model Hash of values, functions, or promises
   * @return {Promise}       The Promise that resolves when the handshake has been received
   */ function Model(model) {
        this.child = window;
        this.model = model;
        this.parent = this.child.parent;
        return this.sendHandshakeReply();
    }
    /**
   * Responds to a handshake initiated by the Parent
   * @return {Promise} Resolves an object that exposes an API for the Child
   */ var _proto4 = Model.prototype;
    _proto4.sendHandshakeReply = function sendHandshakeReply() {
        var _this5 = this;
        return new Postmate1.Promise(function(resolve, reject) {
            var shake1 = function shake(e) {
                if (!e.data.postmate) return;
                if (e.data.postmate === 'handshake') {
                    log('Child: Received handshake from Parent');
                    _this5.child.removeEventListener('message', shake, false);
                    log('Child: Sending handshake reply to Parent');
                    e.source.postMessage({
                        postmate: 'handshake-reply',
                        type: messageType
                    }, e.origin);
                    _this5.parentOrigin = e.origin; // Extend model with the one provided by the parent
                    var defaults = e.data.model;
                    if (defaults) {
                        Object.keys(defaults).forEach(function(key) {
                            _this5.model[key] = defaults[key];
                        });
                        log('Child: Inherited and extended model from Parent');
                    }
                    log('Child: Saving Parent origin', _this5.parentOrigin);
                    return resolve(new ChildAPI1(_this5));
                }
                return reject('Handshake Reply Failed');
            };
            _this5.child.addEventListener('message', shake1, false);
        });
    };
    return Model;
})();
exports.default = Postmate1;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["89B27","68Aqm"], "68Aqm", "parcelRequiree832")

//# sourceMappingURL=index.6a455c54.js.map
