dict = require("./dict")


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
    listed_dict[current_page].forEach((word, index, arr) => {

        const clone = word_container_template.content.cloneNode(true)
    
        const single_word = clone.querySelector("div").children[0]
        const translation = clone.querySelector("div").children[3].children
    
        single_word.textContent = word.sp
        translation[0].textContent = word.de
        translation[1].textContent = word.ar
        
        const edit_mode_items = clone.querySelectorAll(".edit-mode")

        edit_button = clone.getElementById("edit-button")

        edit_button.addEventListener("click", () => {
            for(element of edit_mode_items) {
                element.style.display = "inherit"
            }

            edit_mode_items[0].querySelector("input").value = single_word.innerText

            editTr = edit_mode_items[1].querySelectorAll("input")
            editTr[0].value = translation[0].innerText
            editTr[1].value = translation[1].innerText

            single_word.style.display = "None"

            translation[0].parentNode.style.display = "None"
        })

        const leave_edit_mode = () => {
            single_word.style.display = "inherit"
            for(element of edit_mode_items) {
                element.style.display = "None"
            }
            translation[0].parentNode.style.display = "inherit"
            edit_button.style.display = "inherit"
        }

        clone.getElementById("revert-changes-button").addEventListener("click", () => {
            leave_edit_mode()
        });

        clone.getElementById("save-changes-button").addEventListener("click", () => {
            editTr = edit_mode_items[1].querySelectorAll("input")
            dict.edit_dict(
                word, {"sp": edit_mode_items[0].querySelector("input").value, "de": editTr[0].value, "ar": editTr[1].value}
            )

            word = {"sp": edit_mode_items[0].querySelector("input").value, "de": editTr[0].value, "ar": editTr[1].value}

            single_word.textContent = edit_mode_items[0].querySelector("input").value
            translation[0].textContent = editTr[0].value
            translation[1].textContent = editTr[1].value
            leave_edit_mode()
        })

        clone_container.appendChild(clone)
    });
}

update_page()

module.exports = {update_page}
