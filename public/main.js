(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

console.log("Cool code!");
var InputComponent = require('./input_component.js').InputComponent;
var RandomInputComponent = require('./input_component.js').RandomInputComponent;
console.log(InputComponent);
console.log(RandomInputComponent);

var Game = (function () {
  function Game(windowSize) {
    _classCallCheck(this, Game);

    this.width = windowSize[0];
    this.height = windowSize[1];
    console.log("width and height", this.width, this.height);

    this.inputState = {
      moving: false,
      buttons: {
        RIGHT: false,
        LEFT: false
      }
    };

    this.renderer = PIXI.autoDetectRenderer(this.width, this.height);

    this.stage = new PIXI.Container();
    this.gfx = new PIXI.Graphics();
    this.stage.addChild(this.gfx);
  }

  _createClass(Game, [{
    key: 'update',
    value: function update() {}
  }, {
    key: 'render',
    value: function render() {
      this.renderer.render(this.stage);
      this.gfx.clear();
      this.gfx.beginFill(0xff1199, 1);
      this.gfx.drawRect(0, 0, 10, 10);
      this.gfx.drawRect(15, 0, 10, 10);
      this.gfx.endFill();
    }
  }, {
    key: 'handleInput',
    value: function handleInput() {}
  }, {
    key: 'loop',
    value: function loop() {
      var _this = this;

      this.currentTime = new Date();
      this.handleInput(); // only used for debug and global handlers now
      this.render();
      requestAnimationFrame(function () {
        return _this.loop();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      console.log("Start game");
      document.body.appendChild(this.renderer.view);
      this.loop();
    }
  }]);

  return Game;
})();

var windowSize = [window.innerWidth, window.innerHeight];

var game = new Game(windowSize);
game.start();

var keyConfig = {
  65: "LEFT",
  83: "DOWN",
  68: "RIGHT",
  87: "UP",
  37: "CAMLEFT",
  39: "CAMRIGHT",
  32: "SPACE",
  90: "ZOOM"
};

window.addEventListener('click', function (e) {
  var point = new PIXI.Point(e.clientX, e.clientY);
  console.log("point!", point);
  game.inputState.buttons['LEFT_CLICK'] = true;
  game.inputState.position = point;
});

window.addEventListener('keyup', function (e) {
  var key = keyConfig[e.keyCode];

  if (key != undefined) {
    game.inputState.buttons[key] = false;
  }
});

window.addEventListener('keydown', function (e) {
  var key = keyConfig[e.keyCode];

  if (key != undefined) {
    game.inputState.buttons[key] = true;
  }
});

},{"./input_component.js":2}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputComponent = (function () {
  function InputComponent(inputState) {
    _classCallCheck(this, InputComponent);

    this.inputState = inputState;
  }

  _createClass(InputComponent, [{
    key: "update",
    value: function update(entity) {
      if (this.inputState.buttons.LEFT == true) {
        entity.direction.x = -1;
        this.inputState.buttons.LEFT = false;
        entity.isActing = true;
      } else if (this.inputState.buttons.RIGHT == true) {
        entity.direction.x = 1;
        this.inputState.buttons.RIGHT = false;
        entity.isActing = true;
      }

      if (this.inputState.buttons.DOWN == true) {
        entity.direction.y = 1;
        this.inputState.buttons.DOWN = false;
        entity.isActing = true;
      } else if (this.inputState.buttons.UP == true) {
        entity.direction.y = -1;
        this.inputState.buttons.UP = false;
        entity.isActing = true;
      }
    }
  }]);

  return InputComponent;
})();

var MOVES = ["UP", "RIGHT", "DOWN", "LEFT"];

var RandomInputComponent = (function () {
  function RandomInputComponent(inputState) {
    _classCallCheck(this, RandomInputComponent);

    this.inputState = inputState;
    this.directionMap = { UP: [0, -1], RIGHT: [1, 0], DOWN: [0, 1], LEFT: [-1, 0] };
  }

  _createClass(RandomInputComponent, [{
    key: "update",
    value: function update(entity) {
      var direction = this.directionMap[MOVES[this._getRandomInt(0, 4)]]; // 0 up, 1 right, 2 down, 3 left
      console.log("direction", direction);
      entity.direction.x += direction[0];
      entity.direction.y += direction[1];
    }
  }, {
    key: "_getRandomInt",
    value: function _getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }]);

  return RandomInputComponent;
})();

module.exports = {
  InputComponent: InputComponent,
  RandomInputComponent: RandomInputComponent
};

},{}]},{},[1])