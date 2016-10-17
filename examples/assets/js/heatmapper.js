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

	var _ClickTracker = __webpack_require__(1);

	var _ClickTracker2 = _interopRequireDefault(_ClickTracker);

	var _ClickRenderer = __webpack_require__(4);

	var _ClickRenderer2 = _interopRequireDefault(_ClickRenderer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Heatmapper = function Heatmapper() {
	  var _this = this;

	  _classCallCheck(this, Heatmapper);

	  this.clickTracker = new _ClickTracker2.default();
	  this.clickRenderer = new _ClickRenderer2.default();
	  this.clickTracker.clickPlaced = function (click) {
	    _this.clickRenderer.clicks.push(click);
	    _this.clickRenderer.drawClick(click);
	  };
	};

	new Heatmapper();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var cssPath = __webpack_require__(2);

	var ClickTracker = function () {
	  function ClickTracker() {
	    _classCallCheck(this, ClickTracker);

	    this.clicks = [];
	    this.clickPlaced = null; // Callback event
	    this.bindEvents();
	  }

	  _createClass(ClickTracker, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this = this;

	      document.addEventListener('click', function (event) {
	        return _this.placeClick(event);
	      });
	      // Override stopPropagation
	      var oldStopPropagation = Event.prototype.stopPropagation;
	      var clickTracker = this;
	      Event.prototype.stopPropagation = function () {
	        clickTracker.placeClick(this);
	        oldStopPropagation.call(this);
	      };
	    }
	  }, {
	    key: 'placeClick',
	    value: function placeClick(event) {
	      var element = event.target;
	      var dimensions = element.getBoundingClientRect();
	      var click = {
	        path: cssPath(element),
	        position: {
	          pixelX: event.offsetX,
	          pixelY: event.offsetY,
	          x: Math.round(event.offsetX / dimensions.width * 100) / 100,
	          y: Math.round(event.offsetY / dimensions.height * 100) / 100
	        }
	      };
	      this.clicks.push(click);
	      if (this.clickPlaced) {
	        this.clickPlaced(click);
	      }
	    }
	  }]);

	  return ClickTracker;
	}();

	exports.default = ClickTracker;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var trim = __webpack_require__(3)

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
/* 3 */
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ClickRenderer = function () {
	  function ClickRenderer() {
	    _classCallCheck(this, ClickRenderer);

	    this.clicks = [];
	    this.initCanvas();
	    this.bindEvents();
	  }

	  _createClass(ClickRenderer, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this = this;

	      window.addEventListener('resize', function (event) {
	        return _this.onWindowSize(event);
	      });
	    }
	  }, {
	    key: 'initCanvas',
	    value: function initCanvas() {
	      var docSize = document.querySelector('html').getBoundingClientRect();
	      this.canvas = document.createElement('canvas');
	      this.canvas.width = Math.round(docSize.width);
	      this.canvas.height = Math.round(docSize.height);
	      this.canvas.style.position = 'absolute';
	      this.canvas.style.top = '0';
	      this.canvas.style.left = '0';
	      this.canvas.style.zIndex = '99999';
	      this.canvas.style.pointerEvents = 'none';
	      this.canvas.classList.add('heatmapper-canvas');
	      document.querySelector('body').appendChild(this.canvas);
	    }
	  }, {
	    key: 'drawClick',
	    value: function drawClick(click) {
	      //this.clicks.push(click)
	      var element = document.querySelector(click.path);
	      var bodyRect = document.querySelector('body').getBoundingClientRect();
	      var rect = element.getBoundingClientRect();
	      var position = { left: rect.left - bodyRect.left, top: rect.top - bodyRect.top };
	      var left = position.left + click.position.x * rect.width;
	      var top = position.top + click.position.y * rect.height;
	      this.drawSpot(left, top);
	    }
	  }, {
	    key: 'drawSpot',
	    value: function drawSpot(x, y) {
	      var context = this.canvas.getContext('2d');
	      var size = 5;
	      context.beginPath();
	      context.arc(x, y, size, 0, 2 * Math.PI, false);
	      context.fillStyle = '#000';
	      context.fill();
	    }
	  }, {
	    key: 'clearClicks',
	    value: function clearClicks() {
	      var context = this.canvas.getContext('2d');
	      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    }
	  }, {
	    key: 'drawClicks',
	    value: function drawClicks() {
	      var _this2 = this;

	      this.clicks.map(function (click, index) {
	        _this2.drawClick(click);
	      });
	    }
	  }, {
	    key: 'onWindowSize',
	    value: function onWindowSize(event) {
	      var _this3 = this;

	      clearTimeout(this.resizeTimeout);
	      this.resizeTimeout = setTimeout(function () {
	        var docSize = document.querySelector('html').getBoundingClientRect();
	        _this3.canvas.width = Math.round(docSize.width);
	        _this3.canvas.height = Math.round(docSize.height);
	        requestAnimationFrame(function () {
	          _this3.redrawClicks();
	        });
	      }, 200);
	    }
	  }, {
	    key: 'redrawClicks',
	    value: function redrawClicks() {
	      this.clearClicks();
	      this.drawClicks();
	    }
	  }]);

	  return ClickRenderer;
	}();

	exports.default = ClickRenderer;

/***/ }
/******/ ]);