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
/******/ 	return __webpack_require__(__webpack_require__.s = 120);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.appConfig = exports.api = undefined;

var _weexConfig = __webpack_require__(1);

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

/***/ 1:
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

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = undefined;

var _tab = __webpack_require__(13);

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Tab = _tab2.default; /**
                              * Created by yxl79 on 2017/3/27.
                              * 顶部导航，切换动画
                              */

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(72)
)

/* script */
__vue_exports__ = __webpack_require__(39)

/* template */
var __vue_template__ = __webpack_require__(94)
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
__vue_options__.__file = "E:\\Weex\\Weex\\Vue\\src\\view\\copyright.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-9240a5b2"
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

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(7)
)

/* script */
__vue_exports__ = __webpack_require__(6)

/* template */
var __vue_template__ = __webpack_require__(8)
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
__vue_options__.__file = "E:\\Weex\\Weex\\Vue\\src\\component\\tab\\tab.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-bf478330"
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


/***/ }),

/***/ 2:
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

/***/ 3:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      paddingTop: "20px",
      paddingBottom: "20px",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "#EDEDED"
    }
  }, [(_vm.loading == 2) ? _c('progressbar', {
    staticStyle: {
      width: "32px",
      height: "32px"
    }
  }) : _vm._e(), (_vm.loading != 3) ? _c('text', {
    staticStyle: {
      textAlign: "center",
      fontSize: "28px"
    }
  }, [_vm._v(_vm._s(_vm.loading == 1 ? _vm.beforeLoadingText : _vm.loadingText))]) : _vm._e(), (_vm.loading == 3) ? _c('div', {
    staticStyle: {
      width: "700px",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center"
    }
  }, [_c('div', {
    staticStyle: {
      position: "absolute",
      borderTopWidth: "1px",
      borderTopColor: "silver",
      height: "1px",
      top: "20px",
      width: "750px",
      left: "0"
    }
  }), _c('text', {
    staticStyle: {
      textAlign: "center",
      fontSize: "28px",
      backgroundColor: "#EDEDED"
    }
  }, [_vm._v(_vm._s(_vm.endText))])]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__(12);

var _index2 = __webpack_require__(4);

var _weex = __webpack_require__(0);

exports.default = {
    data: function data() {
        return {
            showLoading: 'hide',
            showPage: false,
            companyId: "",
            copyRightList: [],
            pageIndex: 1,
            hasMore: false,
            loadMoreSwitch: true //loadMore开关控制器
        };
    },
    created: function created() {
        _weex.appConfig.host = this.host;
        //加载数据,diaoyong
        this.getData(function () {});
    },
    components: {
        'tab': _index.Tab,
        "wx-loading": _index2.Loading
    },
    methods: {
        getData: function getData(callback) {
            var _this = this;

            var companyId = this.companyId;
            var $this = this;
            _weex.api.ajax("get", "api/CompanyApi/GetCompany_CopyRight", {
                CompanyID: companyId,
                pageIndex: this.pageIndex
            }, function (res) {
                if (res.ok) {
                    if (res.data.Head.Ret == 0) {
                        _this.pageIndex++;
                        if (res.data.Content && res.data.Content.length > 0) {
                            res.data.Content.forEach(function (item) {
                                $this.copyRightList.push(item);
                            });
                        }
                        _this.showPage = true;
                        if (res.data.Content.length >= _weex.appConfig.pageSize) {
                            _this.hasMore = true;
                            callback(1);
                        } else {
                            //没有更多
                            callback(-1);
                        }
                        setTimeout(function () {
                            _weex.api.closeWaiting();
                        }, 300);
                    } else {
                        _weex.api.toast("加载异常");
                        _this.hasMore = true;
                        callback(1);
                        _weex.api.closeWaiting();
                    }
                } else {
                    _weex.api.toast("加载数据异常，请稍后再试");
                    _this.hasMore = true;
                    callback(1);
                    _weex.api.closeWaiting();
                }
            });
        },
        gotoDetail: function gotoDetail(li) {
            //传递数据
            var param = li;
            param.title = "著作权信息";
            param.icons = "share_black";
            _weex.api.startActivity("company/copyrightInfo.js", param);
        },

        loadMore: function loadMore() {
            if (this.loadMoreSwitch) {
                this.loadMoreSwitch = false;
                var loading = this.$refs.loading,
                    $this = this;
                //限制loadMore触发多次问题，当UI未发生变化时不会触发loadMore
                loading.startLoading();
                //加载分页数据
                this.getData(function (code) {
                    if (code == 1) {
                        $this.loadMoreSwitch = true;
                        loading.stopLoading();
                    } else if (code == -1) {
                        $this.loadMoreSwitch = false;
                        loading.notifyNoData();
                    }
                });
            }
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

//debug companyId:"2973638108"

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = undefined;

var _loading = __webpack_require__(5);

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Loading = _loading2.default; /**
                                      * Created by yxl79 on 2017/4/7.
                                      */

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(2)

/* template */
var __vue_template__ = __webpack_require__(3)
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
__vue_options__.__file = "E:\\Weex\\Weex\\Vue\\src\\component\\loading\\loading.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
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
//
//
//
//

var animation = weex.requireModule('animation');
var modal = weex.requireModule("modal");
exports.default = {
    props: {
        tabsAdapter: {
            type: Array,
            required: true
        },
        tabShowNumber: {
            type: String,
            required: true
        }
    },
    data: function data() {
        return {
            index: 0,
            bar_left: 0
        };
    },
    created: function created() {
        this.sliderWidth = parseInt(750 / this.tabsAdapter.length);
    },
    methods: {
        clickEve: function clickEve(index) {
            this.anim(index);
        },
        anim: function anim(index) {
            if (this.index == index) return;
            this.bar_left = parseInt(this.sliderWidth) * parseInt(index);
            /*     let testEl = this.$refs.tab_bar_id1;
                 var delX=parseInt(this.sliderWidth)*parseInt(index)+"px";
                 animation.transition(testEl, {
                     styles: {
                         transform: 'translate('+delX+', 0)',
                     },
                     duration: 200
                 });*/
            this.index = index;
        },
        changeSlider: function changeSlider(event) {
            this.anim(event.index);
        }
    }
};

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = {
  "font_padding": {
    "paddingTop": 4,
    "paddingBottom": 4
  },
  "font_bold": {
    "fontWeight": "700"
  },
  "font_silver": {
    "color": "#999999"
  },
  "font_orange": {
    "color": "#ffb837"
  },
  "font_size": {
    "fontSize": 28
  },
  "font_small": {
    "fontSize": 23
  },
  "font_big": {
    "fontSize": 35
  },
  "bg_white": {
    "backgroundColor": "#FFFFFF"
  },
  "bg_silver": {
    "backgroundColor": "#EDEDED"
  },
  "hidden": {
    "visibility": "hidden"
  },
  "visible": {
    "visibility": "visible"
  },
  "gone": {
    "height": 0.1,
    "overflow": "hidden"
  },
  "text_center": {
    "textAlign": "center"
  },
  "flex_1": {
    "flex": 1
  },
  "flex_row": {
    "flexDirection": "row"
  },
  "flex_col": {
    "flexDirection": "column"
  },
  "align_center": {
    "alignItems": "center"
  },
  "justify_center": {
    "justifyContent": "center"
  },
  "justify_start": {
    "justifyContent": "flex-start"
  },
  "h2": {
    "fontSize": 38,
    "fontWeight": "bold",
    "textAlign": "center"
  },
  "border_top": {
    "borderTopWidth": 1,
    "borderTopColor": "#d5d5d5"
  },
  "border_left": {
    "borderLeftWidth": 1,
    "borderLeftColor": "#d5d5d5"
  },
  "small_icon": {
    "width": 28,
    "height": 28
  },
  "padding_bottom": {
    "paddingBottom": 16
  },
  "tab": {
    "height": 84,
    "flexDirection": "row",
    "overflow": "hidden"
  },
  "tab_bar": {
    "height": 4,
    "backgroundColor": "#fbc143",
    "position": "absolute",
    "bottom": 0
  },
  "bar_title": {
    "fontSize": 30,
    "fontWeight": "400"
  }
}

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

module.exports = {
  "font_padding": {
    "paddingTop": 4,
    "paddingBottom": 4
  },
  "font_bold": {
    "fontWeight": "700"
  },
  "font_silver": {
    "color": "#999999"
  },
  "font_orange": {
    "color": "#ffb837"
  },
  "font_size": {
    "fontSize": 28
  },
  "font_small": {
    "fontSize": 23
  },
  "font_big": {
    "fontSize": 35
  },
  "bg_white": {
    "backgroundColor": "#FFFFFF"
  },
  "bg_silver": {
    "backgroundColor": "#EDEDED"
  },
  "hidden": {
    "visibility": "hidden"
  },
  "visible": {
    "visibility": "visible"
  },
  "gone": {
    "height": 0.1,
    "overflow": "hidden"
  },
  "text_center": {
    "textAlign": "center"
  },
  "flex_1": {
    "flex": 1
  },
  "flex_row": {
    "flexDirection": "row"
  },
  "flex_col": {
    "flexDirection": "column"
  },
  "align_center": {
    "alignItems": "center"
  },
  "justify_center": {
    "justifyContent": "center"
  },
  "justify_start": {
    "justifyContent": "flex-start"
  },
  "h2": {
    "fontSize": 38,
    "fontWeight": "bold",
    "textAlign": "center"
  },
  "border_top": {
    "borderTopWidth": 1,
    "borderTopColor": "#d5d5d5"
  },
  "border_left": {
    "borderLeftWidth": 1,
    "borderLeftColor": "#d5d5d5"
  },
  "small_icon": {
    "width": 28,
    "height": 28
  },
  "padding_bottom": {
    "paddingBottom": 16
  },
  "list": {
    "justifyContent": "center",
    "paddingTop": 18,
    "paddingBottom": 18
  },
  "list_mt": {
    "marginTop": 21
  },
  "list_padding": {
    "paddingLeft": 18,
    "paddingRight": 18
  },
  "list_content": {
    "flex": 1,
    "justifyContent": "center"
  },
  "list_icon": {
    "width": 28,
    "height": 28
  }
}

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["flex_1"]
  }, [_c('div', {
    staticClass: ["tab", "bg_white"]
  }, [_vm._l((_vm.tabsAdapter), function(tabItem, index) {
    return _c('div', {
      key: tabItem.type,
      staticClass: ["flex_1", "justify_center", "align_center"],
      on: {
        "click": function($event) {
          _vm.clickEve(index)
        }
      }
    }, [(_vm.tabShowNumber == 'true') ? _c('text', {
      staticClass: ["bar_title"]
    }, [_vm._v(_vm._s(tabItem.type) + "（" + _vm._s(tabItem.num) + "）")]) : _c('text', {
      staticClass: ["bar_title"]
    }, [_vm._v(_vm._s(tabItem.type))])])
  }), _c('div', {
    ref: "tab_bar_id1",
    staticClass: ["tab_bar"],
    style: {
      width: _vm.sliderWidth + 'px',
      left: _vm.bar_left + 'px'
    }
  })], 2), _c('slider', {
    ref: "tab_slider",
    staticClass: ["flex_1"],
    attrs: {
      "autoPlay": "false",
      "index": _vm.index,
      "scrollable": "false"
    },
    on: {
      "change": _vm.changeSlider
    }
  }, [_vm._l((_vm.tabsAdapter), function(tabItem, _index) {
    return _vm._t('tabContent' + _index)
  })], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ 94:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroller', {
    class: ['bg_silver', _vm.showPage ? 'visible' : 'hidden'],
    appendAsTree: true,
    attrs: {
      "showScrollbar": "false",
      "append": "tree",
      "loadmoreoffset": "100"
    },
    on: {
      "loadmore": _vm.loadMore
    }
  }, [_vm._l((_vm.copyRightList), function(li) {
    return _c('div', {
      staticClass: ["list", "bg_white", "list_mt", "flex_row", "align_center", "list_padding"],
      on: {
        "click": function($event) {
          _vm.gotoDetail(li)
        }
      }
    }, [_c('div', {
      staticClass: ["list_content"]
    }, [_c('text', {
      staticClass: ["font_size", "font_padding"]
    }, [_vm._v(_vm._s(li.fullname))]), _c('text', {
      staticClass: ["font_small", "font_silver", "font_padding"]
    }, [_vm._v("登记号：" + _vm._s(li.regnum))]), _c('text', {
      staticClass: ["font_small", "font_silver", "font_padding"]
    }, [_vm._v("登记日期：" + _vm._s(li.regtime))]), _c('text', {
      staticClass: ["font_small", "font_silver", "font_padding"]
    }, [_vm._v("发布日期：" + _vm._s(li.publishtime))])]), _c('image', {
      staticClass: ["list_icon"],
      attrs: {
        "resize": "contain",
        "src": "local:///wx_check_more"
      }
    })])
  }), (_vm.hasMore) ? _c('wx-loading', {
    ref: "loading"
  }) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });