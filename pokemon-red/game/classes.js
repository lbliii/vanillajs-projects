// classes: Boundary, Canvas, Controller, Map, Player, Sprite 
class Boundary {
    constructor(xPos, yPos){
        this.width = 48 // tiles should be square
        this.height = 48
        this.positionX = xPos * this.width + currentMap.xOffSet  // aligns with map
        this.positionY = yPos * this.height + currentMap.yOffSet  
    }

    fence(){
        currentStage.context.fillStyle = 'red'
        currentStage.context.fillRect(this.positionX, this.positionY, this.width, this.height)
    }
}

class Canvas { 
    constructor(selector, context, width, height) { 
        this.selector = document.querySelector(`${selector}`) // canvas element
        this.context = this.selector.getContext(`${context}`) // 2d 
        this.selector.width = width  // default 1024px
        this.selector.height = height // default 576px
        this.context.fillStyle = 'red'
        this.context.fillRect(0,0,this.selector.width, this.selector.height) // canvas size
        }
    }

class Controller {
    constructor() {
        this.right = false 
        this.left = false 
        this.up = false 
        this.down = false 
        this.lastKey = '' // allows direction change when 2 buttons pressed
        this.gameControls = function (){
            window.addEventListener('keyup', function(event){
                var keyName = event.key;
                switch(keyName) {
                  case 'd':
                  case 'ArrowRight':
                      controller.right = false
                      break
                  case 'a':
                  case 'ArrowLeft':
                      controller.left = false
                      break
                  case 'w':
                  case 'ArrowUp':
                      controller.up = false
                      break
                  case 's': 
                  case 'ArrowDown':
                      controller.down = false
                      break
                  default:
                      break
                }
              })
        
              window.addEventListener('keydown', function(event){
                var keyName = event.key
                switch(keyName) {
                  case 'd': 
                  case 'ArrowRight':
                      controller.right = true
                      controller.lastKey = 'right' // helps with changing direction when 2 buttons are pressed
                      break
                  case 'a':
                  case 'ArrowLeft':
                      controller.left = true
                      controller.lastKey = 'left'
                      break
                  case 'w': 
                  case 'ArrowUp':
                      controller.up = true
                      controller.lastKey = 'up'
                      break
                  case 's': 
                  case 'ArrowDown':
                      controller.down = true
                      controller.lastKey = 'down'
                      break
                  default:
                      break
                }
              })
        }
    }
    active() { // use just if statements if you want to strafe but you'll need more sprites.
        if (controller.right === true && controller.lastKey == 'right'){  
            currentMap.xOffSet = currentMap.xOffSet - 3
            boundaries.forEach((boundary) => {  // moves boundaries to keep them in place; may need to do this to other objs as well
                boundary.positionX -= 3
            })
        } else if (controller.left === true){
            currentMap.xOffSet = currentMap.xOffSet + 3
            boundaries.forEach((boundary) => {
                boundary.positionX += 3
            })
        } else if (controller.up === true){
            currentMap.yOffSet = currentMap.yOffSet + 3
            boundaries.forEach((boundary) => {
                boundary.positionY += 3
            })

            // console.log(currentMap.xOffSet) 
        } else if (controller.down === true){
            currentMap.yOffSet = currentMap.yOffSet - 3
            boundaries.forEach((boundary) => {
                boundary.positionY -= 3
            })
        }
    }
}
class Sprite {
    constructor(name, location, velocity, frames, animate = false){
        this.name = name
        this.location = location 
        this.velocity = velocity
        this.frames = frames
        this.animate = animate
    }
}
class Player extends Sprite {
    constructor(src1, src2, src3, src4) {
        super()
        this.upImage = new Image()
        this.upImage.src =`${src1}`
        this.downImage = new Image()
        this.downImage.src =`${src2}`
        this.leftImage = new Image()
        this.leftImage.src =`${src3}`
        this.rightImage = new Image()
        this.rightImage.src =`${src4}`
    }

    summon() {
        currentStage.context.drawImage(playerOne.downImage, // works best with 4-framed sprite
            0, // start x crop position
            0, // start y crop position 
            playerOne.downImage.width / 4, // end x crop position 
            playerOne.downImage.height, // end y crop position 
            currentStage.selector.width / 2 - playerOne.downImage.width / 4 / 2, // x placement coordinates
            currentStage.selector.height / 2 - playerOne.downImage.height / 2, // y placement coordinates
            playerOne.downImage.width / 4, // rendered sprite width
            playerOne.downImage.height)   // rendered sprite height 
    }

}

// class Pokemon extends Sprite {
//     constructor() {
//         this.wild = true 
//     }

// }

class Map { 
    constructor(type, imageUrl, xOffSet, yOffSet){
        this.type = type // background, foreground, item 
        this.image = new Image()
        this.image.src = imageUrl
        this.xOffSet = xOffSet 
        this.yOffSet = yOffSet
        
    }
    draw(){
        var stage = currentStage 
        stage.context.drawImage(currentMap.image, currentMap.xOffSet, currentMap.yOffSet)
    }

}


