/**
  postmate - A powerful, simple, promise-based postMessage library
  @version v1.5.2
  @link https://github.com/dollarshaveclub/postmate
  @author Jacob Kelley <jakie8@gmail.com>
  @license MIT
**/
var e=0,t={handshake:1,"handshake-reply":1,call:1,emit:1,reply:1,request:1},n=function(e,n){return("string"!=typeof n||e.origin===n)&&(!!e.data&&(("object"!=typeof e.data||"postmate"in e.data)&&("application/x-postmate-v1+json"===e.data.type&&!!t[e.data.postmate])))},a=function(){function t(e){var t=this;this.parent=e.parent,this.frame=e.frame,this.child=e.child,this.childOrigin=e.childOrigin,this.events={},this.listener=function(e){if(!n(e,t.childOrigin))return!1;var a=((e||{}).data||{}).value||{},i=a.data,o=a.name;"emit"===e.data.postmate&&o in t.events&&t.events[o].call(t,i)},this.parent.addEventListener("message",this.listener,!1)}var a=t.prototype;return a.get=function(t){var n=this;return new o.Promise((function(a){var i=++e;n.parent.addEventListener("message",(function e(t){t.data.uid===i&&"reply"===t.data.postmate&&(n.parent.removeEventListener("message",e,!1),a(t.data.value))}),!1),n.child.postMessage({postmate:"request",type:"application/x-postmate-v1+json",property:t,uid:i},n.childOrigin)}))},a.call=function(e,t){this.child.postMessage({postmate:"call",type:"application/x-postmate-v1+json",property:e,data:t},this.childOrigin)},a.on=function(e,t){this.events[e]=t},a.destroy=function(){window.removeEventListener("message",this.listener,!1),this.frame.parentNode.removeChild(this.frame)},t}(),i=function(){function e(e){var t=this;this.model=e.model,this.parent=e.parent,this.parentOrigin=e.parentOrigin,this.child=e.child,this.child.addEventListener("message",(function(e){if(n(e,t.parentOrigin)){var a=e.data,i=a.property,s=a.uid,r=a.data;"call"!==e.data.postmate?function(e,t){var n="function"==typeof e[t]?e[t]():e[t];return o.Promise.resolve(n)}(t.model,i).then((function(t){return e.source.postMessage({property:i,postmate:"reply",type:"application/x-postmate-v1+json",uid:s,value:t},e.origin)})):i in t.model&&"function"==typeof t.model[i]&&t.model[i](r)}}))}return e.prototype.emit=function(e,t){this.parent.postMessage({postmate:"emit",type:"application/x-postmate-v1+json",value:{name:e,data:t}},this.parentOrigin)},e}(),o=function(){function e(e){var t=e.container,n=void 0===t?void 0!==n?n:document.body:t,a=e.model,i=e.url,o=e.name,s=e.classListArray,r=void 0===s?[]:s;return this.parent=window,this.frame=document.createElement("iframe"),this.frame.name=o||"",this.frame.classList.add.apply(this.frame.classList,r),n.appendChild(this.frame),this.child=this.frame.contentWindow||this.frame.contentDocument.parentWindow,this.model=a||{},this.sendHandshake(i)}return e.prototype.sendHandshake=function(t){var i,o=this,s=function(e){var t=document.createElement("a");t.href=e;var n=t.protocol.length>4?t.protocol:window.location.protocol,a=t.host.length?"80"===t.port||"443"===t.port?t.hostname:t.host:window.location.host;return t.origin||n+"//"+a}(t),r=0;return new e.Promise((function(e,c){o.parent.addEventListener("message",(function t(r){return!!n(r,s)&&("handshake-reply"===r.data.postmate?(clearInterval(i),o.parent.removeEventListener("message",t,!1),o.childOrigin=r.origin,e(new a(o))):c("Failed handshake"))}),!1);var l=function(){r++,o.child.postMessage({postmate:"handshake",type:"application/x-postmate-v1+json",model:o.model},s),5===r&&clearInterval(i)},d=function(){l(),i=setInterval(l,500)};o.frame.attachEvent?o.frame.attachEvent("onload",d):o.frame.onload=d,o.frame.src=t}))},e}();o.debug=!1,o.Promise=function(){try{return window?window.Promise:Promise}catch(e){return null}}(),o.Model=function(){function e(e){return this.child=window,this.model=e,this.parent=this.child.parent,this.sendHandshakeReply()}return e.prototype.sendHandshakeReply=function(){var e=this;return new o.Promise((function(t,n){e.child.addEventListener("message",(function a(o){if(o.data.postmate){if("handshake"===o.data.postmate){e.child.removeEventListener("message",a,!1),o.source.postMessage({postmate:"handshake-reply",type:"application/x-postmate-v1+json"},o.origin),e.parentOrigin=o.origin;var s=o.data.model;return s&&Object.keys(s).forEach((function(t){e.model[t]=s[t]})),t(new i(e))}return n("Handshake Reply Failed")}}),!1)}))},e}();var s,r,c=o;(r=s||(s={})).ShortText="short_text",r.LongText="long_text",r.Number="number",r.Wysiwyg="wysiwyg",r.Boolean="boolean",r.Select="select",r.Button="button",r.Link="link",r.ApiKey="api_key",r.Html="html",r.Password="Password";class l{pushHandler(e){this.handlers.push(e)}trigger(e){this.handlers.forEach((t=>t(e)))}constructor(){this.handlers=[]}}class d{enableAutoResize(){if(!document||!document.body)throw new Error("Auto-resize can only be enabled when a document (and body) is present");const e=()=>{const e=document.body.getBoundingClientRect();return e.y+e.height},t=new ResizeObserver((()=>{this.setHeight(e())}));return t.observe(document.body),this.setHeight(e()),()=>{t.disconnect()}}getConfig(){return this.config}on(e,t,n){this.eventBus.pushHandler((a=>{a.event===e&&a.field&&a.field.key===t&&n()}))}onConfigUpdate(e){this.configWatchers.push(e)}setHeight(e){this.parent.emit("set-height",e.toString())}setConfig(e){this.parent.emit("save",e)}setSchema(e){this.parent.emit("set-schema",e)}constructor(e,t){this.parent=e,this.eventBus=t,this.config=e.model.config||{},this.editMode=Boolean(e.model.editMode),this.configWatchers=[],this.eventBus.pushHandler((e=>{"set-config"===e.event&&(this.config=e.payload,this.configWatchers.forEach((e=>e(this.config))))}))}}(async()=>{const e=await(async()=>{const e=new l;return new d(await new c.Model({event(t){e.trigger(t)}}),e)})();let t="";if(e.editMode)return Object.hasOwnProperty.call(e.config,"installed")&&e.config.installed?void e.setSchema([{type:s.Html,content:'\n<p>Your contentful app is configured. When you create "short_text" content models, "Commerce.js" will appear under the\nappearance tab for your model.</p>\n<p>For more details, use the "Learn more" link on the right.</p>\n        '}]):void e.setSchema([{type:s.Html,content:"<p>Please wait while the Commerce.js app is configured on contentful</p>"}]);const n=[{type:s.Html,content:'\n<p><strong>This integration requires a Contentful personal access token.</strong> You can issue an access token\n<a href="https://app.contentful.com/account/profile/cma_tokens" target="_blank" rel="noopener noreferrer">here</a></p>\n      '},{key:"contentManagementApiKey",label:"Personal access token",type:s.ApiKey},{key:"environmentName",label:"Environment name",type:s.ShortText,default:"master",description:'The "environment" to install the app to in Contentful. Currently only one shared environment name is supported across all spaces. You may create multiple integrations if more environments are required.'}],a={key:"selectedSpaces",label:"Contentful spaces to install to",type:s.Select,options:[],disabled:!0,multiselect:!0,required:!0},i=async t=>{const i=await fetch("https://api.contentful.com/spaces",{mode:"cors",headers:{Authorization:`Bearer ${t}`}});if(200!==i.status)return;const o=(await i.json()).items;e.setSchema([...n,{...a,disabled:!1,options:o.map((e=>({value:`o:${e.sys.organization.sys.id}==s:${e.sys.id}`,label:e.name})))}])},{contentManagementApiKey:o}=e.getConfig();o&&0!==o.length&&i(o),e.setSchema([...n,a]),e.onConfigUpdate((({contentManagementApiKey:o})=>{t!==o&&(t=o,e.setSchema([...n,a]),i(t))}))})();
//# sourceMappingURL=index.5eedff1e.js.map
