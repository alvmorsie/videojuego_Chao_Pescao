class heroe {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize


        this.position = { x: 100, y: this.canvasSize.h / 2 }
        this.size = { w: 60, h: 80 }

        this.heroeVel = { x: 0, y: 2.5 }
        this.heroeInstance = undefined
        this.bullets = []
        this.framesCounter = 0


    }

    drawHeroe() {
        this.heroeInstance = new Image()
        this.heroeInstance.src = './img/fish.png'
        this.ctx.drawImage(this.heroeInstance, this.position.x, this.position.y, this.size.w, this.size.h)
        this.bullets.forEach(bullets => bullets.draw())
        this.clearBullets()
    }

    setEventListeners() {
        document.onkeyup = e => {
            if (e.key === ' ') {
                this.position.y -= 60
            }
            // if (e.key === 'ArrowRight') {
            //     this.shoot()
            // }
        }
    }

    moveHeroe() {
        this.position.y += this.heroeVel.y;

    }

    shoot() {
        if (this.framesCounter % 50 === 0) {
            this.bullets.push(new Bullet(this.ctx, this.canvasSize, this.position.x, this.position.y, this.size.w, this.size.h))
        }



    }
    clearBullets() {

        this.bullets = this.bullets.filter(bullet => bullet.bulletsPos.x >= 0)

    }

}
