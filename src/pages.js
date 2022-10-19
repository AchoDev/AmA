const { get_elem } = require("./update");

const word_clone_container = get_elem("word-clone-wrapper")
const lang_name_container = get_elem("lang-name-container")
const textarea = get_elem("page-text-area")
const add_button = get_elem("add-button")
const letter_container = get_elem("letter-container")
const headline = get_elem("page-headline")
const save_changes_button = get_elem("save-page-button")

const page_buttons = document.getElementsByClassName("page-button")

let selected_page

const rawPageData = () => {
    return fs.readFileSync('pages.json', 'utf-8', (err, data) => {
        if(err) {
            alert("an error occured\n\n" + err)
            return null;
        }
        return data
    })
}

function writePages(obj) {
    fs.writeFile("pages.json", JSON.stringify(obj, null, 4), (err) => {
        if (err) {
            alert("error\n\n" + err)
        }
    })
}

const findPage = (target) => {
    for(let page of JSON.parse(rawPageData())) {
        if(page.name == target) {
            return page
        }
    }
    return null
}

const editPage = (target, content) => {
    allPages = JSON.parse(rawPageData())
    for(let page of allPages) {
        if(page.name == target) {
            page.content = content
            writePages(allPages)
        }
    }
}

save_changes_button.addEventListener("click", () => {
    editPage(selected_page, textarea.value)
    console.log(textarea.value)
})

const create_new_page = (name, content) => {
    raw = JSON.parse(rawPageData())
    raw.push({"name": name, "content": content})
    writePages(raw)
}

function deload_page() {
    for(button of page_buttons) {
        button.style.display = "initial"
    }

    
    lang_name_container.style.display = "flex"
    add_button.style.display = "initial"
    textarea.style.display = "None"
    save_changes_button.style.display = "None"

    letter_container.style.display = "flex"
    headline.style.display = "None"
}

function load_page(page) {

    textarea.value = ""

    for(button of page_buttons) {
        button.style.display = "None"
    }

    word_clone_container.replaceChildren()
    lang_name_container.style.display = "None"
    add_button.style.display = "None"
    textarea.style.display = "initial"
    save_changes_button.style.display = "initial"

    letter_container.style.display = "None"
    headline.style.display = "block"
    headline.innerText = page


    const pageObj = findPage(page)

    if(pageObj){
        textarea.value = pageObj.content
    } else {
        create_new_page(page, textarea.value)
    }


    selected_page = page
}

module.exports = {load_page, deload_page}