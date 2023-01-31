const gameApp = {
    name: 'Bod Esponja Run',
    descripcion: 'sfshjbsdhvbdskh',
    version: '1.0.0',
    license: undefined,
    author: 'Yadmina Moreno, Álvaro Moreno',
    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    heroe: undefined,
    background: undefined,
    enemies: [],
    framesCounter: 0,
    score: 0,
    interval: undefined,





    init() {
        this.setContext()
        this.setDimensions()
        this.start()




    },
    setContext() {
        this.canvasTag = document.querySelector('canvas')
        this.ctx = this.canvasTag.getContext('2d')
    },
    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight
        }
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)

    },

    start() {
        this.createHeroe()
        this.generateEnemies()



        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.clearAll()
            this.drawAll()
            this.heroe.moveHeroe()
            this.enemies.forEach(enemy => enemy.move())
            this.heroe.setEventListeners()
            this.generateEnemies()
            this.clearEnemies()
            this.collisionWithEnemies()
            this.collisionWithSky()
            this.collisionWithFloor()
            this.collisionBulletsWithEnemies()
            this.drawScore()

        }, 10)
        setInterval(() => {
            this.heroe.shoot()
        }, 1000)
    },

    createHeroe() {
        this.heroe = new heroe(this.ctx, this.canvasSize)
    },



    generateEnemies() {
        if (this.framesCounter % 70 === 0) {
            this.enemies.push(new enemies(this.ctx, this.canvasSize))

        }
    },
    clearEnemies() {
        this.enemies = this.enemies.filter(enemy => enemy.position.x >= 0)
    },


    reset() {
        this.background = new background(this.ctx, this.canvasSize)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)


    },

    drawAll() {
        this.background.drawAllBackground()
        this.heroe.drawHeroe()
        this.enemies.forEach(enemy => enemy.draw())




    },


    collisionWithEnemies() {
        this.enemies.forEach(enemy => {
            if (this.heroe.position.x < enemy.position.x + enemy.size.w &&
                this.heroe.position.x + this.heroe.size.w > enemy.position.x &&
                this.heroe.position.y < enemy.position.y + enemy.size.h &&
                this.heroe.size.h + this.heroe.position.y > enemy.position.y) {
                this.gameOver()

            }
        })
    },
    collisionWithSky() {
        if (this.heroe.position.x < this.background.skyPosition.x + this.background.skySize.w &&
            this.heroe.position.x + this.heroe.size.w > this.background.skyPosition.x &&
            this.heroe.position.y < this.background.skyPosition.y + this.background.skySize.h &&
            this.heroe.size.h + this.heroe.position.y > this.background.skyPosition.y) { this.gameOver() }
    },

    collisionWithFloor() {
        if (this.heroe.position.x < this.background.floorPosition.x + this.background.floorSize.w &&
            this.heroe.position.x + this.heroe.size.w > this.background.floorPosition.x &&
            this.heroe.position.y < this.background.floorPosition.y + this.background.floorSize.h &&
            this.heroe.size.h + this.heroe.position.y > this.background.floorPosition.y) { this.gameOver() }
    },

    collisionBulletsWithEnemies() {
        this.heroe.bullets.forEach(bullet => {
            this.enemies.forEach(enemy => {
                if (bullet.bulletsPos.x < enemy.position.x + enemy.size.w &&
                    bullet.bulletsPos.x + bullet.size.w > enemy.position.x &&
                    bullet.bulletsPos.y < enemy.position.y + enemy.size.h &&
                    bullet.size.h + bullet.bulletsPos.y > enemy.position.y) {
                    let bulletCollision = this.heroe.bullets.indexOf(bullet)
                    let enemyCollision = this.enemies.indexOf(enemy)
                    this.heroe.bullets.splice(bulletCollision, 1)
                    this.enemies.splice(enemyCollision, 1)
                    this.score++

                }
            })
        })
    },

    drawScore() {
        this.ctx.font = "50px serif"
        this.ctx.fillStyle = "white"
        this.ctx.fillText("Score: " + this.score, 200, 100)

        // setInterval(() => {
        //     this.score++
        // }, 0)

    },
    gameOver() {
        this.ctx.font = "100px serif"
        this.ctx.fillStyle = "white"
        this.ctx.fillText("¡GAME OVER!", this.canvasSize.w / 3, (this.canvasSize.h / 2) - 50)
        this.ctx.font = "100px serif"
        this.ctx.fillStyle = "white"
        this.ctx.fillText('SCORE: ' + this.score, (this.canvasSize.w / 3) + 100, (this.canvasSize.h / 2) + 50)

        clearInterval(this.interval)
        setTimeout(() => {
            location.reload()
        }
            , 1000)
    },


}




