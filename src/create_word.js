

const dictionary = require("./dict")
const load_dict = require("./load_dict")

// check_null = (list) => {
//     return false
    
//     for (element of list) {
//         if (element == '') {
//             alert("write smt")
//             console.log(list)
//             return true
//         }
//     }
    
//     return false
// }

new_word_button = get_elem("add-button")
bottom_container = get_elem("new-word-container")
add_button = get_elem("add-button")
new_word_container = get_elem("new-word-container")

save_button = get_elem("save-word-button")

opened = false

move_container = () => {
    x = opened  ? "150px" : "0px" 
    txt = opened ? "+" : "X"
    bottom_container.style.transform = "translateY(" + x + ")"
    add_button.textContent = txt
    opened = !opened
};

new_word_button.addEventListener("click", move_container) 

save_button.addEventListener("click", () => {
    const values = Array.from(new_word_container.children)
    const check_null = (value) => value ? value : ""


    dict.append_to_dict({
        "sp": check_null(values[0].value),
        "de": check_null(values[1].value),
        "ar": check_null(values[2].value)
    })

    console.log(values)

    values[0].value = null
    values[1].value = null
    values[2].value = null

    

    move_container()
    dictionary.update_dict()
    load_dict.update_page()
    
})

module.exports = move_container