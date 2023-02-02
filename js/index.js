window.onload = () => {
    // musicIntro = new Audio('./sound/intro.mp3')


    document.querySelector('.start-button').onclick = () => {
        document.querySelector(".start-button").style.display = "none"
        document.querySelector("#MyGame").style.display = "block"
        // musicIntro.play()
        gameApp.init()
    }

}


// const audioCtx = new AudioContext();
// const gainNode = audioCtx.createGain();
// gainNode.gain.value = 0.4;
