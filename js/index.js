window.onload = () => {

    document.querySelector('.start-button').onclick = () => {
        document.querySelector(".start-button").style.display = "none"
        document.querySelector("#MyGame").style.display = "block"
        gameApp.init()
    }

}
