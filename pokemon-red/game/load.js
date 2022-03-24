console.log("loading map...")
let currentMap = new Map('background','./maps/firstTown.png',-735,-650)
const playerOne = new Player('./sprites/playerUp.png', './sprites/playerDown.png', './sprites/playerLeft.png', './sprites/playerRight.png')
const controller = new Controller

window.onload = () => {

    console.log("creating stage...")
    var stage = new Canvas('canvas','2d',window.innerWidth, window.innerHeight)

    console.log("drawing stage..")
    stage.context.drawImage(currentMap.image, currentMap.xOffSet, currentMap.yOffSet)
    stage.context.drawImage(playerOne.downImage, // works best with 4-framed sprite
        0, // start x crop position
        0, // start y crop position 
        playerOne.downImage.width / 4, // end x crop position 
        playerOne.downImage.height, // end y crop position 
        stage.selector.width / 2 - playerOne.downImage.width / 4 / 2, // x placement coordinates
        stage.selector.height / 2 - playerOne.downImage.height / 2, // y placement coordinates
        playerOne.downImage.width / 4, // rendered sprite width
        playerOne.downImage.height)   // rendered sprite height 
    
    console.log("activating controller...")
    controller.gameControls()
}

 