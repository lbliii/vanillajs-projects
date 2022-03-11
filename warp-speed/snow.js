// flake object 
class SnowFlake {
    constructor() {
        // flake coordinates
        this.x = Math.random() * w
        this.y = Math.random() * w
        // flake dimensions 
        this.size = Math.random() * 7
        this.velocity = (Math.random() - .3)
    }

    createSnow(){
        // flake attributes 
        let rgn = Math.floor(Math.random() * 100) 
        if (rgn !== 1) style.fillStyle = '#fff' 
        if (rgn === 1) style.fillStyle = '#000'
        
        
        this.x += this.velocity + (Math.random() - .1)
        this.y += (Math.random() - .5)
        

        // flake illustration 
        style.beginPath()
        style.arc(this.x, this.y, this.size, 0, 360)
        style.fill()
        style.closePath() 

        console.log(style)

    }  
};
 
// flake animation 
function fall() { 
    style.clearRect(0, 0, w, h)
    for (let i = 0; i <  1; i++) snowFlakes.push(new SnowFlake())
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