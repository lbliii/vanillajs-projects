class Game {
    constructor(speedInt, playerOne)
    {
        // game settings 

        this.walls = true; // enforce solid objects
        this.speed = speedInt; // set game speed

        // world settings
        this.player = playerOne;
        this.assets = [playerOne]; // list all game objects 
        this.frame = 0;  // log frames since start of the game

        // initialize game 
        this.init = function () {
            controller.gameControls();
            this.render();
        }

        // render objects 
        this.render = function () {
            for (let i = 0; i < start.assets.length; i++) {
                this.assets[i].create();
            }
            this.frame++
            console.log(this.frame)
        }

        

    }
}

class Controller {
    constructor() {
        this.inputs = {
            up: false,
            down: false,
            left: false,
            right: false,
            space: false
        }
        this.gameControls = function (){
            document.addEventListener('keyup', function(event){
                var keyName = event.key;
                switch(keyName) {
                  case "ArrowRight":
                      controller.inputs.right = false;
                      break;
                  case "ArrowLeft":
                      controller.inputs.left = false;
                      break;
                  case "ArrowUp":
                      controller.inputs.up = false;
                      break;
                  case "ArrowDown":
                      controller.inputs.down = false;
                      break;
                  default:
                      break;
                
                }
                console.log(controller.inputs)
              });
        
              document.addEventListener('keydown', function(event){
                var keyName = event.key;
        
                switch(keyName) {
                  case "ArrowRight":
                      controller.inputs.right = true;
                      playerSprite.style.left = parseInt(playerSprite.style.left) + 10 + 'px';
                      break;
                  case "ArrowLeft":
                      controller.inputs.left = true;
                      playerSprite.style.left = parseInt(playerSprite.style.left) - 10 + 'px';
                      break;
                  case "ArrowUp":
                      controller.inputs.up = true;
                      playerSprite.style.top = parseInt(playerSprite.style.top) - 10 + 'px';
                      break;
                  case "ArrowDown":
                      controller.inputs.down = true;
                      playerSprite.style.top = parseInt(playerSprite.style.top) + 10 + 'px';
                      break;
                  default:
                      break;
                }
                console.log(controller.inputs)
                if (controller.inputs.up == true) playerSprite.style.top += 1;
                console.log(playerSprite.style.left)
              });
        }
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.id = name; 
        this.items = [];
        this.pokemon = [];
        this.badges = []; 
        this.location = {
            x: 1,
            y: 1
        };
        this.progress = 0; 

        this.create = function (){
            playerSprite.style.top = '400px';
            playerSprite.style.left = '400px';
            playerSprite.style.height = '10px';
            playerSprite.style.width = '10px'

        }
    
    }
}


let controller = new Controller(); 
var playerSprite = document.querySelector('#player');
let playerOne = new Player('lbeezr');
let start = new Game(10, playerOne);




start.init();