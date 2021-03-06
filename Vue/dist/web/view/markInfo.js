// { "framework": "Vue" }

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 178);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(139);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("eee10bca", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-85299a5a\",\"scoped\":false,\"hasInlineConfig\":false}!./markInfo.css", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-85299a5a\",\"scoped\":false,\"hasInlineConfig\":false}!./markInfo.css");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("c21dc4a6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dc09e26a\",\"scoped\":false,\"hasInlineConfig\":false}!./dropdown.css", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dc09e26a\",\"scoped\":false,\"hasInlineConfig\":false}!./dropdown.css");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/**\n * Created by yxl79 on 2017/4/12.\n * 商标信息\n */\n/**\n * Created by yxl79 on 2017/4/10.\n * 框架样式，基础样式  注意，scoped最好不要使用，使用后bdy等标签样式不起作用\n * 样式能精简就精简，减少bundleJs的大小\n */\n/**\n * Created by yxl79 on 2017/4/10.\n * some config data // theme\n */\n/** only for web**/\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\nbody {\n  padding: 0;\n  margin: 0;\n  display: flex;\n}\nbody:before {\n  display: none;\n}\nbody .weex-root {\n  background-color: #EDEDED;\n}\nbody .weex-scroller {\n  flex: 1;\n}\nbody .font_padding {\n  padding-top: 4px !important;\n  padding-bottom: 4px !important;\n}\n/*fix weeb slider bug*/\nbody .weex-slider-inner {\n  width: 100%!important;\n}\n/**通用**/\n.font_padding {\n  padding-top: 4px;\n  padding-bottom: 4px;\n}\n.font_bold {\n  font-weight: 700;\n}\n.font_silver {\n  color: #999999;\n}\n.font_orange {\n  color: #ffb837;\n}\n.font_size {\n  font-size: 28px;\n}\n.font_small {\n  font-size: 23px;\n}\n.font_big {\n  font-size: 35px;\n}\n.bg_white {\n  background-color: white;\n}\n.bg_silver {\n  background-color: #EDEDED;\n}\n.hidden {\n  visibility: hidden;\n}\n.visible {\n  visibility: visible;\n}\n.gone {\n  height: 0.1px;\n  overflow: hidden;\n}\n.text_center {\n  text-align: center;\n}\n.flex_1 {\n  flex: 1;\n}\n.flex_row {\n  flex-direction: row;\n}\n.flex_col {\n  flex-direction: column;\n}\n.align_center {\n  align-items: center;\n}\n.justify_center {\n  justify-content: center;\n}\n.justify_start {\n  justify-content: flex-start;\n}\n.h2 {\n  font-size: 38px;\n  font-weight: bold;\n  text-align: center;\n}\n.border_top {\n  border-top-width: 1px;\n  border-top-color: #d5d5d5;\n}\n.border_left {\n  border-left-width: 1px;\n  border-left-color: #d5d5d5;\n}\n.small_icon {\n  width: 28px;\n  height: 28px;\n}\n.padding_bottom {\n  padding-bottom: 16px;\n}\n/**\n * Created by yxl79 on 2017/4/10.\n * 列表样式基础\n */\n.list {\n  justify-content: center;\n  padding-top: 18px;\n  padding-bottom: 18px;\n}\n.list_mt {\n  margin-top: 21px;\n}\n.list_padding {\n  padding-left: 18px;\n  padding-right: 18px;\n}\n/**\n * Created by yxl79 on 2017/4/8.\n * 普通列表样式\n */\n.list_content {\n  flex: 1;\n  justify-content: center;\n}\n.list_icon {\n  width: 28px;\n  height: 28px;\n}\n.mark_status {\n  border-width: 1px;\n  border-color: #2e72ee;\n  border-radius: 23px;\n  padding-left: 9px;\n  padding-right: 9px;\n  color: #2e72ee;\n}\n.mark_img {\n  width: 188px;\n  height: 188px;\n  border-width: 1px;\n  border-color: #d5d5d5;\n  border-radius: 6px;\n}\n/**for Web**/\nbody .mark_status {\n  padding-left: 9px !important;\n  padding-right: 9px !important;\n}\n", ""]);

// exports


/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/**\n  * dropdown组件\n */\n/**\n * Created by yxl79 on 2017/4/10.\n * some config data // theme\n */\n.drop_mask {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  flex: 1;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.options {\n  position: absolute;\n  left: 0;\n  right: 0;\n  transform-origin: center center;\n}\n.drop_cell {\n  flex-direction: row;\n  align-items: center;\n  height: 90px;\n  padding-left: 30px;\n  padding-right: 30px;\n  border-top-width: 1px;\n  border-top-color: #d5d5d5;\n}\n.option_num {\n  color: #333;\n  font-size: 33px;\n}\n.option_name {\n  color: #333;\n  font-size: 33px;\n  flex: 1;\n}\n.option_selected {\n  background-color: #ededed;\n}\n.bg_white {\n  background-color: white;\n}\n", ""]);

// exports


/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(106)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(47),
  /* template */
  __webpack_require__(79),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "E:\\Weex\\Weex\\Vue\\src\\view\\markInfo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] markInfo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-85299a5a", Component.options)
  } else {
    hotAPI.reload("data-v-85299a5a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//

//选项太多需要使用scroller
var animation = weex.requireModule('animation');
exports.default = {
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    data: function data() {
        return {
            visibility: "hidden",
            selectedIndex: 0
        };
    },
    methods: {
        close: function close() {
            this.switchView();
            this.$emit('change', null);
        },
        setIndex: function setIndex(index) {
            this.selectedIndex = index;
        },
        itemClick: function itemClick(option, index) {
            this.selectedIndex = index;
            this.switchView();
            this.$emit('change', option);
        },
        switchView: function switchView() {
            this.toggleMaskVisible();
            this.opacity(this.$refs.dropMask);
            this.collapse(this.$refs.options);
        },
        toggleMaskVisible: function toggleMaskVisible() {
            this.current_showMask = !this.current_showMask;
            var visibility = this.current_showMask ? 'visible' : 'hidden';
            console.log(this.$refs.dropMask);
            this.visibility = visibility;
        },
        opacity: function opacity(el, callback) {
            var self = this;
            self.current_opacity = self.current_opacity === 1 ? 0.1 : 1;
            this.anim(el, {
                opacity: self.current_opacity
            }, 'ease', 100, callback);
        },
        collapse: function collapse(el, callback) {
            var platform = weex.config.env.platform;
            var translate = 'translate(0, 100%)'; // Web need % ;
            this.current_translate = this.current_translate && this.current_translate !== 'translate(0,0)' ? 'translate(0,0)' : translate;
            this.anim(el, {
                transform: this.current_translate
            }, 'ease', 100, callback);
        },
        anim: function anim(ref, styles, timingFunction, duration, callback) {
            animation.transition(ref, {
                styles: styles,
                timingFunction: timingFunction,
                duration: duration
            }, callback || function () {});
        }
    }
};

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropdown = undefined;

var _dropdown = __webpack_require__(20);

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.dropdown = _dropdown2.default; /**
                                        * Created by Administrator on 2017/4/13 0013.
                                        */

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(3)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(12)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(21),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "E:\\Weex\\Weex\\Vue\\src\\component\\dropdown\\dropdown.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dropdown.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dc09e26a", Component.options)
  } else {
    hotAPI.reload("data-v-dc09e26a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "dropMask",
    staticClass: "drop_mask",
    style: ({
      visibility: _vm.visibility
    }),
    on: {
      "click": function($event) {
        _vm.close()
      }
    }
  }, [_c('list', {
    ref: "options",
    staticClass: "options",
    staticStyle: {
      "top": "-550px",
      "height": "550px"
    },
    attrs: {
      "show-scrollbar": "true"
    }
  }, _vm._l((_vm.options), function(option, index) {
    return _c('cell', {
      class: ['drop_cell', _vm.selectedIndex == index ? 'option_selected' : 'bg_white'],
      attrs: {
        "keep-scroll-position": "true"
      },
      on: {
        "click": function($event) {
          _vm.itemClick(option, index)
        }
      }
    }, [_c('text', {
      staticClass: "option_name"
    }, [_vm._v(_vm._s(option.type))]), _vm._v(" "), _c('text', {
      staticClass: "option_num"
    }, [_vm._v(_vm._s(option.count))])])
  }))], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-dc09e26a", module.exports)
  }
}

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appConfig = exports.api = undefined;

