window.onload = () => {
    musicIntro = new Audio('./sound/bso.mp3')

    document.querySelector('.start-button').onclick = () => {
        document.querySelector(".start-button").style.display = "none"
        document.querySelector("#MyGame").style.display = "block"
        musicIntro.play()

        gameApp.init()
    }

}


