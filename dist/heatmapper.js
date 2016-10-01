/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"
	const cssPath = __webpack_require__(1)

	class Heatmapper {

	  constructor() {
	    this.clicks = [];
	    this.bindEvents()
	  }

	  bindEvents() {
	    document.addEventListener('click', this.placeClick.bind(this))
	  }

	  placeClick(event) {
	    let meta = {
	      path: cssPath(event.target),
	      x: event.offsetX,
	      y: event.offsetY
	    }
	    this.clicks.push(meta)
	  }
	}

	new Heatmapper()


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var trim = __webpack_require__(2)

	  , classSelector = function (className) {
	      var selectors = className.split(/\s/g)
	        , array = []

	      for (var i = 0; i < selectors.length; ++i) {
	        if (selectors[i].length > 0) {
	          array.push('.' + selectors[i])
	        }
	      }

	      return array.join('')
	    }

	  , nthChild = function (elm) {
	      var childNumber = 0
	        , childNodes = elm.parentNode.childNodes
	        , index = 0

	      for(; index < childNodes.length; ++index) {
	        if (childNodes[index].nodeType === 1)
	          ++childNumber

	        if (childNodes[index] === elm)
	          return childNumber
	      }
	    }

	  , path = function (elm, rootNode, list) {

	      var tag = elm.tagName.toLowerCase()
	        , selector = [ tag ]
	        , className = elm.getAttribute('class')
	        , id = elm.getAttribute('id')

	      if (id) {
	        list.unshift(tag + '#' + trim(id))
	        return list
	      }

	      if (className)
	        selector.push( classSelector(className) )

	      if (tag !== 'html' && tag !== 'body' && elm.parentNode) {
	        selector.push(':nth-child(' + nthChild(elm) + ')')
	      }

	      list.unshift(selector.join(''))

	      if (elm.parentNode && elm.parentNode !== rootNode && elm.parentNode.tagName) {
	        path(elm.parentNode, rootNode, list)
	      }

	      return list
	    }

	module.exports = function (elm, rootNode) {
	  return path(elm, rootNode, []).join(' > ')
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	
	exports = module.exports = trim;

	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}

	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};

	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};


/***/ }
/******/ ]);