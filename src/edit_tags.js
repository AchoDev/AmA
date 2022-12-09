
let pp = require("./popupmenu")
 tags = require("./tags")
add_click_listeners = require("./button_listeners")


fs = require("fs")

get_elem = (name) => document.getElementById(name)
const get_class = (name) => document.getElementsByClassName(name)

const edit_tags_button = get_elem("edit-tag-button")
const add_tags_button = get_elem("add-tag-button")
const add_page_button = get_elem("add-page-button")
const stop_edit_button = get_elem("stop-tag-button")

tag_buttons = get_class("tag-button-wrapper")



for(let button of tag_buttons) {

    button.children[2].addEventListener("mouseover", () => {
        button.children[2].style.transform = "scale(1.1)"
    })

    button.children[2].addEventListener("mouseleave", () => {
        button.children[2].style.transform = "scale(1.0)"
    })
}

tagRawData = () => {
    return fs.readFileSync(directory, 'utf-8', (err, data) => {
        if(err) {
            alert("an error occured\n\n" + err)
            return null;
        }
        return data
    })
}

let raw_tags = tagRawData()

const compare = (obj1, obj2) => JSON.stringify(obj1) == JSON.stringify(obj2)

function write() {
    fs.writeFile(path.resolve(__dirname, "../tags.json"), JSON.stringify(raw_tags, null, 4), (err) => {
        if (err) {
            alert("error\n\n" + err)
        }
    })
}

const search_tags = (id, fnc) => {
    try {
        raw_tags = JSON.parse(tagRawData())
        raw_tags.forEach((element, index, arr) => {
            if(compare(element.id, id)) {
                fnc(arr, index)
            }
        })
    } catch(e) {

    }
    
}

function append_to_tags(tag) {
    
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    delay(10).then(() => {
        raw_tags = JSON.parse(tagRawData())
        raw_tags.push(tag)
    
        write()
    })
}

function edit_tags(tag, new_name) {
    search_tags(tag, (arr, index) => {
        arr[index].name = new_name
    })
    write()
}

function remove_from_tags(tag) {
    search_tags(tag, (arr, index) => {
        arr.splice(index, 1)
    })
    write()
}

add_tags_button.addEventListener("click", () => {
    const random_id = (Math.random() + 1).toString(36).substring(7)
    append_to_tags({
        "id": random_id,
        "name": "Neue Kategorie",
        "type": "word"
    })

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    delay(15).then(() => {
        tags.create_all_buttons()
        stop_editing()
    })
})

add_page_button.addEventListener("click", () => {
    const random_id = (Math.random() + 1).toString(36).substring(7)
    append_to_tags({
        "id": random_id,
        "name": "Neue Seite",
        "type": "page"
    })

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    delay(15).then(() => {
        tags.create_all_buttons()
        stop_editing()
    })
})

edit_tags_button.addEventListener("click", etEvent)

let intervals = []

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function stop_editing() {

    console.log("bbq bacon burger")

    tags.create_selctors()

    intervals.forEach(element => {
        clearInterval(element)
    })

    add_click_listeners()

    edit_tags_button.style.display = "initial"
    stop_edit_button.style.display = "none"


    

    
    const set_button = (button) => {

        button.style.transition = "cubic-bezier(0.075, 0.82, 0.165, 1) .35s"
        button.style.transform = "scale(1) rotate(0)"
        
        
        button.querySelector("#edit-tag").style.opacity = "0"
        button.querySelector("#delete-tag").style.opacity = "0"
        
        delay(200).then(() => {
            button.querySelector("#edit-tag").style.display = "none"
            button.querySelector("#delete-tag").style.display = "none"
        }) 
        
        button.onmouseover =  () => {
            button.style.transition = "cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s"
            button.style.transform = "scale(1.1)"
        }    
        
        button.onmouseleave = () => {
            button.style.transform = "scale(1)"
        }
    }
    
    for(let button of tag_buttons) {
        set_button(button)
    }

    // for(let button of page_buttons) {
    //     set_button(button)
    // }
}

stop_edit_button.addEventListener("click", () => {
    stop_editing()
    delay(100).then(() => {
        tags.create_all_buttons()
        stop_editing()
    })
})

