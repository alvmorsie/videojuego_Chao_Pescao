class Enemy {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize;
        this.position = {
            x: window.innerWidth,
            y: Math.floor(Math.random() * (window.innerHeight - 300) + 150),
        }
        this.size = {
            w: 80,
            h: 100,
        }

        this.enemiesInstance = new Image()
        this.enemiesInstance.src = './img/shark.png'
        this.Vel = { x: 5, y: 0 }
    }
    draw() {
        this.ctx.drawImage(this.enemiesInstance, this.position.x, this.position.y, this.size.w, this.size.h)
    }
    move() {
        this.position.x -= this.Vel.x
    }

}