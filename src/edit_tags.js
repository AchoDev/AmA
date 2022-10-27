const { initialize } = require("@electron/remote/main")
const { autoUpdater } = require("electron")



get_elem = (name) => document.getElementById(name)
const get_class = (name) => document.getElementsByClassName(name)

edit_tags_button = get_elem("edit-tag-button")
tag_buttons = get_class("tag-button-wrapper")
selector_container = get_elem("tag-selector-container")


for(let button of tag_buttons) {
    
    button.children[2].addEventListener("mouseover", () => {
        button.children[2].style.transform = "scale(1.1)"
    })

    button.children[2].addEventListener("mouseleave", () => {
        button.children[2].style.transform = "scale(1.0)"
    })

}



edit_tags_button.addEventListener("click", () => {

    // selector_container.style.overflow = "visible"s

    for(let button of tag_buttons) {
        

        button.querySelector("#edit-tag").addEventListener("click", (event) => {
            clearInterval(interval)
            button.style.transform = "rotate(0)"

            button.style.zIndex = "20"

            // button.style.position = "absolute"
            
            button.style.transition = "ease-in .5s"

            
            button.style.transform = "rotate3d(0, 1, 0, 90deg) scale(1.3) translateX(-50%) perspective(75em)"
            
            button.style.transition = "ease-out .5s"

            console.log(button.children)

            button.children[2].style.transitionDelay = ".15s"
            button.children[2].style.color = "rgba(0, 0, 0, 0)"


            button.children[3].style.opacity = "1"
            button.children[3].style.visibility = "visible"
            

            button.children[0].style.opacity = "0"
            button.children[1].style.opacity = "0"
            button.children[0].style.visibility = "hidden"
            button.children[1].style.visibility = "hidden"
            

            button.style.transform = "rotate3d(0, 5, 0, 180deg) scale(1.6) perspective(75em)"
        })

        const childClone = button.children[2].cloneNode(true)
        button.replaceChild(childClone, button.children[2]);

        const edit_tag_mode_buttons = get_class("edit-tag-mode-button")

        for(let btn of edit_tag_mode_buttons) {
            btn.style.display = "flex"
        }

        const random_id = (Math.random() + 1).toString(36).substring(7)
        button.id = random_id

        const random = (tuple) => {
            return Math.floor(Math.random() * (tuple[1] - tuple[0])) + tuple[0] 
        }
        
        let degAmount = 3

        const deviation = 5
        const deviationTuple = [-deviation, deviation]
        

        degAmount = degAmount + random(deviationTuple) / 10
        
        let deg = degAmount


        const idButton = document.getElementById(random_id)

        const smallerScale = 0.9

        idButton.style.transition = "cubic-bezier(0.075, 0.82, 0.165, 1) .5s"
        idButton.style.transform = `scale(${smallerScale})`

        const interval = setInterval(rotate, random([80, 110]))// Math.floor(Math.random) * (100 - 70) + 70)
        
        function rotate() {
            if(deg == degAmount) {
                deg = -degAmount
            } else {
                deg = degAmount
            }

            idButton.style.transform = `scale(${smallerScale}) rotate(${deg}deg)`
        }
    }
})