var _weexConfig = __webpack_require__(5);

var navigator = weex.requireModule("navigator"); /**
                                                  * Created by yxl79 on 2017/4/8.
                                                  * 对于api的封装
                                                  */

var modal = weex.requireModule("modal");
var stream = weex.requireModule("stream");
var loadingModule = weex.requireModule("loadingModule");
var titleBar = weex.requireModule("titleBarModule");
var globalEvent = weex.requireModule('globalEvent');
var toastModule = weex.requireModule("toastModule");
var storage = weex.requireModule('storage');
var share = weex.requireModule('shareModule');
var refresh = weex.requireModule('refreshModule');
var nav = weex.requireModule("navigatorModule");
var api = {
    startActivity: function startActivity(bundleUrl, /*Object*/params) {
        //使用json来传递，如果参数名为jsonData则原生使用json来解析
        var url = bundleUrl;
        var paramStr = this.serialize(params, true);
        if (paramStr) {
            url += "?" + paramStr;
        }
        navigator.push({
            url: url,
            animated: "true"
        });
    },
    closeActivity: function closeActivity() {
        navigator.pop({
            animated: "true"
        });
    },
    openController: function openController(type, data) {
        nav && nav.open(type, data);
    },
    serialize: function serialize( /*Object*/json, /*boolean*/encode) {
        if (arguments.length === 1) {
            encode = false;
        }
        if (json) {
            var paramArray = [];
            for (var key in json) {
                var val = json[key];
                var value = encode ? encodeURIComponent(val) : encodeURI(val);
                paramArray.push(key + "=" + (val ? value : ""));
            }
            return paramArray.join("&");
        } else {
            return "";
        }
    },

    encodeUTF8: function encodeUTF8(str) {
        var temp = "",
            rs = "";
        for (var i = 0, len = str.length; i < len; i++) {
            temp = str.charCodeAt(i).toString(16);
            rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
        }
        return rs;
    },
    ajax: function ajax( /*String*/type, /*String*/url, /*Object*/params, /*Function*/callback, /*Boolean*/handClose) {
        //默认添加请求头,web中body传递参数，支持对象，weex中get需要在url传递，post可以在body中传递，具体的需要参考
        var headers = {
            secret: "af2ab55f5cfe4c269a7b726e7f3fdef9"
        };
        if (type.toLowerCase() === "post") {
            headers["Content-Type"] = "application/json";
        }
        if (type.toLowerCase() === "get") {
            url = _weexConfig.appConfig.host + url + (params ? "?" + this.serialize(params) : "");
        } else {
            url = _weexConfig.appConfig.host + url;
            params = JSON.stringify(params);
        }
        //IOS get不能传递body
        var fetchObj = {
            method: type.toUpperCase(),
            type: 'json',
            headers: headers,
            url: url,
            timeout: 100000
        };
        if (type.toLowerCase() === "post") {
            fetchObj.body = params;
        }
        stream.fetch(fetchObj, function (res) {
            if (res.ok) {
                if (res.data.Head.Ret == 0) {
                    callback(res);
                } else {
                    api.toast(res.data.Head.Msg);
                    if (!handClose) {
                        setTimeout(function () {
                            api.closeActivity();
                        }, 1000);
                    }
                }
            } else {
                callback(res);
                if (!handClose) {
                    setTimeout(function () {
                        api.closeActivity();
                    }, 1000);
                }
            }
        });
    },
    showWaiting: function showWaiting() {
        loadingModule && loadingModule.showLoading();
    },
    closeWaiting: function closeWaiting() {
        loadingModule && loadingModule.dismissLoading();
    },
    toast: function toast( /*String*/msg) {
        modal.toast({
            message: msg,
            duration: 1
        });
    },
    alert: function alert( /*String*/msg, /*Function*/callback) {
        modal.alert({
            message: msg
        }, function () {
            callback && callback();
        });
    },

    setTitle: function setTitle( /*String*/title) {
        titleBar && titleBar.setTitle(title);
    },
    setTitleIcon: function setTitleIcon( /*String*/icon) {
        titleBar && titleBar.setTitleIcon(icon);
    },
    setRightAction: function setRightAction( /*Object*/action) {
        titleBar && titleBar.setRightAction && titleBar.setRightAction(action);
    },
    setSecondaryRightAction: function setSecondaryRightAction( /*Object*/action) {
        titleBar && titleBar.setSecondaryRightAction(action);
    },
    addEventListener: function addEventListener( /*String*/eventName, /*Function*/callback) {
        globalEvent && globalEvent.addEventListener(eventName, callback);
    },
    removeEventListener: function removeEventListener( /*String*/eventName) {
        globalEvent && globalEvent.removeEventListener(eventName);
    },
    toastView: function toastView( /*String*/title, /*String*/secondaryTitle, /*String*/icon) {
        toastModule && toastModule.toastByNativeView(title, secondaryTitle, icon);
    },
    store: function store( /*String*/key, /*String*/val) {
        storage.setItem(key, val);
    },
    removeStore: function removeStore( /*String*/key) {
        storage.removeItem(key);
    },
    getStore: function getStore( /*String*/key, /*Function*/callback) {
        storage.getItem(key, function (event) {
            callback(event.data);
        });
    },
    openShare: function openShare( /*String*/title, /*String*/detailId, /*String*/type, /*String*/shareLink, /*String*/imageUrl, /*String*/content, /*String*/icon) {
        share && share.openShareUI({
            title: title,
            detailId: detailId,
            type: type,
            shareLink: shareLink,
            imageUrl: imageUrl,
            content: content,
            icon: icon
        });
    },
    setRefreshEnable: function setRefreshEnable( /*String*/ref, /*boolean*/enable) {
        refresh && function () {
            refresh.setEnable(ref, enable);
        }();
    },
    setRefreshState: function setRefreshState( /*String*/ref, /*boolean*/refreshing) {
        refresh && function () {
            if (weex.config.env.platform === "android") {
                refresh.setRefresh(ref, refreshing);
            } else {
                refresh.setRefresh(refreshing);
            }
        }();
    }
};
exports.api = api;
exports.appConfig = _weexConfig.appConfig;

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _weex = __webpack_require__(4);

