class Boundary {
    constructor(tile, position){
        this.width = tile  // tiles should be square
        this.height = tile 
        this.position = position
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
        this.lastKey = '' // stores the last keydown input 
        
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
                      this.lastKey = 'ArrowRight' // helps with changing direction when 2 buttons are pressed
                      break
                  case 'a':
                  case 'ArrowLeft':
                      controller.left = true
                      this.lastKey = 'ArrowLeft'
                      break
                  case 'w': 
                  case 'ArrowUp':
                      controller.up = true
                      this.lastKey = 'ArrowUp'
                      break
                  case 's': 
                  case 'ArrowDown':
                      controller.down = true
                      this.lastKey = 'ArrowDown'
                      break
                  default:
                      break
                }
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
    constructor(src1, src2, src3, src4){
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

}

