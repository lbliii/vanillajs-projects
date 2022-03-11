// flake object 
class SnowFlake {
    constructor() {
        // flake coordinates
        this.x = Math.random() * w 
        this.y = Math.random()
        // flake dimensions 
        this.size = Math.random() * 3.5
        this.velocity = (Math.random() - .3)
    }

    createSnow(){
        // flake attributes 
        style.fillStyle = '#fff' 
        this.y += this.velocity + (Math.random() - .1)
        this.x += (Math.random() - .5)
        
        // flake illustration 
        style.beginPath()
        style.arc(this.x, this.y, this.size, 0, 360)
        style.fill()
        style.closePath() 
    }  
};
 
// flake animation 
function fall() { 
    style.clearRect(0, 0, w, h)
    for (let i = 0; i < Math.floor(Math.random() * 2); i++) snowFlakes.push(new SnowFlake())
    snowFlakes.forEach(flake => flake.createSnow()) 
    requestAnimationFrame(fall)
};

// canvas settings
const landscape = document.getElementById('weather')
    w = landscape.width = window.innerWidth
    h = landscape.height = window.innerHeight

const style = landscape.getContext('2d')

function reCanvas() { 
    w = landscape.width = window.innerWidth
    h = landscape.height = window.innerHeight
}

// let it snow 
const snowFlakes = []
fall();
window.onresize = reCanvas 