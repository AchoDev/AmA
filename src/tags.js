



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

// page_buttons = document.getElementsByClassName("select-page-button")

tags = []
pages = []

for(let element of JSON.parse(tagRawData())) {
    if (element.type == "word") {tags.push(element)}
    else {pages.push(element)}
}

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


for(element of tags) {
    const optClone = tag_option_template.content.cloneNode(true)
    const option = optClone.querySelector("option")

    let name = element.name
    let value = element.name
    
    option.value = value
    option.innerText = name

    if(name == "any") {
        name = "Alle"
    }
    
    const btn = create_button(name, value, element.id)
   
    
    tag_button_template.parentNode.appendChild(btn)


    tag_option_template.parentNode.appendChild(optClone)
    
}

for(let page of pages) {
    
    btn = create_button(page.name, page.name, page.id, "select-page-button")

    page_button_container.appendChild(btn)
}

const dirPage = create_button("program data", "sv", 11111, "select-page-button")

page_button_container.appendChild(dirPage)



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
            button.style.background = "blue"
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
                button.style.background = "blue";
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

function add_click_listeners() {
    const tag_buttons = document.getElementsByClassName("tag-button")
    for(let elem of tag_buttons) {

        elem.addEventListener("click", () => {
            
            dc.style.borderTopRightRadius = "0px"
            dc.style.borderTopLeftRadius = "0px"
            dc.style.marginTop = "0px"
    
            close_menu()
            load_page.deload_page()
            
            dict.change_selected_tag(elem.value)
            update.update()
    
            if(elem.value != "any") {
                selected_tag_indicator.style.display = "inherit"
                selected_tag_indicator.innerText = `Kategorie: ${elem.value}`
            } else {
                selected_tag_indicator.style.display = "none"
            }
    
            document.getElementById("tag-selector").value = elem.value
        })

        
    }
    
    const dc = get_elem("dictionary")
    
    // for(let btn of page_buttons) {
        
    //     btn.addEventListener("click", () => {
    //         close_menu()
                
    //         if(btn.value == "sv") {
    //             load_page.load_directory()
    //             return
    //         }
            
            
    //         load_page.load_page(btn.value)

    //         dc.style.borderTopRightRadius = "10px"
    //         dc.style.borderTopLeftRadius = "10px"
    //         dc.style.marginTop = "30px"

    //     })
         
    // }

}

add_click_listeners()

module.exports = add_click_listeners
