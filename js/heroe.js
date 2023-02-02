class Heroe {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize


        this.position = { x: 100, y: this.canvasSize.h / 2 }
        this.size = { w: 80, h: 60 }

        this.heroeVel = { x: 0, y: 2 }
        this.heroeInstance = undefined
        this.bullets = []
        this.framesCounter = 0
        this.canShoot = true
        this.canMoveUp = false
        this.canMoveRight = false
        this.canMoveLeft = false
        this.canMoveDown = false
        this.soundBullets = new Audio('./sound/burbuja.mp3')





    }

    drawHeroe() {
        this.heroeInstance = new Image()
        this.heroeInstance.src = './img/nemo.png'
        this.ctx.drawImage(this.heroeInstance, this.position.x, this.position.y, this.size.w, this.size.h)
        this.bullets.forEach(bullets => bullets.draw())
        this.clearBullets()
    }

    setEventListeners() {
        document.onkeydown = e => {
            e.preventDefault()
            if (e.code === 'ArrowUp') {
                this.canMoveUp = true
            }
            if (e.code === 'ArrowRight') {
                this.canMoveRight = true
            }
            if (e.code === 'ArrowLeft') {
                this.canMoveLeft = true
            }

            if (e.code === 'Space') {
                if (this.canShoot) {
                    this.shoot()
                    this.soundBullets.play()
                }
            }
        }
        document.onkeyup = e => {
            if (e.code === 'ArrowUp') {
                this.canMoveUp = false
            }
            if (e.code === 'ArrowRight') {
                this.canMoveRight = false
            }
            if (e.code === 'ArrowLeft') {
                this.canMoveLeft = false
            }
        }
    }

    moveHeroe() {
        this.position.y += this.heroeVel.y;
        if (this.position.x <= 0) {
            this.canMoveLeft = false
        }
        if (this.position.x >= 1000) {
            this.canMoveRight = false
        }

    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.canvasSize, this.position.x, this.position.y, this.size.w, this.size.h))
        this.canShoot = false
    }
    clearBullets() {

        this.bullets = this.bullets.filter(bullet => bullet.bulletsPos.x >= 0)

    }


}
