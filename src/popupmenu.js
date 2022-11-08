

get_elem = (name) => document.getElementById(name)

const menu = get_elem("pop-up-menu-container")
const answer = get_elem("answer-template")
const answerContainer = get_elem("template-container")

let isOpened = false;

function popup_question(question, options, functions) {
    
    if(isOpened) {return}
    isOpened = true
    menu.style.display = "flex"

    let value = null



    menu.querySelector("#question").innerText = question

    options.forEach((element, index, arr) => {
        const clone = answer.content.cloneNode(true)
        const btn = clone.children[0]

        btn.innerText = element
        btn.addEventListener("click", (event) => {
            functions[index]()
            
            menu.style.display = "none"

            answerContainer.innerHTML = null
            isOpened = false

        })

        answerContainer.appendChild(btn)
    });
}

module.exports = popup_question