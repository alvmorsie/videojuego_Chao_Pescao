class enemies {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize;

        this.enemies = {
            position: {
                x: undefined,
                y: undefined,
            },
            size: {
                w: undefined,
                h: undefined,
            },
        };
        this.generateEnemies();
    }
    generateEnemies() {
        this.enemies.size.w =
            Math.floor(Math.random() * (410 - 80 - 45) + 45);
        this.enemies.size.h =
            Math.floor(Math.random() * (40 - 15) + 15);
        this.enemies.position.x = Math.floor(
            Math.random() * (455 - this.enemies.size.w)
        );
        this.enemies.position.y = 10;
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(
            this.enemies.position.x,
            this.enemies.position.y,
            this.enemies.w,
            this.enemies.h
        );

    }

    drawEnemies() {
        this.enemies.position.x = 1000;
        this.enemies.position.y = 250;
        this.enemies.size.w = 50;
        this.enemies.size.h = 60;
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(
            this.enemies.position.x,
            this.enemies.position.y,
            this.enemies.size.w,
            this.enemies.size.h,
        );
    }
    moveEnemies() {
        this.enemies.position.y += 1;
        this.drawEnemies();
    }
}