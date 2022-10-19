const { get_elem } = require("./update");

word_clone_container = get_elem("word-clone-wrapper")
lang_name_container = get_elem("lang-name-container")
textarea = get_elem("page-text-area")
add_button = get_elem("add-button")
letter_container = get_elem("letter-container")
headline = get_elem("page-headline")


function load_page(page) {
    word_clone_container.replaceChildren()
    lang_name_container.style.display = "None"
    add_button.style.display = "None"
    textarea.style.display = "initial"

    letter_container.style.display = "None"
    headline.style.display = "block"
}

module.exports = {load_page}