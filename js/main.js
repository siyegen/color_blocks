console.log("Cool code!");
let InputComponent = require('./input_component.js').InputComponent;
let RandomInputComponent = require('./input_component.js').RandomInputComponent;

const BLOCK_COLOR = 0xfffc2e;
const LINE_COLOR = 0x00b9ff;
const GAME_STATES = {START:0,LOADING:1,GAME:2};
const TIME_TO_ADD = 1; // in ms

class Game {
  constructor(windowSize){
    this.width = windowSize[0];
    this.height = windowSize[1];
    this.cellSize = 25;
    // find number of blocks to fill width
    this.numCols = Math.floor(this.width / this.cellSize);
    this.numRows = Math.floor(this.height / this.cellSize);
    console.log(`width: ${this.width}, height: ${this.height},
      numCols: ${this.numCols}, numRows: ${this.numRows}`);
    console.log(`total number of cells: ${this.numRows*this.numCols}`);

    this.inputState = {
      moving: false,
      buttons: {
        RIGHT: false,
        LEFT: false,
      },
    };

    this.loadingState = {
      total: this.numCols*this.numRows,
      current: 0
    };


    this.renderer = PIXI.autoDetectRenderer(this.width, this.height);

    this.stage = new PIXI.Container();
    this.gfx = new PIXI.Graphics();
    this.stage.addChild(this.gfx);
  }

  update() {
    // every 500ms add new block
    if (this.currentState == GAME_STATES.LOADING) {
      debugger;
      if (this.currentTime - this.loadingState.timeAdded >= TIME_TO_ADD || this.loadingState.current == 0) {
        console.log("add block");
        this.loadingState.current+=2220;
        this.loadingState.timeAdded = new Date();
      }
      if (this.loadingState.total == this.loadingState.current) {
        this.currentState = GAME_STATES.GAME;
        console.log("finished loading", this.currentState);
        console.log(this.loadingState);
      }
    }
  }

  _renderNormal() {
    this.gfx.clear();
    this.gfx.beginFill(BLOCK_COLOR, 1);
    this.gfx.lineStyle(1, LINE_COLOR, 1);
    for (var j=0; j< this.numRows; j++) {
      for (var i = 0; i < this.numCols; i++) {
        this.gfx.drawRect(i*this.cellSize, j*this.cellSize, this.cellSize, this.cellSize);
      };
    };
    this.gfx.endFill();
  }

  _renderLoading() {
    // console.log("In loading");
    // animate in all blocks
  }

  render() {
    this.renderer.render(this.stage);
    if (this.currentState == GAME_STATES.GAME) {
      this._renderNormal();
    } else if (this.currentState == GAME_STATES.LOADING) {
      this._renderLoading();
    } else {
      console.log("In start mode")
    }
  }

  handleInput() {
    if (this.inputState.buttons.SPACE) {
      if (this.currentState == GAME_STATES.START) {
        this.currentState = GAME_STATES.LOADING;
      }
    }
  }

  loop() {
    this.lastTime = this.currentTime;
    this.currentTime = new Date();
    this.handleInput(); // only used for debug and global handlers now
    this.update();
    this.render();
    requestAnimationFrame(() => this.loop());
  }

  start () {
    console.log("Start game");
    document.body.appendChild(this.renderer.view);
    this.currentState = GAME_STATES.START;
    this.currentTime = new Date();
    this.loop();
  }
}

let windowSize = [window.innerWidth, window.innerHeight];

let game = new Game(windowSize);
game.start();

let keyConfig = {
  65: "LEFT",
  83: "DOWN",
  68: "RIGHT",
  87: "UP",
  37: "CAMLEFT",
  39: "CAMRIGHT",
  32: "SPACE",
  90: "ZOOM",
};

window.addEventListener('click', function(e) {
  let point = new PIXI.Point(e.clientX, e.clientY);
  console.log("point!", point)
  game.inputState.buttons['LEFT_CLICK'] = true;
  game.inputState.position = point;
});

window.addEventListener('keyup', function(e) {
  let key = keyConfig[e.keyCode];

  if (key != undefined) {
    game.inputState.buttons[key] = false;
  }
});

window.addEventListener('keydown', function(e) {
  let key = keyConfig[e.keyCode];

  if (key != undefined) {
    game.inputState.buttons[key] = true;
  }
});