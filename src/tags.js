

const load_page = require("./pages")
const update = require("./update")
const alphabet = ["A","B","C", "Ch","D","E","F","G","H","I","J","K","L","LL","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

get_elem = (name) => document.getElementById(name)


tag_container = get_elem("letter-container");
letter_button = get_elem("char-button-template");

tag_select_button = get_elem("tag-selector-button")
tag_select_menu = get_elem("tag-selector-background")

tag_button_template = get_elem("tag-button-template")
page_button_template = get_elem("select-page-button-template")

tag_option_template = get_elem("tag-option-template")

fs = require("fs");

const path = "tags.json"

const tagRawData = () => {
    return fs.readFileSync(path, 'utf-8', (err, data) => {
        if(err) {
            alert("an error occured\n\n" + err)
            return null;
        }
        return data
    })
}

tag_buttons = document.getElementsByClassName("tag-button")
page_buttons = document.getElementsByClassName("select-page-button")

tags = []
pages = []

for(let element of JSON.parse(tagRawData())) {
    if (element.type == "word") {tags.push(element)}
    else {pages.push(element)}
}

for(element of tags) {

    let name = element.name
    let value = element.name
    
    if(name == "any") {
        name = "Alle"
    }

    const btnClone = tag_button_template.content.cloneNode(true)
    const btn = btnClone.querySelector("button")
    
    const optClone = tag_option_template.content.cloneNode(true)
    const option = optClone.querySelector("option")
    
    btn.value = value
    btn.innerText = name
    
    option.value = value
    option.innerText = name
    
    tag_button_template.parentNode.appendChild(btnClone)


    tag_option_template.parentNode.appendChild(optClone)
    
}

for(let page of pages) {
    const clone = page_button_template.content.cloneNode(true)
    const btn = clone.querySelector("button")

    btn.innerText = page.name
    btn.value = page.name

    page_button_template.parentNode.appendChild(clone)
}

alphabet.forEach(letter => {
    const clone = letter_button.content.cloneNode(true)
    const button = clone.querySelector("button")
    button.textContent = `${letter} ${letter.toLowerCase()}`
    
    let isPressed = false

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
        dict.change_selected_letter(letter)
        dict.update_dict()
        load_dict.update_page()

        isPressed = true;

        for (let element of tag_container.children) {
            element.style.borderBottom = "2px solid black"
            element.style.zIndex = "5";
            element.style.transform = "translateY(5px)"
        }

        button.style.zIndex = "15";
        button.style.transform = "translateY(1px)"
        button.style.borderBottom = "None"
    })
    tag_container.appendChild(clone)
});

function close_menu() {
    s = tag_select_menu.children[0].style
    sb = tag_select_menu.style

    sb.opacity = "0"
    sb.visibility = "hidden"
    s.transform = "scale(0.7)"
}

tag_select_menu.addEventListener("click", close_menu)

tag_select_button.addEventListener("click", () => {
    s = tag_select_menu.children[0].style
    sb = tag_select_menu.style
    
    sb.opacity = "1"
    sb.visibility = "visible"
    s.transform = "scale(1)"
})

for(let elem of tag_buttons) {
    elem.addEventListener("click", () => {
        
        close_menu()

        dict.change_selected_tag(elem.value)
        update.update()
        
    })
}

 for(let btn of page_buttons) {
    btn.addEventListener("click", () => {
        load_page.load_page()
    })
 }