var _index = __webpack_require__(7);

var _index2 = __webpack_require__(19);

//debug companyId:"145351189"   回造成Android动画卡顿，需要解决
exports.default = {
    data: function data() {
        return {
            showPage: false,
            companyId: "",
            pageIndex: 1,
            list: [],
            hasMore: false,
            loadMoreSwitch: true, //loadMore开关控制器
            typeList: [],
            type: "全部", //请求类型
            anchor: "down"
        };
    },

    components: {
        "wx-loading": _index.Loading,
        "dropdown": _index2.dropdown
    },
    created: function created() {
        var _this = this;

        _weex.appConfig.host = this.host;
        var $this = this;
        this.getTypes(function () {
            $this.getData(true, null, false);
        });
        _weex.api.addEventListener("title", function () {
            //下拉
            //titleIcon需要修改
            if (_this.anchor === "down") {
                _weex.api.setTitleIcon("arrow_up");
                _this.anchor = "up";
            } else {
                _weex.api.setTitleIcon("arrow_down");
                _this.anchor = "down";
            }
            _this.$refs.dropdown.switchView();
        });
    },
    methods: {
        change: function change(item) {
            _weex.api.setTitleIcon("arrow_down");
            this.anchor = "down";
            if (item) {
                this.type = item.type;
                this.getData(true, null, true);
                _weex.api.setTitle(item.type);
            }
        },
        getTypes: function getTypes(promise) {
            var $this = this;
            _weex.api.getStore("typeList", function (list) {
                $this.typeList = JSON.parse(list);
                $this.type = $this.typeList[0].type;
                _weex.api.removeStore("typeList");
                promise();
            });
        },
        getData: function getData(reload, callback, loading) {
            var _this2 = this;

            //reload为初始化
            if (reload) {
                this.pageIndex = 1;
                this.list = [];
                this.hasMore = false;
                this.loadMoreSwitch = true;
                if (loading) {
                    _weex.api.showWaiting();
                }
            }
            var companyId = this.companyId;
            var $this = this;
            _weex.api.ajax("get", "api/CompanyApi/GetCompany_Trademark", {
                CompanyID: companyId,
                type: _weex.api.encodeUTF8($this.type),
                pageIndex: this.pageIndex
            }, function (res) {
                if (res.ok) {
                    if (res.data.Head.Ret == 0) {
                        $this.pageIndex++;
                        if (res.data.Content && res.data.Content.length > 0) {
                            if (reload) {
                                $this.list = res.data.Content;
                            } else {
                                res.data.Content.forEach(function (item) {
                                    $this.list.push(item);
                                });
                            }
                        }
                        !_this2.showPage && (_this2.showPage = true);
                        if (res.data.Content.length >= _weex.appConfig.pageSize) {
                            $this.hasMore = true;
                            callback && callback(1);
                        } else {
                            //没有更多
                            callback && callback(-1);
                        }
                        setTimeout(function () {
                            _weex.api.closeWaiting();
                        }, 300);
                    } else {
                        _weex.api.toast("加载异常");
                        $this.hasMore = true;
                        callback && callback(1);
                        _weex.api.closeWaiting();
                    }
                } else {
                    _weex.api.toast("加载数据异常，请稍后再试");
                    $this.hasMore = true;
                    callback && callback(1);
                    _weex.api.closeWaiting();
                }
            });
        },
        loadMore: function loadMore() {
            if (this.loadMoreSwitch) {
                this.loadMoreSwitch = false;
                var loading = this.$refs.loading,
                    $this = this;
                //限制loadMore触发多次问题，当UI未发生变化时不会触发loadMore
                loading.startLoading();
                //加载分页数据
                this.getData(false, function (code) {
                    if (code == 1) {
                        $this.loadMoreSwitch = true;
                        loading.stopLoading();
                    } else if (code == -1) {
                        $this.loadMoreSwitch = false;
                        loading.notifyNoData();
                    }
                }, false);
            }
        },
        gotoDetail: function gotoDetail(id) {
            _weex.api.startActivity("company/dishonestDetail.js", {
                title: "失信信息详情",
                dishonestID: id
            });
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by yxl79 on 2017/4/7.
 * 配置化host,使用原生传递过来的host进行
 */
var appConfig = {
    pageSize: 20,
    debug: true, //debug模式，每个界面都有测试数据，确保会有数据显示
    _host: "",
    get host() {
        return this._host || "http://103.242.169.60:40080/";
    },
    set host( /*String*/hostPrefix) {
        this._host = hostPrefix;
    },
    // host:"http://10.40.5.58:5001/",
    // host:"http://localhost:5001/",
    get h5_host() {
        return this._host || "https://api.5ishang.com";
    }
};
exports.appConfig = appConfig;

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//

// issues 转动不停止控制
var animation = weex.requireModule('animation');
exports.default = {
    data: function data() {
        return {
            beforeLoadingText: "加载更多",
            loadingText: "正在加载中...",
            endText: "我也是有底线的",
            loading: 1, //1表示初始状态，2表示加载，3表示没有数据
            stop: false,
            deg: 360
        };
    },
    mounted: function mounted() {
        this.startLoading();
    },
    methods: {
        startLoading: function startLoading() {
            //开始加载
            this.loading = 2;
            this.deg = 0;
        },
        stopLoading: function stopLoading() {
            this.loading = 1;
        },
        notifyNoData: function notifyNoData() {
            this.loading = 3;
        }
    }
};

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = undefined;

var _loading = __webpack_require__(8);

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Loading = _loading2.default; /**
                                      * Created by yxl79 on 2017/4/7.
                                      */

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "flex_1"
  }, [_c('scroller', {
    class: ['bg_silver', _vm.showPage ? 'visible' : 'hidden'],
    staticStyle: {
      "position": "absolute",
      "top": "0",
      "bottom": "0",
      "left": "0",
      "right": "0"
    },
    attrs: {
      "loadmoreoffset": "100",
      "show-scrollbar": "false",
      "append": "tree"
    },
    on: {
      "loadmore": _vm.loadMore
    }
  }, [_vm._l((_vm.list), function(li) {
    return _c('div', {
      staticClass: "list list_mt bg_white flex_row list_padding align_center"
    }, [_c('image', {
      staticClass: "mark_img",
      attrs: {
        "src": li.tmPic
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "list_content list_padding"
    }, [_c('text', {
      staticClass: "font_padding font_size"
    }, [_vm._v(_vm._s(li.tmName))]), _vm._v(" "), _c('text', {
      staticClass: "font_silver font_small font_padding"
    }, [_vm._v("注册号：" + _vm._s(li.regNo))]), _vm._v(" "), _c('text', {
      staticClass: "font_silver font_small font_padding"
    }, [_vm._v("类别：" + _vm._s(li.intCls))]), _vm._v(" "), _c('text', {
      staticClass: "font_silver font_small font_padding"
    }, [_vm._v("申请时间：" + _vm._s(li.appDate))]), _vm._v(" "), _c('div', {
      staticClass: "flex_row"
    }, [_c('text', {
      staticClass: "mark_status font_padding"
    }, [_vm._v("申请状态：" + _vm._s(li.status))])])]), _vm._v(" "), _c('image', {
      staticClass: "list_icon",
      attrs: {
        "resize": "contain",
        "src": "local:///wx_check_more"
      }
    })])
  }), _vm._v(" "), (_vm.hasMore) ? _c('wx-loading', {
    ref: "loading"
  }) : _vm._e()], 2), _vm._v(" "), _c('dropdown', {
    ref: "dropdown",
    attrs: {
      "options": _vm.typeList
    },
    on: {
      "change": _vm.change
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-85299a5a", module.exports)
  }
}

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(9),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "E:\\Weex\\Weex\\Vue\\src\\component\\loading\\loading.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] loading.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a4519e5", Component.options)
  } else {
    hotAPI.reload("data-v-6a4519e5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "padding-top": "20px",
      "padding-bottom": "20px",
      "justify-content": "center",
      "align-items": "center",
      "flex-direction": "row",
      "background-color": "#EDEDED"
    }
  }, [(_vm.loading == 2) ? _c('progressbar', {
    staticStyle: {
      "width": "32px",
      "height": "32px"
    }
  }) : _vm._e(), _vm._v(" "), (_vm.loading != 3) ? _c('text', {
    staticStyle: {
      "text-align": "center",
      "font-size": "28px"
    }
  }, [_vm._v(_vm._s(_vm.loading == 1 ? _vm.beforeLoadingText : _vm.loadingText))]) : _vm._e(), _vm._v(" "), (_vm.loading == 3) ? _c('div', {
    staticStyle: {
      "width": "700px",
      "align-items": "center",
      "flex-direction": "row",
      "justify-content": "center"
    }
  }, [_c('div', {
    staticStyle: {
      "position": "absolute",
      "border-top-width": "1px",
      "border-top-color": "silver",
      "height": "1px",
      "top": "20px",
      "width": "750px",
      "left": "0"
    }
  }), _vm._v(" "), _c('text', {
    staticStyle: {
      "text-align": "center",
      "font-size": "28px",
      "background-color": "#EDEDED"
    }
  }, [_vm._v(_vm._s(_vm.endText))])]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6a4519e5", module.exports)
  }
}

/***/ })

/******/ });