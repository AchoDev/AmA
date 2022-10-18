const alphabet = ["A","B","C", "Ch","D","E","F","G","H","I","J","K","L","LL","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const get_elem = (name) => document.getElementById(name)

tag_container = get_elem("tag-container");
letter_button = get_elem("char-button-template");

tag_button = get_elem("tag-selector-button")
tag_select_menu = get_elem("tag-selector-background")

select_button = get_elem("select-tag-button")

alphabet.forEach(letter => {
    const clone = letter_button.content.cloneNode(true)
    const button = clone.querySelector("button")
    button.textContent = `${letter} ${letter.toLowerCase()}`
    button.addEventListener("click", () => {
        dict.change_selected_letter(letter)
        dict.update_dict()
        load_dict.update_page()

        for (element of tag_container.children) {
            element.style.borderBottom = "2px solid black"
        }
        button.style.borderBottom = "None"
    })
    tag_container.appendChild(clone)

});

tag_button.addEventListener("click", () => {
    tag_select_menu.style.display = "flex"
})

select_button.addEventListener("click", () => {
    tag_select_menu.style.display = "None"
})