function etEvent() {
    intervals = []

    edit_tags_button.style.display = "none"
    stop_edit_button.style.display = "initial"

    for(let button of tag_buttons) {
        
        const cancel_button = button.querySelector("#edit-input-cancel")
        const save_button = button.querySelector("#edit-input-save")
       

        cancel_button.addEventListener("click", (event) => {
            turn_back()
        })

        save_button.addEventListener("click", (event) => {
            button.children[2].innerText = button.querySelector("#new-tag-name-input").value
            edit_tags(button.dataset.id, button.children[3].children[0].value)
            turn_back()
        })

        function delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }

        function turn_back() {
            button.style.transform = "rotate3d(0, 5, 0, 0deg) scale(0.9)"

            button.children[3].style.opacity = "0"
            button.children[3].style.visibility = "hidden"
            

            button.children[0].style.opacity = "1"
            button.children[1].style.opacity = "1"
            button.children[0].style.visibility = "visible"
            button.children[1].style.visibility = "visible"
            button.style.zIndex = "15"

            button.children[2].style.color = "rgba(0, 0, 0, 255)"

            
              
            delay(500).then(() => wiggle_button(button))
        }

        button.querySelector("#edit-tag").addEventListener("click", (event) => {

            clearInterval(interval)
            button.style.transform = "rotate(0)"

            button.style.zIndex = "20"
            
            button.style.transition = "cubic-bezier(.31,.72,.26,1.15) .7s"

            button.querySelector("#new-tag-name-input").value = button.children[2].innerText
            button.children[2].style.transitionDelay = ".10s"
            button.children[2].style.color = "rgba(0, 0, 0, 0)"


            button.children[3].style.opacity = "1"
            button.children[3].style.visibility = "visible"
            

            button.children[0].style.opacity = "0"
            button.children[1].style.opacity = "0"
            button.children[0].style.visibility = "hidden"
            button.children[1].style.visibility = "hidden"
            

            button.style.transform = "rotate3d(0, 5, 0, 180deg) scale(1.6) perspective(20em)"
        })

        function delete_tag_event() {
            pp.popup_question("alle wörter löschen??", ["ja", "ne", "abbrechen"], [
                () => {
                    remove_button()
                },
                () => {
                    remove_button()
                },
                () => {}])
            
            function remove_button() {

                remove_from_tags(button.dataset.id)

                const duration = "1000"
                
                const style_element = (element) => {
                    element.style.transition = `ease-out ${duration / 1000}s`
                    element.style.background = "#ff3f3f"
                    element.style.border = "None"
                    element.style.filter = "blur(30px)"
                    element.style.borderRadius = "105px"
                    element.style.transform = "rotate(0deg) scale(2.5)"
                    element.style.opacity = "0"
                }
    
                style_element(button)
                
                for(let element of button.getElementsByTagName("*")) {
                    style_element(element)
                }
    
                delay(duration - 100).then(() => button.remove())
            }
        }


        button.querySelector("#delete-tag").addEventListener("click", delete_tag_event)

        const childClone = button.children[2].cloneNode(true)
        button.replaceChild(childClone, button.children[2]);

        button.onmouseleave = null
        button.onmouseover = null

        const edit_tag_mode_buttons = get_class("edit-tag-mode-button")

        for(let btn of edit_tag_mode_buttons) {
            btn.style.display = "flex"
            btn.style.opacity = "0.7"
        }

        let interval;
        wiggle_button(button)

        function wiggle_button(btn) {
            const random_id = (Math.random() + 1).toString(36).substring(7)
            btn.id = random_id

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

            idButton.style.transition = "cubic-bezier(0.075, 0.82, 0.165, 1) .7s"
            idButton.style.transform = `scale(${smallerScale})`

            interval = setInterval(rotate, random([80, 110])) // Math.floor(Math.random) * (100 - 70) + 70)
            
            intervals.push(interval)

            function rotate() {
                if(deg == degAmount) {
                    deg = -degAmount
                } else {
                    deg = degAmount
                }

                idButton.style.transform = `scale(${smallerScale}) rotate(${deg}deg) perspective(20em)`
            }
        }
    }
}