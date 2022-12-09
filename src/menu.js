let ppMenu = require("./popupmenu")
tags = require("./tags")
let upd = require("./update")

const drc = path.resolve(__dirname, "../dictionary.json")
const drcPage = path.resolve(__dirname, "../pages.json")
const drcTag = path.resolve(__dirname, "../tags.json")

const getRaw = () => {
    return fs.readFileSync(drc, 'utf-8', (err, data) => {
        if(err) {
            alert("an error occured\n\n" + err)
            return null;
        }
        return data
    })
}

const getRawPages = () => {
    return fs.readFileSync(drcPage, 'utf-8', (err, data) => {
        if(err) {
            alert("an error occured\n\n" + err)
            return null;
        }
        return data
    })
}

const getRawTags = () => {
    return fs.readFileSync(drcTag, 'utf-8', (err, data) => {
        if(err) {
            alert("an error occured\n\n" + err)
            return null;
        }
        return data
    })
}

function wrt(json, directory) {
    fs.writeFile(path.resolve(__dirname, `../${directory}.json`), JSON.stringify(json, null, 4), (err) => {
        if (err) {
            alert("error\n\n" + err)
        }
    })
}


get_elem = (name) => document.getElementById(name)

const menu_btn = get_elem("open-menu-button")
const menu_cnt = get_elem("menu-container")
const bg = menu_cnt.parentNode


const save_button = get_elem("save-button")
const image = menu_btn.children[0]

const hover = (width, br) => {
    menu_btn.style.width = `${width}px`
    menu_btn.style.filter = `brightness(${br})`
}

const mEnter = () => hover(60, 1.15)
const mExit = () => hover(40, 1)

menu_btn.addEventListener("mouseover", mEnter)
menu_btn.addEventListener("mouseout", mExit)

save_button.addEventListener("click", e => {

    function readText(name) {
        ppMenu.popup_area(`load ${name}`, v => {
            if(v != "") {
                ppMenu.popup_question("sure you want to load this? (current will be deleted)", ["sure", "no don't"], [
                    () => {
                        try {
                            wrt(JSON.parse(v), name)
                            ppMenu.closeMenu()
                            upd.update()
                        } catch(e) {
                            ppMenu.popup_message("error while parsing json")
                        }
                    },
                    () => {}
                ], false)
            } else {
                ppMenu.popup_question("delete everything?", ["yes", "no"], [
                    () => {
                        wrt([], name)
                        upd.update()
                    },
                    () => {}
                ])
            }
        }, false)
    }

    ppMenu.popup_question("save or load?", ["save", "load", "abbrechen"], [
            () => {
                ppMenu.popup_question("save whaat?", ["dictionary", "pages", "tags"], [
                    () => {
                        ppMenu.popup_text("save text", getRaw())
                    },
                    () => {
                        ppMenu.popup_text("save pages", getRawPages())
                    },
                    () => {
                        ppMenu.popup_text("save tags", getRawTags())
                    }
                ])
            },
            () => {
                ppMenu.popup_question("load what?", ["dictionary", "pages", "tags"], [
                    () => {readText("dictionary")},
                    () => {readText("pages")},
                    () => {readText("tags")}
                ])
            },
            () => {ppMenu.closeMenu()}
        ], false
    )
})

menu_btn.addEventListener("click", e => {

    // menu.removeEventListener("mouseover", mEnter)
    // menu_btn.removeEventListener("mouseover", mExit)

    // menu_cnt.style.height = "500px"

    let height = 0
    const gap = 10
    
    for(let button of menu_cnt.children) {
        button.style.display = "initial"
        height += button.offsetHeight + gap
    }

    menu_cnt.style.width = "300px"
    menu_cnt.style.height = `${height}px`
    menu_cnt.style.visibility = "visible"

    menu_cnt.style.boxShadow = "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
    
    menu_btn.style.zIndex = "21"
    menu_btn.style.opacity = "0"
    
    
    menu_btn.style.transition = "linear .15s"
    menu_btn.style.filter = "blur(10px)"
   
    menu_cnt.style.opacity = "1"
    menu_cnt.style.visibility = "visible"
    menu_cnt.style.filter = "blur(0)"

    bg.style.pointerEvents = "all"
})

const settingsButton = get_elem("settings-button")

settingsButton.addEventListener("click", e => {
    ppMenu.popup_message("settings not done")
})

bg.addEventListener("click", e => {
    menu_cnt.style.width = "40px"
    menu_cnt.style.height = `40px`
    menu_cnt.style.visibility = "hidden"

    menu_cnt.style.boxShadow = "none"
    
    menu_btn.style.zIndex = "19"
    menu_btn.style.opacity = "1"

    menu_cnt.transition = "linear .15s"
    menu_cnt.style.opacity = "0"
    
    menu_btn.style.transition = "ease-out .1s"
    menu_btn.style.filter = "blur(0)"
    menu_cnt.style.filter = "blur(10px)"

    bg.style.pointerEvents = "none"
})
