class background {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize;

        this.floorSize = { w: window.innerWidth, h: 100 };
        this.floorPosition = { x: 0, y: window.innerHeight - 100 };
        this.skySize = { w: window.innerWidth, h: 100 };
        this.skyPosition = { x: 0, y: 0 };
        this.oceanInstance = new Image();
        this.oceanInstance.src = './img/ocean.jpg';
        this.oceanPosition = { x: 0, y: 0 };
        this.oceanSize = { w: window.innerWidth, h: window.innerHeight };

    }
    drawFloor() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.floorPosition.x, this.floorPosition.y, this.floorSize.w, this.floorSize.h)
    }
    drawSky() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.skyPosition.x, this.skyPosition.y, this.skySize.w, this.skySize.h)
    }
    drawAllBackground() {
        this.drawBackground()
        this.drawSky()
        this.drawFloor()

    }
    drawBackground() {
        this.ctx.drawImage(this.oceanInstance, this.oceanPosition.x, this.oceanPosition.y, this.oceanSize.w, this.oceanSize.h)
    }




}