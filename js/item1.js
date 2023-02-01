class item1 {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize;
        this.position = {
            x: window.innerWidth,
            y: Math.floor(Math.random() * (window.innerHeight - 150 - 150) + 150),
        }
        this.size = {
            w: 50,
            h: 50,
        }

        this.item1Instance = new Image()
        this.item1Instance.src = './img.bod.png'
        this.Vel = { x: 3, y: 0 }
    }
    draw() {
        this.ctx.drawImage(this.item1Instance, this.position.x, this.position.y, this.size.w, this.size.h)
    }
    move() {
        this.position.x -= this.Vel.x
    }
}