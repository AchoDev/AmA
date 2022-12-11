

get_elem = (name) => document.getElementById(name)

const menu = get_elem("pop-up-menu-container")
const answer = get_elem("answer-template")
const answerContainer = get_elem("template-container")

let isOpened = false;

const closeMenu = () => {
    const tc = menu.querySelector("#text-container")
    
    menu.style.display = "none"
    answerContainer.innerHTML = null
    isOpened = false

    tc.style.display = "none"
    menu.querySelector("textarea").style.display = "none"
    
    const answ_button = document.querySelectorAll("#answer")
    
    for(let btn of answ_button) {
        btn.style.display = "none"
    }
}

function popup_area(headline, fn, close=true) {
    closeMenu()
    if(isOpened) {return}

    isOpened = true
    menu.style.display = "flex"
    menu.querySelector("#question").innerText = headline

    const clone = answer.content.cloneNode(true)
    const btn = clone.children[0]
    const area = menu.querySelector("textarea")

    area.value = ""

    area.style.display = "block"

    btn.innerText = "ok"
    btn.addEventListener("click", e => {
        fn(area.value)
        if(close) { closeMenu() }
    })

    menu.querySelector("#pop-up-menu").appendChild(btn)
}

function popup_message(message, fn) {
    closeMenu()
    if(isOpened) {return}
    isOpened = true
    menu.style.display = "flex"
    menu.querySelector("#question").innerText = message

    const clone = answer.content.cloneNode(true)
    const btn = clone.children[0]

    btn.innerText = "ok"
    btn.addEventListener("click", (event) => {
        closeMenu()
    })

    answerContainer.appendChild(btn)
}

function popup_text(headline, text) {
    closeMenu()

    if(isOpened) {return}

    isOpened = true
    menu.style.display = "flex"

    const clone = answer.content.cloneNode(true)
    const btn = clone.children[0]

    menu.querySelector("#question").innerText = headline
    menu.querySelector("#text-container").innerText = text

    menu.querySelector("#text-container").style.display = "block"
    
    btn.innerText = "Okay"
    btn.addEventListener("click", (event) => {
        closeMenu()
    })

    menu.querySelector("#text-container").appendChild(btn)
}

function popup_question(question, options, functions, close=true) {
    closeMenu()
    if(isOpened) {return}
    isOpened = true
    menu.style.display = "flex"


    menu.querySelector("#question").innerText = question

    options.forEach((element, index, arr) => {
        const clone = answer.content.cloneNode(true)
        const btn = clone.children[0]

        btn.innerText = element
        btn.addEventListener("click", (event) => {
            if(close) { closeMenu() }
            functions[index]()
        })

        answerContainer.appendChild(btn)
    });
}

module.exports = {popup_question, popup_message, popup_text, popup_area, closeMenu}