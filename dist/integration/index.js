/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 430:
/***/ (function(module) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const appUrl = 'https://contentful-app.chec.io';
const handler = (request, context) => __awaiter(void 0, void 0, void 0, function* () {
    // This only runs on initial execution of an integration
    if (request.body.event !== 'integrations.ready') {
        return {
            statusCode: 400,
            body: 'The event that triggered this integration is unsupported.',
        };
    }
    const integration = yield context.integration();
    const config = integration.config;
    // Parse the list of chosen spaces into an object keyed by organisation ID
    const spacesByOrg = config.selectedSpaces.reduce((acc, candidate) => {
        // Parse the chosen space, which is a combined org ID and space ID. The regex (for individual IDs) comes from
        // Contentful documentation
        const result = candidate.match(/^o:([a-zA-Z0-9-_.]{1,64})==s:([a-zA-Z0-9-_.]{1,64})$/);
        if (!result) {
            return acc;
        }
        const [_, org, space] = result;
        // Check if there's already a key for the org ID resolved
        const existingOrg = Object.hasOwnProperty.call(acc, org) ? acc[org] : [];
        return Object.assign(Object.assign({}, acc), { [org]: [
                ...existingOrg,
                space,
            ] });
    }, {});
    // Find or create app definitions for each org
    const appDefinitionsByOrg = {};
    const definitionResolutionPromises = Object.keys(spacesByOrg).map((orgId) => __awaiter(void 0, void 0, void 0, function* () {
        const definitionBaseUrl = `https://api.contentful.com/organizations/${orgId}/app_definitions`;
        const gotOptions = {
            headers: {
                Authorization: `Bearer ${config.contentManagementApiKey}`,
                'Content-Type': 'application/vnd.contentful.management.v1+json',
            },
        };
        // Avoid adding a Commerce.js app if one is already installed by searching the existing definitions
        const { items } = yield context.got(definitionBaseUrl, gotOptions).json();
        // Look for an existing definition
        const result = items.find((definition) => definition.src === appUrl);
        if (result) {
            appDefinitionsByOrg[orgId] = result;
            return;
        }
        // Create a definition in other cases
        const options = {
            method: 'PUT',
            responseType: 'json',
            json: {
                name: 'Commerce.js App',
                src: appUrl,
                locations: [
                    { location: 'app-config' },
                    { location: 'entry-field', fieldTypes: [
                            { type: 'Symbol' },
                            { type: 'Array', items: { type: 'Symbol' } },
                        ] },
                    { location: 'dialog' },
                ]
            }
        };
        const response = yield context.got(definitionBaseUrl, options);
        if (response.statusCode !== 201) {
            // Relay the error message from Contentful
            throw new Error(JSON.stringify(response.body));
        }
        appDefinitionsByOrg[orgId] = response.body;
    }));
    try {
        yield Promise.all(definitionResolutionPromises);
    }
    catch (error) {
        return {
            statusCode: 500,
            body: `An error occurred creating Contentful app definitions: ${error.message}`,
        };
    }
    // Now that all the app definitions are created, we can create all the app installations
    const installationPromises = Object.entries(spacesByOrg).reduce((acc, [orgId, spaceIds]) => {
        return acc.concat(spaceIds.map((spaceId) => __awaiter(void 0, void 0, void 0, function* () {
            const appDefinition = appDefinitionsByOrg[orgId];
            const url = `https://api.contentful.com/spaces/${spaceId}/environments/${config.environmentName}/app_installations/${appDefinition.sys.id}`;
            const options = {
                method: 'PUT',
                responseType: 'json',
                json: {
                    parameters: {
                        publicKey: context.publicKey,
                    },
                },
            };
            const response = yield context.got(url, options);
            if (response.statusCode !== 201) {
                // Relay the error message from Contentful
                throw new Error(JSON.stringify(response.body));
            }
        })));
    }, []);
    yield Promise.all(installationPromises);
    return {
        statusCode: 204,
        body: '',
    };
});
module.exports = handler;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(430);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;