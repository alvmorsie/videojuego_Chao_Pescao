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
    lives: 3,
    interval: undefined,
    coolDown: 100,
    octopuses: [],
    musicLive: new Audio('./sound/dead.mp3'),
    musicIntro: new Audio('./sound/intro.mp3'),
    musicGameOver: new Audio('./sound/gameover.mp3'),



    init() {
        this.musicIntro.play()
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
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            if (this.framesCounter % this.coolDown === 0) this.heroe.canShoot = true
            this.clearAll()
            this.drawAll()
            this.heroe.moveHeroe()
            this.octopuses.forEach(octopus => octopus.move())
            this.enemies.forEach(enemy => enemy.move())
            this.heroe.setEventListeners()
            if (this.heroe.canMoveUp) { this.heroe.position.y -= 10 }
            if (this.heroe.canMoveRight) { this.heroe.position.x += 10 }
            if (this.heroe.canMoveLeft) { this.heroe.position.x -= 10 }
            this.generateEnemies()
            this.clearEnemies()
            this.collisionWithEnemies()
            this.collisionWithSky()
            this.collisionWithFloor()
            this.collisionBulletsWithEnemies()
            this.drawScore()
            this.drawlives()
            this.generateOctopuses()
            this.collisionWithOctopuses()
            this.collisionBulletsWithOctopuses()
            if (this.lives === 0) { this.gameOver() }
        }, 10)
    },
    createHeroe() {
        this.heroe = new Heroe(this.ctx, this.canvasSize)
    },
    generateEnemies() {
        if (this.framesCounter % 50 === 0) {
            this.enemies.push(new Enemy(this.ctx, this.canvasSize))
        }
    },
    generateOctopuses() {
        if (this.framesCounter % 300 === 0) {
            this.octopuses.push(new Octopus(this.ctx, this.canvasSize))
        }
    },
    clearEnemies() {
        this.enemies = this.enemies.filter(Enemy => Enemy.position.x >= 0)
    },
    reset() {
        this.background = new Background(this.ctx, this.canvasSize)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawAll() {
        this.background.drawAllBackground()
        this.heroe.drawHeroe()
        this.enemies.forEach(enemy => enemy.draw())
        this.octopuses.forEach(octopus => octopus.draw())
    },
    collisionWithEnemies() {
        this.enemies.forEach(enemy => {
            if (this.heroe.position.x < enemy.position.x + enemy.size.w &&
                this.heroe.position.x + this.heroe.size.w > enemy.position.x &&
                this.heroe.position.y < enemy.position.y + enemy.size.h &&
                this.heroe.size.h + this.heroe.position.y > enemy.position.y) {
                this.lives--
                this.musicLive.play()
                let enemyCollision = this.enemies.indexOf(enemy)
                this.enemies.splice(enemyCollision, 1)

            }
        })
    },
    collisionWithOctopuses() {
        this.octopuses.forEach(octopus => {
            if (this.heroe.position.x < octopus.position.x + octopus.size.w &&
                this.heroe.position.x + this.heroe.size.w > octopus.position.x &&
                this.heroe.position.y < octopus.position.y + octopus.size.h &&
                this.heroe.size.h + this.heroe.position.y > octopus.position.y) {
                this.lives--
                this.musicLive.play()
                let octopusCollision = this.octopuses.indexOf(octopus)
                this.octopuses.splice(octopusCollision, 1)
            }
        })
    },
    collisionWithSky() {
        if (this.heroe.position.x < this.background.skyPosition.x + this.background.skySize.w &&
            this.heroe.position.x + this.heroe.size.w > this.background.skyPosition.x &&
            this.heroe.position.y < this.background.skyPosition.y + this.background.skySize.h &&
            this.heroe.size.h + this.heroe.position.y > this.background.skyPosition.y) {
            this.gameOver()
        }
    },
    collisionWithFloor() {
        if (this.heroe.position.x < this.background.floorPosition.x + this.background.floorSize.w &&
            this.heroe.position.x + this.heroe.size.w > this.background.floorPosition.x &&
            this.heroe.position.y < this.background.floorPosition.y + this.background.floorSize.h &&
            this.heroe.size.h + this.heroe.position.y > this.background.floorPosition.y) {
            this.gameOver()
        }
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
                    if (this.score % 20 === 0) {
                        this.lives++
                    }
                }
            })
        })
    },
    collisionBulletsWithOctopuses() {
        this.heroe.bullets.forEach(bullet => {
            this.octopuses.forEach(octopus => {
                if (bullet.bulletsPos.x < octopus.position.x + octopus.size.w &&
                    bullet.bulletsPos.x + bullet.size.w > octopus.position.x &&
                    bullet.bulletsPos.y < octopus.position.y + octopus.size.h &&
                    bullet.size.h + bullet.bulletsPos.y > octopus.position.y) {
                    let bulletCollision = this.heroe.bullets.indexOf(bullet)
                    this.heroe.bullets.splice(bulletCollision, 1)

                }
            })
        })
    },
    drawScore() {
        this.ctx.font = "50px serif"
        this.ctx.fillStyle = "white"
        this.ctx.fillText("Score: " + this.score, 200, 90)
    },
    drawlives() {
        this.ctx.font = "50px serif"
        this.ctx.fillStyle = "white"
        this.ctx.fillText("Lives: " + this.lives, 200, 50)
    },
    gameOver() {
        this.ctx.font = "100px serif"
        this.ctx.fillStyle = "white"
        this.ctx.fillText("¡GAME OVER!", this.canvasSize.w / 3, (this.canvasSize.h / 2) - 50)
        this.ctx.font = "100px serif"
        this.ctx.fillStyle = "white"
        this.ctx.fillText('SCORE: ' + this.score, (this.canvasSize.w / 3) + 100, (this.canvasSize.h / 2) + 40)
        this.musicIntro.pause()
        this.musicGameOver.play()
        clearInterval(this.interval)
        setTimeout(() => {
            location.reload()
        }
            , 5000)
    },
}




