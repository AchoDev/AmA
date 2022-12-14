const { get_elem } = require("./update");

const word_clone_container = get_elem("word-clone-wrapper")
const lang_name_container = get_elem("lang-name-container")
const textarea = get_elem("page-text-area")
const add_button = get_elem("add-button")
const letter_container = get_elem("letter-container")
const headline = get_elem("page-headline")
const save_changes_button = get_elem("save-page-button")

const page_buttons = document.getElementsByClassName("page-button")

path = require("path")

let selected_page

const rawPageData = () => {
    return fs.readFileSync(path.resolve(__dirname, '../pages.json'), 'utf-8', (err, data) => {
        if(err) {
            alert("an error occured\n\n" + err)
            return null;
        }
        return data
    })
}

function writePages(obj) {
    fs.writeFile(path.resolve(__dirname, "../pages.json"), JSON.stringify(obj, null, 4), (err) => {
        if (err) {
            alert("error\n\n" + err)
        }
    })
}

const findPage = (target) => {
    for(let page of JSON.parse(rawPageData())) {
        if(page.id == target) {
            return page
        }
    }
    return null
}



const editPage = (id, content) => {
    allPages = JSON.parse(rawPageData())
    for(let page of allPages) {
        if(page.id == id) {
            page.content = content
            writePages(allPages)
        }
    }
}

save_changes_button.addEventListener("click", () => {
    editPage(selected_page, textarea.value)
})

const create_new_page = (name, content, id) => {
    raw = JSON.parse(rawPageData())
    raw.push({"content": content, "id": id})
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

function load_directory() {
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
    headline.innerText = "directory.json"


    const pageObj = rawPageData()

    textarea.value = pageObj

    selected_page = "directory"
}

function load_page(name, id) {

    textarea.value = ""

    for(button of page_buttons) {
        button.style.display = "None"
    }

    word_clone_container.replaceChildren()
    lang_name_container.style.display = "None"
    add_button.style.display = "None"
    textarea.style.display = "initial"
    save_changes_button.style.display = "initial"
    
    
    const pageObj = findPage(id)
    
    console.log(pageObj)

    letter_container.style.display = "None"
    headline.style.display = "block"
    
    headline.innerText = name
    
    if(pageObj){
        textarea.value = pageObj.content
    } else {
        create_new_page(name, "", id)
    }

    selected_page = id
}

module.exports = {load_page, deload_page, load_directory}