class Bullet {
    constructor(ctx, canvasSize, heroePositionX, heroePositionY, heroeSizeW, heroeSizeH) {

        this.ctx = ctx
        this.canvasSize = canvasSize
        this.bulletsPos = {
            x: heroePositionX + heroeSizeW,
            y: heroePositionY + heroeSizeH / 2
        }

        this.heroeSizeH = heroeSizeH

        this.size = {
            w: 10,
            h: 5,
        }
        //this.bulletsInstance = new Image()
        // this.bulletsInstance.src = './img/bala.png'
        this.Vel = { x: 5, y: 0 }
        this.init()
    }
    init() {
        this.draw()
    }

    draw() {
        //this.ctx.drawImage(this.bulletsInstance, this.bulletsPos.x, this.bulletsPos.y, this.size.w, this.size.h)

        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.bulletsPos.x, this.bulletsPos.y, this.size.w, this.size.h)
        this.move()
    }
    move() {
        this.bulletsPos.x += this.Vel.x;
    }

}