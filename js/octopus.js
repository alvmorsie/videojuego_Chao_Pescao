class Octopus {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize;
        this.position = {
            x: window.innerWidth,
            y: Math.floor(Math.random() * (window.innerHeight - 300) + 150),
        }
        this.size = {
            w: 90,
            h: 90,
        }
        this.octopusInstance = new Image()
        this.octopusInstance.src = './img/pulpo.png'
        this.Vel = { x: 2.5, y: 0 }
    }
    draw() {
        this.ctx.drawImage(this.octopusInstance, this.position.x, this.position.y, this.size.w, this.size.h)
    }
    move() {
        this.position.x -= this.Vel.x
    }
}