console.log("Cool code!");
let InputComponent = require('./input_component.js').InputComponent;
let RandomInputComponent = require('./input_component.js').RandomInputComponent;
console.log(InputComponent);
console.log(RandomInputComponent);

class Game {
  constructor(windowSize){
    this.width = windowSize[0];
    this.height = windowSize[1];
    console.log("width and height", this.width, this.height);

    this.inputState = {
      moving: false,
      buttons: {
        RIGHT: false,
        LEFT: false,
      },
    };


    this.renderer = PIXI.autoDetectRenderer(this.width, this.height);

    this.stage = new PIXI.Container();
    this.gfx = new PIXI.Graphics();
    this.stage.addChild(this.gfx);
  }

  update() {
  }

  render() {
    this.renderer.render(this.stage);
    this.gfx.clear();
    this.gfx.beginFill(0xff1199, 1);
    this.gfx.drawRect(0, 0, 10, 10);
    this.gfx.drawRect(15, 0, 10, 10);
    this.gfx.endFill();
  }

  handleInput() {
  }

  loop() {
    this.currentTime = new Date();
    this.handleInput(); // only used for debug and global handlers now
    this.render();
    requestAnimationFrame(() => this.loop());
  }

  start () {
    console.log("Start game");
    document.body.appendChild(this.renderer.view);
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