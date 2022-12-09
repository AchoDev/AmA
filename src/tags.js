



const load_page = require("./pages");
const { change_current_page } = require("./page_selector");
const update = require("./update")
const alphabet = ["All", "A","B","C", "Ch","D","E","F","G","H","I","J","K","L","LL","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

get_elem = (name) => document.getElementById(name)


const tag_container = get_elem("letter-container");
const letter_button = get_elem("char-button-template");

const tag_select_button = get_elem("tag-selector-button")
const tag_select_menu = get_elem("tag-selector-background")

const tag_button_template = get_elem("tag-button-template")
const page_button_container = get_elem("page-container")

const tag_option_template = get_elem("tag-option-template")


fs = require("fs");

path = require("path")

const directory = path.resolve(__dirname, "../tags.json")

let tagRawData = () => {
    return fs.readFileSync(directory, 'utf-8', (err, data) => {
        if(err) {
            alert("an error occured\n\n" + err)
            return null;
        }
        return data
    })
}

let tags = []
pages = []



function create_button(text, value, id, cls=null) {

    const btnClone = tag_button_template.content.cloneNode(true)

    const btn = btnClone.querySelectorAll("button")[2]
    
    btn.value = value
    btn.innerText = text
    
    if(cls) {
        btn.classList.remove("tag-button")
        btn.classList.add(cls)
    }
    
    btnClone.children[0].dataset.id = id

    return btnClone
}

create_all_buttons()

function create_selctors() {
    const optContainer = get_elem("tag-selector")
    removeAllChildNodes(optContainer)

    for(element of tags) {

        const optClone = tag_option_template.content.cloneNode(true)
        const option = optClone.querySelector("option")

        let name = element.name
        let value = element.name
        
        option.value = value
        option.innerText = name
        option.dataset.id = element.id
    
        if(name == "any") {
            name = "Alle"
        }
    
        optContainer.appendChild(optClone)    
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function create_all_buttons() {

    tags = []
    pages = []

    const rawData = JSON.parse(tagRawData())
    
    for(let element of rawData) {
        if (element.type == "word") {tags.push(element)}
        else {pages.push(element)}
    }

    const tag_cont = get_elem("tag-container")

    removeAllChildNodes(tag_cont)
    removeAllChildNodes(page_button_container)

    tag_cont.appendChild(tag_button_template)

    create_selctors()

    for(element of tags) {
        let name = element.name
        let value = element.name
    
        if(name == "any") {
            name = "Alle"
        }
        
        const btn = create_button(name, value, element.id)
          
        tag_button_template.parentNode.appendChild(btn)    
    }
    
    for(let page of pages) {
        
        btn = create_button(page.name, page.name, page.id, "select-page-button")
    
        page_button_container.appendChild(btn)
    }
    
    // const dirPage = create_button("program data", "sv", 11111, "select-page-button")
    
    // page_button_container.appendChild(dirPage)
}



if(tag_container.children.length == 1) {

    alphabet.forEach(letter => {
    
        const clone = letter_button.content.cloneNode(true)
        const button = clone.querySelector("button")
        
        let isPressed = false
        
        if(letter != "All") {
            button.textContent = `${letter} ${letter.toLowerCase()}`
        } else {
            button.textContent = "All"
            isPressed = true
    
            button.style.zIndex = "14";
            button.style.transform = "translateY(1px)"
            button.style.borderBottom = "None"
            button.style.background = "orange"
            button.style.color = "white"
    
    
            button.style.width = "95px";
            button.style.height = "55px";
        }
        
    
        let mofunc = () => {if(!isPressed){button.style.transform = "translateY(-1px)"}}
        let mlfunc = () => {if(!isPressed) {button.style.transform = "translateY(5px)"}}
    
    
        // const event = new Event("notPressed", {bubbles: true}) 
        
        // button.dispatchElement(event)
        // button.addEventListener("notPressed", (e) => {
        //     alert("event trigger")
        // })
    
    
    
        button.addEventListener("mouseover", mofunc)
        button.addEventListener("mouseleave", mlfunc)
        
        button.addEventListener("click", () => {
    
            change_current_page(0)
    
            if(letter != "All") {
                dict.change_selected_letter(letter)
            } else {
                dict.change_selected_letter("any")
            }
            dict.update_dict()
            load_dict.update_page()
    
            isPressed = true;
    
            for (let element of tag_container.children) {
                element.style.borderBottom = "2px solid black"
                element.style.zIndex = "5";
                element.style.transform = "translateY(5px)"
                
                if (element.innerText != "All") {
                    
                    element.style.background = "#fcfcfc";
                    element.style.color = "black"
                }
            }
    
            button.style.zIndex = "14";
            button.style.transform = "translateY(1px)"
            button.style.borderBottom = "None"
            
            if (button.innerText == "All") {
                button.style.background = "orange";
            } else {
                button.style.background = "orange"
            }
    
            button.style.color = "white"
    
        })
        tag_container.appendChild(clone)
    });
}

function close_menu() {
    s = tag_select_menu.children[0].style
    sb = tag_select_menu.style

    sb.opacity = "0"
    sb.visibility = "hidden"
    s.transform = "scale(0.7)"
}

tag_select_menu.addEventListener("click", (event) => {
    if (event.srcElement == tag_select_menu) {
        close_menu()
    }
})

tag_select_button.addEventListener("click", () => {
    s = tag_select_menu.children[0].style
    sb = tag_select_menu.style
    
    sb.opacity = "1"
    sb.visibility = "visible"
    s.transform = "scale(1)"
})

const selected_tag_indicator = get_elem("selected-tag-indicator")

module.exports = { create_all_buttons, create_selctors }