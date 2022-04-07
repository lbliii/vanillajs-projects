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
            playerOne.currentSprite = playerOne.rightImage
            playerOne.frames += 1
            currentMap.xOffSet = currentMap.xOffSet - 3
            boundaries.forEach((boundary) => {  // moves boundaries to keep them in place; may need to do this to other objs as well
                boundary.positionX -= 3
            })
        } else if (controller.left === true){
            playerOne.currentSprite = playerOne.leftImage 
            playerOne.frames += 1 
            currentMap.xOffSet = currentMap.xOffSet + 3
            boundaries.forEach((boundary) => {
                boundary.positionX += 3
            })
        } else if (controller.up === true){
            playerOne.currentSprite = playerOne.upImage 
            playerOne.frames += 1
            currentMap.yOffSet = currentMap.yOffSet + 3
            boundaries.forEach((boundary) => {
                boundary.positionY += 3
            })

            // console.log(currentMap.xOffSet) 
        } else if (controller.down === true){
            playerOne.currentSprite = playerOne.downImage
            playerOne.frames += 1 
            currentMap.yOffSet = currentMap.yOffSet - 3
            boundaries.forEach((boundary) => {
                boundary.positionY -= 3
            })
        }
    }
    enforceBoundaries(obj1, obj2) {
        if (obj1.location.x + obj1.width >= obj2.positionX && // x location + width = right collision
        obj1.location.x <= obj2.positionX + obj2.width && // x location = left collision
        obj1.location.y + obj1.height >= obj2.positionY &&  // y location + height = top collision
        obj1.location.y  <= obj2.positionY + obj2.width) // y location  = bottom collision
        console.log("Colliding!!")
    }
}
class Sprite {
    constructor(name, location = {x:0, y:0}, velocity, frames, animate = false){
        this.name = name
        this.location = location 
        this.velocity = velocity
        this.frames = 0
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
        this.currentSprite = this.downImage
        this.width = this.downImage.width / 4 
        this.height = this.downImage.height 
        this.location.x = currentStage.selector.width / 2 - this.width
        this.location.y = currentStage.selector.height / 2 - this.height 
        
    }

    summon() {
        currentStage.context.drawImage(this.currentSprite, // works best with 4-framed sprite
            0, // start x crop position
            0, // start y crop position 
            this.width, // end x crop position 
            this.height, // end y crop position 
            this.location.x, // x placement coordinates
            this.location.y, // y placement coordinates
            this.width, // rendered sprite width
            this.height)   // rendered sprite height 
            
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


