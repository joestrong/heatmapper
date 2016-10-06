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

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var cssPath = __webpack_require__(1);

	var Heatmapper = function () {
	  function Heatmapper() {
	    _classCallCheck(this, Heatmapper);

	    this.clicks = [];
	    this.initCanvas();
	    this.bindEvents();
	  }

	  _createClass(Heatmapper, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      document.addEventListener('click', this.placeClick.bind(this));
	      window.addEventListener('resize', this.onWindowSize.bind(this));
	    }
	  }, {
	    key: 'initCanvas',
	    value: function initCanvas() {
	      this.canvas = document.createElement('div');
	      this.canvas.style.position = 'absolute';
	      this.canvas.style.top = '0';
	      this.canvas.style.left = '0';
	      this.canvas.style.zIndex = '99999';
	      document.querySelector('body').appendChild(this.canvas);
	    }
	  }, {
	    key: 'placeClick',
	    value: function placeClick(event) {
	      var click = {
	        path: cssPath(event.target),
	        position: {
	          pixelX: event.offsetX,
	          pixelY: event.offsetY,
	          x: Math.round(event.offsetX / event.target.clientWidth * 100) / 100,
	          y: Math.round(event.offsetY / event.target.clientHeight * 100) / 100
	        }
	      };
	      this.clicks.push(click);
	      this.drawClick(click);
	    }
	  }, {
	    key: 'drawClick',
	    value: function drawClick(click) {
	      var element = document.querySelector(click.path);
	      var bodyRect = document.querySelector('body').getBoundingClientRect();
	      var rect = element.getBoundingClientRect();
	      var position = { left: rect.left - bodyRect.left, top: rect.top - bodyRect.top };
	      var left = position.left + click.position.x * element.clientWidth;
	      var top = position.top + click.position.y * element.clientHeight;
	      this.drawSpot(left, top);
	    }
	  }, {
	    key: 'drawSpot',
	    value: function drawSpot(x, y) {
	      var spot = document.createElement('div');
	      spot.style.width = '10px';
	      spot.style.height = '10px';
	      spot.style.borderRadius = '50%';
	      spot.style.backgroundColor = 'black';
	      spot.style.position = 'absolute';
	      spot.style.left = x - 5 + 'px';
	      spot.style.top = y - 5 + 'px';
	      this.canvas.appendChild(spot);
	    }
	  }, {
	    key: 'clearClicks',
	    value: function clearClicks() {
	      this.canvas.innerHTML = '';
	    }
	  }, {
	    key: 'drawClicks',
	    value: function drawClicks() {
	      var _this = this;

	      this.clicks.map(function (click, index) {
	        _this.drawClick(click);
	      });
	    }
	  }, {
	    key: 'onWindowSize',
	    value: function onWindowSize(event) {
	      var _this2 = this;

	      clearTimeout(this.resizeTimeout);
	      this.resizeTimeout = setTimeout(function () {
	        _this2.redrawClicks();
	      }, 200);
	    }
	  }, {
	    key: 'redrawClicks',
	    value: function redrawClicks() {
	      this.clearClicks();
	      this.drawClicks();
	    }
	  }]);

	  return Heatmapper;
	}();

	new Heatmapper();

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