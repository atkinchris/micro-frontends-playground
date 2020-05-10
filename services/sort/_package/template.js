var oc=oc||{};oc.components=oc.components||{};oc.components['3345eecb8cfe9df225dcb30e4352f4479b286ff9']=function(model){
  var template = /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./sort/view.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./sort/css/styles.css":
/*!*****************************!*\
  !*** ./sort/css/styles.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\nmodule.exports = {\"awesome\":\"oc__sort-css-styles-css__awesome__1iwQdB28\"};\n\n//# sourceURL=webpack:///./sort/css/styles.css?");

/***/ }),

/***/ "./sort/view.js":
/*!**********************!*\
  !*** ./sort/view.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/styles.css */ \"./sort/css/styles.css\");\n/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_styles_css__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (_ref) {\n        var staticPath = _ref.staticPath;\n\n        return '\\n<div class=\"ln-u-display-none ln-u-display-inline-block@sm ln-u-1/3@sm ln-o-grid__item\">\\n  <form autocomplete=\"false\" id=\"sort_form1\" name=\"sort_form1\" method=\"get\" action=\"#\" class=\"ln-u-display-flex ln-u-soft-bottom\">\\n    <label for=\"sortOptions1\" class=\"ln-c-label--alt ln-u-font-weight-medium\"></label>\\n    <select data-theme=\"none\" id=\"sortOptions1\" name=\"sort\" class=\"ln-c-select ln-c-select--alt\" title=\"Sort by\">\\n      <option value=\"relevance\" selected=\"selected\">\\n              Relevance</option>\\n      <option value=\"price-asc\">\\n              Price (lowest first)</option>\\n      <option value=\"price-desc\">\\n              Price (highest first)</option>\\n      <option value=\"newArrivals\">\\n              search.page.sort.newArrivals</option>\\n      <option value=\"bvratings\">\\n              Ratings</option>\\n      <option value=\"reducedItems\">\\n              Reduced items</option>\\n      <option value=\"new-desc\">\\n              search.page.sort.new-desc</option>\\n      <option value=\"new-asc\">\\n              search.page.sort.new-asc</option>\\n      </select>\\n  </form>\\n</div>\\n';\n});\n\n/*\n<div class=\"ln-u-1/1 ln-u-1/2@xs ln-u-1/3@sm ln-o-grid__item\">\n    <c:if test='${not feature:isEnabled(\"feature.productimagery.plp.amplience\")}'>\n        <form class=\"ln-u-text-align-center ln-u-soft-bottom\">\n            <label class=\"ln-c-form-slider ln-c-form-slider--alt\" for=\"modelFlat\">\n                <input type=\"checkbox\" id=\"modelFlat\" name=\"modelFlat\" class=\"ln-u-hidden js-toggleSwitch\"/>\n                <span class=\"ln-c-form-slider__mechanism\">\n                    <span class=\"ln-c-form-slider__state\"></span>\n                </span>\n            </label>\n        </form>\n    </c:if>\n</div>\n */\n\n//# sourceURL=webpack:///./sort/view.js?");

/***/ })

/******/ });;
  return '' + 
    template.default(model) +
    '<style>.oc__sort-css-styles-css__awesome__1iwQdB28{background:#db7093}</style><script>window.oc = window.oc || {};oc.cmd = oc.cmd || [];oc.cmd.push(function(oc){oc.events.fire(\'oc:cssDidMount\', \'.oc__sort-css-styles-css__awesome__1iwQdB28{background:#db7093}\');});</script>'
      
}