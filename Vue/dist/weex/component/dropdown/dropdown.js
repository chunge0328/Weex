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
/******/ 	return __webpack_require__(__webpack_require__.s = 108);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports) {

module.exports = {
  "drop_mask": {
    "position": "fixed",
    "top": 0,
    "bottom": 0,
    "left": 0,
    "right": 0,
    "flex": 1,
    "backgroundColor": "rgba(0,0,0,0.5)"
  },
  "options": {
    "position": "absolute",
    "left": 0,
    "right": 0,
    "transformOrigin": "center center"
  },
  "drop_cell": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": 90,
    "paddingLeft": 30,
    "paddingRight": 30,
    "borderTopWidth": 1,
    "borderTopColor": "#d5d5d5"
  },
  "option_num": {
    "color": "#333333",
    "fontSize": 33
  },
  "option_name": {
    "color": "#333333",
    "fontSize": 33,
    "flex": 1
  },
  "option_selected": {
    "backgroundColor": "#ededed"
  },
  "bg_white": {
    "backgroundColor": "#FFFFFF"
  }
}

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(10)
)

/* script */
__vue_exports__ = __webpack_require__(9)

/* template */
var __vue_template__ = __webpack_require__(11)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\Weex\\Weex\\Vue\\src\\component\\dropdown\\dropdown.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-36e40596"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "dropMask",
    staticClass: ["drop_mask"],
    style: {
      visibility: _vm.visibility
    },
    on: {
      "click": function($event) {
        _vm.close()
      }
    }
  }, [_c('list', {
    ref: "options",
    staticClass: ["options"],
    staticStyle: {
      top: "-550px",
      height: "550px"
    },
    attrs: {
      "showScrollbar": "true"
    }
  }, _vm._l((_vm.options), function(option, index) {
    return _c('cell', {
      class: ['drop_cell', _vm.selectedIndex == index ? 'option_selected' : 'bg_white'],
      appendAsTree: true,
      attrs: {
        "keepScrollPosition": "true",
        "append": "tree"
      },
      on: {
        "click": function($event) {
          _vm.itemClick(option, index)
        }
      }
    }, [_c('text', {
      staticClass: ["option_name"]
    }, [_vm._v(_vm._s(option.type))]), _c('text', {
      staticClass: ["option_num"]
    }, [_vm._v(_vm._s(option.count))])])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 9:
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

/***/ })

/******/ });