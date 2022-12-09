

const dictionary = require("./dict")
const load_dict = require("./load_dict")

get_elem = (name) => document.getElementById(name)

new_word_button = get_elem("add-button")
bottom_container = get_elem("new-word-container")
add_button = get_elem("add-button")
new_word_container = get_elem("input-container")

save_button = get_elem("save-word-button")

opened = false

move_container = () => {
    const x = opened  ? "150px" : "0px" 
    const deg = opened ? "0" : "45"
    bottom_container.style.transform = "translateY(" + x + ")"

    add_button.querySelector("p").style.transform = `rotate(${deg}deg)`

    opened = !opened
};

new_word_button.addEventListener("click", move_container) 

save_button.addEventListener("click", () => {

    const values = Array.from(new_word_container.children)
    const check_null = (value) => value ? value : ""
    e = get_elem("tag-selector")

    dict.append_to_dict({
        "sp": check_null(values[0].value),
        "de": check_null(values[1].value),
        "ar": check_null(values[2].value),
        "tag": check_null(e.options[e.selectedIndex].dataset.id)
    })

    console.log(e.options[e.selectedIndex].dataset.id)

    values[0].value = null
    values[1].value = null
    values[2].value = null

    move_container()
    dictionary.update_dict()
    load_dict.update_page()
    
})

module.exports = move_container