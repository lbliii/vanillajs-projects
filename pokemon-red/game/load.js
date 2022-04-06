// *** map *** //
let currentMap = new Map('background','./maps/firstTown.png',-735,-650)
let currentStage = new Canvas('canvas','2d',window.innerWidth, window.innerHeight)

const generateCollisionMap =  []

testBoundary = new Boundary()
testBoundary.positionY = 500 
testBoundary.positionX = 400 
const boundaries = [testBoundary]


for (let i = 0; i < firstTownCollisions.length; i += 70) { 
    // 70 is the number of tiles wide in one row of the map
    generateCollisionMap.push(firstTownCollisions.slice(i, 70 + i ))
    // slicing by chunks of 70 = the number of tiles for map height
}
generateCollisionMap.forEach((row, i) => { 
    row.forEach((fence, j) => {
        if (fence === 1025)
            boundaries.push(new Boundary(j, i))
    })
})

// *** player *** //
const playerOne = new Player('./sprites/playerUp.png', './sprites/playerDown.png', './sprites/playerLeft.png', './sprites/playerRight.png')

//  *** controller ** //
const controller = new Controller
controller.gameControls()


// *** animation *** //
window.onload = function() {
    window.requestAnimationFrame(window.onload) // game.animate loops the animation
    // console.log("creating landscape...")
    currentMap.draw()
    boundaries.forEach(boundary => boundary.fence())
    // console.log(testBoundary)
    testBoundary.fence()
    // console.log("summoning player...")
    playerOne.summon()   
    // console.log("activating controller...")
    controller.active()
}


