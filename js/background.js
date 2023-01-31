class background {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize;

        this.floorSize = { w: window.innerWidth, h: 200 };
        this.floorPosition = { x: 0, y: window.innerHeight - 200 };
        this.skySize = { w: window.innerWidth, h: 200 };
        this.skyPosition = { x: 0, y: 0 };

    }
    drawFloor() {
        // this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.floorPosition.x, this.floorPosition.y, this.floorSize.w, this.floorSize.h)
    }
    drawSky() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.skyPosition.x, this.skyPosition.y, this.skySize.w, this.skySize.h)
    }
    drawAllBackground() {
        this.drawSky()
        this.drawFloor()
    }


}