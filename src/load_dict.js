dict = require("./dict")
// const update = require("./update")
const fs = require("fs")

let get_elem = (name) => document.getElementById(name)

const word_container_template = document.getElementById("word-container-template")
const clone_container = get_elem("word-clone-wrapper")
const page_counter = get_elem("page-index")

let current_page = 0
const max_page_length = 40

const right_page_button = get_elem("right-page-button")
const left_page_button = get_elem("left-page-button")

right_page_button.addEventListener("click", () => {
    current_page += 1
    update_page()
})
left_page_button.addEventListener("click", () => {
    current_page -= 1
    update_page()
})

const set_dict_list = (dc) => {
    let current_item = 0
    let temp_list = []

    let jdjdjd = 0

    while(current_item <= dc.length) {

        let nested_list = []
        for(let i = 0; i < max_page_length; i++) {
            
            if (current_item >= dc.length) {
                temp_list.push(nested_list)
                return temp_list
            }
            nested_list.push(dc[current_item])

            current_item += 1
        }

        temp_list.push(nested_list)
    }
    return temp_list
}



function update_page() {
    listed_dict = set_dict_list(dict.get_dictionary())

    page_counter.textContent = `Seite ${current_page + 1}/${listed_dict.length}`
    clone_container.replaceChildren()
    listed_dict[current_page].forEach(word => {

        const clone = word_container_template.content.cloneNode(true)
    
        const single_word = clone.querySelector("div").children[0]
        const translation = clone.querySelector("div").children[2].children
    
        single_word.textContent = word.sp
        translation[0].textContent = word.de
        translation[1].textContent = word.ar
    
        clone_container.appendChild(clone)
    });
}

update_page()

module.exports = {update_page}
